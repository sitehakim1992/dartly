// src/screens/ExerciseScreen.tsx
import React, {useState} from 'react';
import {
View,
Text,
StyleSheet,
ScrollView,
TouchableOpacity,
TextInput,
StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTheme} from '../theme/ThemeContext';
import {COLORS, GRADIENTS, RADIUS, SPACING} from '../theme';
import {addXP} from '../storage/progress';
import {CodeBlock} from '../components/CodeBlock'; // ✅ Updated Import
import {lessonsData} from '../data/lessonsData';
import {RootStackParamList} from '../navigation/AppNavigator';

type RouteType = RouteProp<RootStackParamList, 'Exercise'>;
type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function ExerciseScreen() {
const {theme, isDark} = useTheme();
const route = useRoute<RouteType>();
const navigation = useNavigation<NavProp>();
const {lessonId} = route.params;
const lesson = lessonsData.find(l => l.id === lessonId)!;
const exercise = lesson.exercise;
const [code, setCode] = useState(exercise.starterCode);
const [submitted, setSubmitted] = useState(false);
const [showSolution, setShowSolution] = useState(false);

const handleSubmit = () => {
setSubmitted(true);
addXP(20);
};

const handleReset = () => {
setCode(exercise.starterCode);
setSubmitted(false);
setShowSolution(false);
};

return (
<View style={[styles.screen, {backgroundColor: theme.colors.bg}]}>
<StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
  {/* Header */}
   <LinearGradient
    colors={['#0F0C29', '#1A1A2E']}
    style={styles.header} >
     <View style={styles.headerRow} >
       <TouchableOpacity onPress={() => navigation.goBack()} >
         <Text style={styles.backText} >‹ Back </Text >
       </TouchableOpacity >
       <Text style={styles.headerTitle} >Exercise · Lesson {lessonId} </Text >
       <TouchableOpacity onPress={handleReset} >
         <Text style={styles.resetText} >Reset </Text >
       </TouchableOpacity >
     </View >
   </LinearGradient >

   <ScrollView
    style={styles.scroll}
    contentContainerStyle={styles.scrollContent}
    keyboardShouldPersistTaps="handled" >

    {/* Instruction */}
     <View
      style={[
        styles.instructionCard,
        {
          backgroundColor: COLORS.primary + '15',
          borderColor: COLORS.primary + '40',
        },
      ]} >
       <Text style={[styles.instructionLabel, {color: COLORS.primary}]} >
        📋 Your Task
       </Text >
       <Text style={[styles.instructionText, {color: theme.colors.text}]} >
        {exercise.instruction}
       </Text >
     </View >

    {/* Code editor */}
     <View >
       <Text style={[styles.editorLabel, {color: theme.colors.textSecondary}]} >
        ✏️ Write your solution:
       </Text >
       <View
        style={[
          styles.editorWrap,
          {
            backgroundColor: '#0D1117',
            borderColor: submitted
              ? COLORS.success + '60'
               : theme.colors.borderLight,
          },
        ]} >
        {/* Editor header */}
         <View style={styles.editorHeader} >
           <View style={styles.editorDots} >
             <View style={[styles.dot, {backgroundColor: '#FF5F57'}]} />
             <View style={[styles.dot, {backgroundColor: '#FFBD2E'}]} />
             <View style={[styles.dot, {backgroundColor: '#28CA41'}]} />
           </View >
           <Text style={styles.editorLang} >DART </Text >
         </View >
         <TextInput
          style={styles.editor}
          value={code}
          onChangeText={setCode}
          multiline
          autoCorrect={false}
          autoCapitalize="none"
          spellCheck={false}
          placeholderTextColor="#8B8FA8"
          keyboardType="default"
        />
       </View >
     </View >

    {/* Submit button */}
    {!submitted ? (
       <TouchableOpacity onPress={handleSubmit} activeOpacity={0.88} >
         <LinearGradient
          colors={GRADIENTS.primary}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.submitBtn} >
           <Text style={styles.submitBtnText} >▶ Run  & Submit (+20 XP) </Text >
         </LinearGradient >
       </TouchableOpacity >
    ) : (
       <View
        style={[
          styles.submittedBadge,
          {backgroundColor: COLORS.success + '15'},
        ]} >
         <Text style={[styles.submittedText, {color: COLORS.success}]} >
          ✅ Submitted! Great work!
         </Text >
       </View >
    )}

    {/* Solution toggle */}
     <TouchableOpacity
      style={[
        styles.solutionToggle,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
        },
       ]}
      onPress={() => setShowSolution(!showSolution)} >
       <Text style={[styles.solutionToggleText, {color: theme.colors.textSecondary}]} >
        {showSolution ? '🙈 Hide Solution' : '💡 Show Solution'}
       </Text >
     </TouchableOpacity >

    {showSolution && (
       <View >
         <Text style={[styles.solutionLabel, {color: theme.colors.textTertiary}]} >
          Reference Solution:
         </Text >
         {/* ✅ Updated Component */}
         <CodeBlock
          code={exercise.solution}
          title="Solution"
          showLineNumbers
        />
       </View>
    )}

    {/* Navigate to next lesson */}
    {submitted && (
       <TouchableOpacity
        activeOpacity={0.88}
        onPress={() => {
          const nextId = lessonId + 1;
          if (nextId <= lessonsData.length) {
            navigation.replace('LessonDetail', {lessonId: nextId});
          } else {
            navigation.goBack();
          }
        }} >
         <LinearGradient
          colors={GRADIENTS.success}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.nextLessonBtn} >
           <Text style={styles.nextLessonText} >
            {lessonId < lessonsData.length
              ? '→ Next Lesson'
              : '🎓 You completed all lessons!'}
           </Text >
         </LinearGradient >
       </TouchableOpacity >
    )}

     <View style={{height: 60}} />
   </ScrollView >
 </View >
);
}
const styles = StyleSheet.create({
screen: {flex: 1},
header: {
paddingTop: 56,
paddingHorizontal: SPACING.md,
paddingBottom: SPACING.md,
},
headerRow: {
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-between',
},
backText: {color: '#FFFFFF', fontSize: 16, fontWeight: '600'},
headerTitle: {color: '#FFFFFF', fontSize: 14, fontWeight: '700'},
resetText: {color: COLORS.warning, fontSize: 13, fontWeight: '600'},
scroll: {flex: 1},
scrollContent: {padding: SPACING.md, gap: SPACING.md},
instructionCard: {
borderRadius: RADIUS.lg,
padding: SPACING.md,
borderWidth: 1.5,
},
instructionLabel: {
fontSize: 11,
fontWeight: '700',
letterSpacing: 1,
marginBottom: 8,
},
instructionText: {fontSize: 15, lineHeight: 24, fontWeight: '500'},
editorLabel: {fontSize: 13, fontWeight: '600', marginBottom: 8},
editorWrap: {
borderRadius: RADIUS.lg,
overflow: 'hidden',
borderWidth: 1.5,
},
editorHeader: {
flexDirection: 'row',
alignItems: 'center',
paddingHorizontal: 14,
paddingVertical: 10,
backgroundColor: '#161B22',
},
editorDots: {flexDirection: 'row', gap: 6, marginRight: 12},
dot: {width: 12, height: 12, borderRadius: 6},
editorLang: {
flex: 1,
color: '#8B8FA8',
fontSize: 11,
fontWeight: '700',
letterSpacing: 1,
},
editor: {
color: '#E6EDF3',
fontFamily: 'Courier',
fontSize: 14,
lineHeight: 22,
padding: 16,
minHeight: 200,
textAlignVertical: 'top',
backgroundColor: '#0D1117',
},
submitBtn: {
borderRadius: RADIUS.lg,
paddingVertical: 16,
alignItems: 'center',
},
submitBtnText: {color: '#FFFFFF', fontSize: 15, fontWeight: '800'},
submittedBadge: {
borderRadius: RADIUS.lg,
paddingVertical: 16,
alignItems: 'center',
},
submittedText: {fontSize: 15, fontWeight: '700'},
solutionToggle: {
borderRadius: RADIUS.md,
paddingVertical: 12,
alignItems: 'center',
borderWidth: 1,
},
solutionToggleText: {fontSize: 13, fontWeight: '600'},
solutionLabel: {fontSize: 12, marginBottom: 6},
nextLessonBtn: {
borderRadius: RADIUS.lg,
paddingVertical: 16,
alignItems: 'center',
},
nextLessonText: {color: '#FFFFFF', fontSize: 15, fontWeight: '800'},
});
// // src/screens/ExerciseScreen.tsx
// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   StatusBar,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {useTheme} from '../theme/ThemeContext';
// import {COLORS, GRADIENTS, RADIUS, SPACING} from '../theme';
// import {addXP} from '../storage/progress';
// import {CodeViewer} from '../components/CodeViewer';
// import {lessonsData} from '../data/lessonsData';
// import {RootStackParamList} from '../navigation/AppNavigator';

