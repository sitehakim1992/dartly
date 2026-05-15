// src/components/CodeBlock.tsx
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { RADIUS, SPACING } from '../theme';

interface CodeBlockProps {
  code: string;
  title?: string;
  showOutput?: string;
  language?: string; 
  showLineNumbers?: boolean;
}

export const CodeBlock = ({
  code,
  title,
  showOutput,
  showLineNumbers = true,
}: CodeBlockProps) => {
  const { theme } = useTheme();
  const [showOut, setShowOut] = useState(false);
  
  const lines = useMemo(() => code.split('\n'), [code]);

  const tokenTypes = useMemo(() => {
    return [
      { pattern: /\/\/.*$|\/\*[\s\S]*?\*\//g, color: theme.colors.textTertiary ?? '#6A737D' }, 
      { pattern: /"[^"]*"|'[^']*'/g, color: '#98C379' },                                      
      { pattern: /@[a-zA-Z_]\w*/g, color: '#E5C07B' },                                         
      { pattern: /\b(void|int|double|String|bool|var|final|const|class|extends|implements|mixin|with|if|else|switch|case|for|while|do|return|try|catch|finally|throw|new|this|super|async|await|yield|true|false|null)\b/g, color: '#C678DD' }, 
      { pattern: /\b(List|Map|Set|Future|Stream|Iterable|dynamic|Object|Widget|print|BuildContext)\b/g, color: '#E06C75' }, 
      { pattern: /\b\d+(\.\d+)?\b/g, color: '#D19A66' },                                       
    ];
  }, [theme.colors.textTertiary]);

  const renderLine = (line: string, index: number) => {
    const allMatches: Array<{ start: number; end: number; text: string; color: string }> = [];

    tokenTypes.forEach(({ pattern, color }) => {
      const regex = new RegExp(pattern.source, 'g');
      let match;
      while ((match = regex.exec(line)) !== null) {
        allMatches.push({
          start: match.index,
          end: match.index + match[0].length,
          text: match[0],
          color,
        });
      }
    });

    allMatches.sort((a, b) => a.start - b.start);
    const filtered = allMatches.filter((match, i) => {
      if (i === 0) return true;
      return match.start >= allMatches[i - 1].end;
    });

    const segments: Array<{ text: string; color: string }> = [];
    let lastEnd = 0;
    const defaultColor = theme.colors.textSecondary ?? '#ABB2BF';

    filtered.forEach(match => {
      if (match.start > lastEnd) {
        segments.push({ text: line.substring(lastEnd, match.start), color: defaultColor });
      }
      segments.push({ text: match.text, color: match.color });
      lastEnd = match.end;
    });
    
    if (lastEnd < line.length) {
      segments.push({ text: line.substring(lastEnd), color: defaultColor });
    }

    if (line === '') {
      segments.push({ text: ' ', color: defaultColor });
    }

    return (
      <View key={index} style={styles.lineContainer}>
        {showLineNumbers && (
          <Text style={[styles.lineNumber, { color: theme.colors.textTertiary ?? '#4A5568' }]}>
            {String(index + 1).padStart(2, ' ')}
          </Text>
        )}
        {/* Fix: selectable={true} helps prevent text collapse anomalies on some OS engines */}
        <Text selectable={true} style={styles.lineContent}>
          {segments.map((segment, i) => (
            <Text key={i} style={{ color: segment.color }}>
              {segment.text}
            </Text>
          ))}
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.codeBg ?? '#0D1117', borderColor: theme.colors.border ?? '#2A2A4A' }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.headerBg ?? '#161B22', borderBottomColor: theme.colors.border ?? '#2A2A4A' }]}>
        <View style={styles.dots}>
          <View style={[styles.dot, { backgroundColor: '#FF5F57'}]} />
          <View style={[styles.dot, { backgroundColor: '#FFBD2E'}]} />
          <View style={[styles.dot, { backgroundColor: '#28CA41'}]} />
        </View>
        <Text style={styles.headerText}>{title ?? 'DART'}</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.codeScroll}>
        <View style={styles.codeContainer}>
          {lines.map((line, index) => renderLine(line, index))}
        </View>
      </ScrollView>

      {showOutput && (
        <View>
          <TouchableOpacity
            style={[styles.outputToggle, { borderTopColor: theme.colors.border ?? '#2A2A4A' }]}
            onPress={() => setShowOut(!showOut)}>
            <Text style={styles.outputLabel}>
              {showOut ? '▼' : '▶'} Output
            </Text>
          </TouchableOpacity>
          {showOut && (
            <View style={styles.outputBox}>
              <Text style={styles.outputText}>{showOutput}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

// Cross-platform guaranteed monospace system fonts
const MONOSPACE_FONT = Platform.select({
  ios: 'Menlo',
  android: 'monospace',
  default: 'Courier',
});

const styles = StyleSheet.create({
  container: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    marginVertical: SPACING.sm,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  dots: { flexDirection: 'row', gap: 6, marginRight: 12 },
  dot: { width: 12, height: 12, borderRadius: 6 },
  headerText: {
    flex: 1,
    color: '#8B8FA8',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  codeScroll: {
    padding: 14,
  },
  codeContainer: {
    // Explicitly forces layout engine not to break or truncate long code lines text wrapping styles
    flexDirection: 'column', 
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    minHeight: 22,
  },
  lineNumber: {
    fontFamily: MONOSPACE_FONT,
    fontSize: 12,
    width: 26,
    textAlign: 'right',
    marginRight: 16,
    lineHeight: 22,
    opacity: 0.8,
  },
  lineContent: {
    fontFamily: MONOSPACE_FONT,
    fontSize: 13,
    lineHeight: 22,
    // CRITICAL: Tells iOS and Android engines to accurately preserve indents and spaces
    whiteSpace: 'pre', 
  },
  outputToggle: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
  },
  outputLabel: {
    color: '#38EF7D',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  outputBox: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  outputText: {
    color: '#E6EDF3',
    fontFamily: MONOSPACE_FONT,
    fontSize: 13,
    lineHeight: 20,
    whiteSpace: 'pre',
  },
});
// // src/components/CodeBlock.tsx
// import React, {useMemo, useState} from 'react';
// import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
// import {useTheme} from '../theme/ThemeContext';
// import {RADIUS, SPACING} from '../theme';

// interface CodeBlockProps {
//   code: string;
//   title?: string;
//   showOutput?: string;
//   language?: string; // Kept for compatibility, but regex is optimized for Dart
//   showLineNumbers?: boolean;
// }

// export const CodeBlock = ({
//   code,
//   title,
//   showOutput,
//   showLineNumbers = true,
// }: CodeBlockProps) => {
//   const {theme} = useTheme();
//   const [showOut, setShowOut] = useState(false);
//   const lines = useMemo(() => code.split('\n'), [code]);

//   // Dart Regex Patterns
//   const keywords = /\b(void|int|double|String|bool|var|final|const|class|extends|implements|mixin|with|if|else|switch|case|for|while|do|return|try|catch|finally|throw|new|this|super|async|await|yield|true|false|null)\b/g;
//   const types = /\b(List|Map|Set|Future|Stream|Iterable|dynamic|Object|Widget|BuildContext)\b/g;
//   const strings = /"[^"]*"|'[^']*'/g;
//   const comments = /\/\/.*$|\/\*[\s\S]*?\*\//g;
//   const numbers = /\b\d+(\.\d+)?\b/g;
//   const annotations = /@[a-zA-Z_]\w*/g;

//   const tokenTypes = [
//     {pattern: comments, color: theme.colors.textTertiary ?? '#6A737D'},
//     {pattern: strings, color: '#98C379'},
//     {pattern: annotations, color: '#E5C07B'},
//     {pattern: keywords, color: '#C678DD'},
//     {pattern: types, color: '#E06C75'},
//     {pattern: numbers, color: '#D19A66'},
//   ];

//   const renderLine = (line: string, index: number) => {
//     const allMatches: Array<{start: number; end: number; text: string; color: string}> = [];

//     tokenTypes.forEach(({pattern, color}) => {
//       const regex = new RegExp(pattern.source, 'g');
//       let match;
//       while ((match = regex.exec(line)) !== null) {
//         allMatches.push({
//           start: match.index,
//           end: match.index + match[0].length,
//           text: match[0],
//           color,
//         });
//       }
//     });

//     allMatches.sort((a, b) => a.start - b.start);
//     const filtered = allMatches.filter((match, i) => {
//       if (i === 0) return true;
//       return match.start >= allMatches[i - 1].end;
//     });

//     const segments: Array<{text: string; color: string}> = [];
//     let lastEnd = 0;
//     filtered.forEach(match => {
//       if (match.start > lastEnd) {
//         segments.push({text: line.substring(lastEnd, match.start), color: theme.colors.textSecondary ?? '#ABB2BF'});
//       }
//       segments.push({text: match.text, color: match.color});
//       lastEnd = match.end;
//     });
//     if (lastEnd < line.length) {
//       segments.push({text: line.substring(lastEnd), color: theme.colors.textSecondary ?? '#ABB2BF'});
//     }

//     return (
//       <View key={index} style={styles.lineContainer}>
//         {showLineNumbers && (
//           <Text style={[styles.lineNumber, {color: theme.colors.textTertiary ?? '#4A5568'}]}>
//             {String(index + 1).padStart(2, ' ')}
//           </Text>
//         )}
//         <View style={styles.lineContent}>
//           {segments.map((segment, i) => (
//             <Text key={i} style={[styles.codeText, {color: segment.color}]}>
//               {segment.text}
//             </Text>
//           ))}
//         </View>
//       </View>
//     );
//   };

//   return (
//     <View style={[styles.container, {backgroundColor: theme.colors.codeBg ?? '#0D1117', borderColor: theme.colors.border ?? '#2A2A4A'}]}>
//       {/* Header */}
//       <View style={[styles.header, {borderBottomColor: theme.colors.border ?? '#2A2A4A'}]}>
//         <View style={styles.dots}>
//           <View style={[styles.dot, {backgroundColor: '#FF5F57'}]} />
//           <View style={[styles.dot, {backgroundColor: '#FFBD2E'}]} />
//           <View style={[styles.dot, {backgroundColor: '#28CA41'}]} />
//         </View>
//         <Text style={styles.headerText}>{title ?? 'CODE'}</Text>
//       </View>

//       {/* Code Content */}
//       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.codeScroll}>
//         <View style={styles.codeContainer}>
//           {lines.map((line, index) => renderLine(line, index))}
//         </View>
//       </ScrollView>

//       {/* Output Section */}
//       {showOutput && (
//         <View>
//           <TouchableOpacity
//             style={[styles.outputToggle, {borderTopColor: theme.colors.border ?? '#2A2A4A'}]}
//             onPress={() => setShowOut(!showOut)}>
//             <Text style={styles.outputLabel}>
//               {showOut ? '▼' : '▶'} Output
//             </Text>
//           </TouchableOpacity>
//           {showOut && (
//             <View style={styles.outputBox}>
//               <Text style={styles.outputText}>{showOutput}</Text>
//             </View>
//           )}
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     borderRadius: RADIUS.lg,
//     overflow: 'hidden',
//     marginVertical: SPACING.sm,
//     borderWidth: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 14,
//     paddingVertical: 10,
//     backgroundColor: '#161B22',
//     borderBottomWidth: 1,
//   },
//   dots: {flexDirection: 'row', gap: 6, marginRight: 12},
//   dot: {width: 12, height: 12, borderRadius: 6},
//   headerText: {
//     flex: 1,
//     color: '#8B8FA8',
//     fontSize: 12,
//     fontWeight: '700',
//     letterSpacing: 1,
//   },
//   codeScroll: {
//     padding: 12,
//   },
//   codeContainer: {
//     minWidth: '100%',
//   },
//   lineContainer: {
//     flexDirection: 'row',
//     minHeight: 22,
//   },
//   lineNumber: {
//     fontFamily: 'Courier',
//     fontSize: 13,
//     width: 30,
//     textAlign: 'right',
//     marginRight: 12,
//     lineHeight: 22,
//   },
//   lineContent: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     flex: 1,
//   },
//   codeText: {
//     fontFamily: 'Courier',
//     fontSize: 13,
//     lineHeight: 22,
//   },
//   outputToggle: {
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderTopWidth: 1,
//   },
//   outputLabel: {
//     color: '#38EF7D',
//     fontSize: 12,
//     fontWeight: '600',
//     letterSpacing: 0.5,
//   },
//   outputBox: {
//     paddingHorizontal: 16,
//     paddingBottom: 12,
//   },
//   outputText: {
//     color: '#E6EDF3',
//     fontFamily: 'Courier',
//     fontSize: 13,
//   },
// });