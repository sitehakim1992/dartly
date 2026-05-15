// src/components/CodeViewer.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Clipboard,
} from 'react-native';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import {atomOneDark, atomOneLight} from 'react-syntax-highlighter/styles/hljs';
import {useTheme} from '../theme/ThemeContext';
import {RADIUS, SPACING, COLORS} from '../theme';

interface CodeViewerProps {
  code: string;
  language?: string;
  title?: string;
  showOutput?: string;
}

export const CodeViewer = ({
  code,
  language = 'dart',
  title,
  showOutput,
}: CodeViewerProps) => {
  const {theme} = useTheme();
  const [copied, setCopied] = useState(false);
  const [showOut, setShowOut] = useState(false);

  const copyCode = () => {
    Clipboard.setString(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.codeBg ?? '#0D1117'}]}>
      {/* Header */}
      <View style={styles.header}>
        {/* Traffic lights */}
        <View style={styles.dots}>
          <View style={[styles.dot, {backgroundColor: '#FF5F57'}]} />
          <View style={[styles.dot, {backgroundColor: '#FFBD2E'}]} />
          <View style={[styles.dot, {backgroundColor: '#28CA41'}]} />
        </View>
        <Text style={styles.langLabel}>{title ?? language.toUpperCase()}</Text>
        <TouchableOpacity onPress={copyCode} style={styles.copyBtn}>
          <Text style={styles.copyText}>{copied ? '✓ Copied' : '⎘ Copy'}</Text>
        </TouchableOpacity>
      </View>

      {/* Code */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <SyntaxHighlighter
          language={language}
          style={atomOneDark}
          customStyle={styles.code}
          fontSize={13}>
          {code}
        </SyntaxHighlighter>
      </ScrollView>

      {/* Output section */}
      {showOutput && (
        <View>
          <TouchableOpacity
            style={[styles.outputToggle, {borderTopColor: theme.colors.borderLight ?? '#2A2A4A'}]}
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

const styles = StyleSheet.create({
  container: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    marginVertical: SPACING.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#161B22',
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
    marginRight: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  langLabel: {
    flex: 1,
    color: '#8B8FA8',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
  copyBtn: {
    backgroundColor: '#2A2F3E',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  copyText: {
    color: '#7C85A2',
    fontSize: 11,
    fontWeight: '600',
  },
  code: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical: 12,
    margin: 0,
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
    fontFamily: 'Courier',
    fontSize: 13,
  },
});