// type RouteType = RouteProp<RootStackParamList, 'Exercise'>;
// type NavProp = NativeStackNavigationProp<RootStackParamList>;

// export default function ExerciseScreen() {
//   const {theme, isDark} = useTheme();
//   const route = useRoute<RouteType>();
//   const navigation = useNavigation<NavProp>();
//   const {lessonId} = route.params;

//   const lesson = lessonsData.find(l => l.id === lessonId)!;
//   const exercise = lesson.exercise;

//   const [code, setCode] = useState(exercise.starterCode);
//   const [submitted, setSubmitted] = useState(false);
//   const [showSolution, setShowSolution] = useState(false);

//   const handleSubmit = () => {
//     setSubmitted(true);
//     addXP(20);
//   };

//   const handleReset = () => {
//     setCode(exercise.starterCode);
//     setSubmitted(false);
//     setShowSolution(false);
//   };

//   return (
//     <View style={[styles.screen, {backgroundColor: theme.colors.bg}]}>
//       <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

//       {/* Header */}
//       <LinearGradient
//         colors={['#0F0C29', '#1A1A2E']}
//         style={styles.header}>
//         <View style={styles.headerRow}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Text style={styles.backText}>‹ Back</Text>
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Exercise · Lesson {lessonId}</Text>
//           <TouchableOpacity onPress={handleReset}>
//             <Text style={styles.resetText}>Reset</Text>
//           </TouchableOpacity>
//         </View>
//       </LinearGradient>

//       <ScrollView
//         style={styles.scroll}
//         contentContainerStyle={styles.scrollContent}
//         keyboardShouldPersistTaps="handled">

//         {/* Instruction */}
//         <View
//           style={[
//             styles.instructionCard,
//             {
//               backgroundColor: COLORS.primary + '15',
//               borderColor: COLORS.primary + '40',
//             },
//           ]}>
//           <Text style={[styles.instructionLabel, {color: COLORS.primary}]}>
//             📋 Your Task
//           </Text>
//           <Text style={[styles.instructionText, {color: theme.colors.text}]}>
//             {exercise.instruction}
//           </Text>
//         </View>

//         {/* Code editor */}
//         <View>
//           <Text style={[styles.editorLabel, {color: theme.colors.textSecondary}]}>
//             ✏️ Write your solution:
//           </Text>
//           <View
//             style={[
//               styles.editorWrap,
//               {
//                 backgroundColor: '#0D1117',
//                 borderColor: submitted
//                   ? COLORS.success + '60'
//                   : theme.colors.borderLight,
//               },
//             ]}>
//             {/* Editor header */}
//             <View style={styles.editorHeader}>
//               <View style={styles.editorDots}>
//                 <View style={[styles.dot, {backgroundColor: '#FF5F57'}]} />
//                 <View style={[styles.dot, {backgroundColor: '#FFBD2E'}]} />
//                 <View style={[styles.dot, {backgroundColor: '#28CA41'}]} />
//               </View>
//               <Text style={styles.editorLang}>DART</Text>
//             </View>
//             <TextInput
//               style={styles.editor}
//               value={code}
//               onChangeText={setCode}
//               multiline
//               autoCorrect={false}
//               autoCapitalize="none"
//               spellCheck={false}
//               placeholderTextColor="#8B8FA8"
//               keyboardType="default"
//             />
//           </View>
//         </View>

//         {/* Submit button */}
//         {!submitted ? (
//           <TouchableOpacity onPress={handleSubmit} activeOpacity={0.88}>
//             <LinearGradient
//               colors={GRADIENTS.primary}
//               start={{x: 0, y: 0}}
//               end={{x: 1, y: 0}}
//               style={styles.submitBtn}>
//               <Text style={styles.submitBtnText}>▶ Run & Submit (+20 XP)</Text>
//             </LinearGradient>
//           </TouchableOpacity>
//         ) : (
//           <View
//             style={[
//               styles.submittedBadge,
//               {backgroundColor: COLORS.success + '15'},
//             ]}>
//             <Text style={[styles.submittedText, {color: COLORS.success}]}>
//               ✅ Submitted! Great work!
//             </Text>
//           </View>
//         )}

//         {/* Solution toggle */}
//         <TouchableOpacity
//           style={[
//             styles.solutionToggle,
//             {
//               backgroundColor: theme.colors.card,
//               borderColor: theme.colors.border,
//             },
//           ]}
//           onPress={() => setShowSolution(!showSolution)}>
//           <Text style={[styles.solutionToggleText, {color: theme.colors.textSecondary}]}>
//             {showSolution ? '🙈 Hide Solution' : '💡 Show Solution'}
//           </Text>
//         </TouchableOpacity>

//         {showSolution && (
//           <View>
//             <Text style={[styles.solutionLabel, {color: theme.colors.textTertiary}]}>
//               Reference Solution:
//             </Text>
//             <CodeViewer
//               code={exercise.solution}
//               language="dart"
//               title="Solution"
//             />
//           </View>
//         )}

//         {/* Navigate to next lesson */}
//         {submitted && (
//           <TouchableOpacity
//             activeOpacity={0.88}
//             onPress={() => {
//               const nextId = lessonId + 1;
//               if (nextId <= lessonsData.length) {
//                 navigation.replace('LessonDetail', {lessonId: nextId});
//               } else {
//                 navigation.goBack();
//               }
//             }}>
//             <LinearGradient
//               colors={GRADIENTS.success}
//               start={{x: 0, y: 0}}
//               end={{x: 1, y: 0}}
//               style={styles.nextLessonBtn}>
//               <Text style={styles.nextLessonText}>
//                 {lessonId < lessonsData.length
//                   ? '→ Next Lesson'
//                   : '🎓 You completed all lessons!'}
//               </Text>
//             </LinearGradient>
//           </TouchableOpacity>
//         )}

//         <View style={{height: 60}} />
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   screen: {flex: 1},
//   header: {
//     paddingTop: 56,
//     paddingHorizontal: SPACING.md,
//     paddingBottom: SPACING.md,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   backText: {color: '#FFFFFF', fontSize: 16, fontWeight: '600'},
//   headerTitle: {color: '#FFFFFF', fontSize: 14, fontWeight: '700'},
//   resetText: {color: COLORS.warning, fontSize: 13, fontWeight: '600'},
//   scroll: {flex: 1},
//   scrollContent: {padding: SPACING.md, gap: SPACING.md},
//   instructionCard: {
//     borderRadius: RADIUS.lg,
//     padding: SPACING.md,
//     borderWidth: 1.5,
//   },
//   instructionLabel: {
//     fontSize: 11,
//     fontWeight: '700',
//     letterSpacing: 1,
//     marginBottom: 8,
//   },
//   instructionText: {fontSize: 15, lineHeight: 24, fontWeight: '500'},
//   editorLabel: {fontSize: 13, fontWeight: '600', marginBottom: 8},
//   editorWrap: {
//     borderRadius: RADIUS.lg,
//     overflow: 'hidden',
//     borderWidth: 1.5,
//   },
//   editorHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 14,
//     paddingVertical: 10,
//     backgroundColor: '#161B22',
//   },
//   editorDots: {flexDirection: 'row', gap: 6, marginRight: 12},
//   dot: {width: 12, height: 12, borderRadius: 6},
//   editorLang: {
//     flex: 1,
//     color: '#8B8FA8',
//     fontSize: 11,
//     fontWeight: '700',
//     letterSpacing: 1,
//   },
//   editor: {
//     color: '#E6EDF3',
//     fontFamily: 'Courier',
//     fontSize: 14,
//     lineHeight: 22,
//     padding: 16,
//     minHeight: 200,
//     textAlignVertical: 'top',
//     backgroundColor: '#0D1117',
//   },
//   submitBtn: {
//     borderRadius: RADIUS.lg,
//     paddingVertical: 16,
//     alignItems: 'center',
//   },
//   submitBtnText: {color: '#FFFFFF', fontSize: 15, fontWeight: '800'},
//   submittedBadge: {
//     borderRadius: RADIUS.lg,
//     paddingVertical: 16,
//     alignItems: 'center',
//   },
//   submittedText: {fontSize: 15, fontWeight: '700'},
//   solutionToggle: {
//     borderRadius: RADIUS.md,
//     paddingVertical: 12,
//     alignItems: 'center',
//     borderWidth: 1,
//   },
//   solutionToggleText: {fontSize: 13, fontWeight: '600'},
//   solutionLabel: {fontSize: 12, marginBottom: 6},
//   nextLessonBtn: {
//     borderRadius: RADIUS.lg,
//     paddingVertical: 16,
//     alignItems: 'center',
//   },
//   nextLessonText: {color: '#FFFFFF', fontSize: 15, fontWeight: '800'},
// });