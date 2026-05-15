// src/screens/QuizScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTheme} from '../theme/ThemeContext';
import {COLORS, GRADIENTS, RADIUS, SPACING} from '../theme';
import {saveQuizScore, addXP} from '../storage/progress';
import {lessonsData} from '../data/lessonsData';
import {RootStackParamList} from '../navigation/AppNavigator';

type RouteType = RouteProp<RootStackParamList, 'Quiz'>;
type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function QuizScreen() {
  const {theme, isDark} = useTheme();
  const route = useRoute<RouteType>();
  const navigation = useNavigation<NavProp>();
  const {lessonId} = route.params;

  const lesson = lessonsData.find(l => l.id === lessonId)!;
  const questions = lesson.quiz;

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);

  const question = questions[currentQ];
  const isCorrect = selected === question?.correctAnswerIndex;
  const score = Math.round(
    (answers.filter(Boolean).length / questions.length) * 100,
  );

  const handleSelect = (optIdx: number) => {
    if (selected !== null) return;
    setSelected(optIdx);
  };

  const handleNext = () => {
    if (selected === null) return;
    const correct = selected === question.correctAnswerIndex;
    const newAnswers = [...answers, correct];
    if (currentQ + 1 < questions.length) {
      setAnswers(newAnswers);
      setCurrentQ(currentQ + 1);
      setSelected(null);
    } else {
      setAnswers(newAnswers);
      const finalScore = Math.round(
        (newAnswers.filter(Boolean).length / questions.length) * 100,
      );
      saveQuizScore(lessonId, finalScore);
      setFinished(true);
    }
  };

  const getOptionStyle = (optIdx: number) => {
    if (selected === null) {
      return {
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border,
      };
    }
    if (optIdx === question.correctAnswerIndex) {
      return {
        backgroundColor: COLORS.success + '20',
        borderColor: COLORS.success,
      };
    }
    if (optIdx === selected) {
      return {
        backgroundColor: COLORS.error + '20',
        borderColor: COLORS.error,
      };
    }
    return {
      backgroundColor: theme.colors.card,
      borderColor: theme.colors.border,
      opacity: 0.5,
    };
  };

  if (finished) {
    const passed = score >= 66;
    return (
      <View style={[styles.screen, {backgroundColor: theme.colors.bg}]}>
        <StatusBar barStyle="light-content" />
        <LinearGradient
          colors={passed ? GRADIENTS.success : GRADIENTS.danger}
          style={styles.resultHero}>
          <Text style={styles.resultIcon}>{passed ? '🏆' : '😅'}</Text>
          <Text style={styles.resultTitle}>
            {passed ? 'Great Job!' : 'Keep Practicing!'}
          </Text>
          <Text style={styles.resultScore}>{score}%</Text>
          <Text style={styles.resultSub}>
            {answers.filter(Boolean).length}/{questions.length} correct
          </Text>
        </LinearGradient>

        <View style={styles.resultBody}>
          {/* Q review */}
          {questions.map((q, i) => (
            <View
              key={i}
              style={[
                styles.reviewItem,
                {
                  backgroundColor: theme.colors.card,
                  borderColor: answers[i] ? COLORS.success + '40' : COLORS.error + '40',
                  borderWidth: 1.5,
                },
              ]}>
              <Text style={styles.reviewIcon}>{answers[i] ? '✅' : '❌'}</Text>
              <Text style={[styles.reviewQ, {color: theme.colors.textSecondary}]} numberOfLines={2}>
                {q.question}
              </Text>
            </View>
          ))}

          <View style={styles.resultActions}>
            <TouchableOpacity
              style={[styles.resultBtn, {backgroundColor: theme.colors.card, borderColor: theme.colors.border}]}
              onPress={() => {
                setCurrentQ(0);
                setSelected(null);
                setAnswers([]);
                setFinished(false);
              }}>
              <Text style={[styles.resultBtnText, {color: theme.colors.text}]}>
                🔄 Retry
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => navigation.navigate('Exercise', {lessonId})}>
              <LinearGradient
                colors={GRADIENTS.primary}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.resultBtnPrimary}>
                <Text style={styles.resultBtnPrimaryText}>✏️ Exercise</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.screen, {backgroundColor: theme.colors.bg}]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <LinearGradient colors={['#0F0C29', '#1A1A2E']} style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>‹ Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Quiz · Lesson {lessonId}</Text>
          <Text style={styles.qCounter}>
            {currentQ + 1}/{questions.length}
          </Text>
        </View>

        {/* Progress bar */}
        <View style={styles.quizTrack}>
          {questions.map((_, i) => (
            <View
              key={i}
              style={[
                styles.quizTrackSeg,
                {
                  backgroundColor:
                    i < currentQ
                      ? answers[i]
                        ? COLORS.success
                        : COLORS.error
                      : i === currentQ
                      ? COLORS.primary
                      : 'rgba(255,255,255,0.2)',
                },
              ]}
            />
          ))}
        </View>
      </LinearGradient>

      {/* Question */}
      <View style={styles.body}>
        <View
          style={[
            styles.questionCard,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
            },
          ]}>
          <Text style={[styles.qLabel, {color: theme.colors.textTertiary}]}>
            Question {currentQ + 1}
          </Text>
          <Text style={[styles.qText, {color: theme.colors.text}]}>
            {question.question}
          </Text>
        </View>

        {/* Options */}
        <View style={styles.options}>
          {question.options.map((opt, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => handleSelect(i)}
              activeOpacity={0.88}
              style={[styles.option, getOptionStyle(i)]}>
              <View
                style={[
                  styles.optLetter,
                  {
                    backgroundColor:
                      selected !== null && i === question.correctAnswerIndex
                        ? COLORS.success + '40'
                        : selected === i && i !== question.correctAnswerIndex
                        ? COLORS.error + '40'
                        : theme.colors.surfaceAlt,
                  },
                ]}>
                <Text
                  style={[
                    styles.optLetterText,
                    {
                      color:
                        selected !== null && i === question.correctAnswerIndex
                          ? COLORS.success
                          : selected === i && i !== question.correctAnswerIndex
                          ? COLORS.error
                          : theme.colors.textTertiary,
                    },
                  ]}>
                  {['A', 'B', 'C', 'D'][i]}
                </Text>
              </View>
              <Text style={[styles.optText, {color: theme.colors.text}]}>
                {opt}
              </Text>
              {selected !== null && i === question.correctAnswerIndex && (
                <Text style={styles.optCheck}>✓</Text>
              )}
              {selected === i && i !== question.correctAnswerIndex && (
                <Text style={styles.optX}>✗</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Feedback */}
        {selected !== null && (
          <View
            style={[
              styles.feedback,
              {
                backgroundColor: isCorrect
                  ? COLORS.success + '15'
                  : COLORS.error + '15',
                borderColor: isCorrect ? COLORS.success : COLORS.error,
              },
            ]}>
            <Text
              style={[
                styles.feedbackText,
                {color: isCorrect ? COLORS.success : COLORS.error},
              ]}>
              {isCorrect
                ? '🎉 Correct!'
                : `❌ Correct answer: ${question.options[question.correctAnswerIndex]}`}
            </Text>
          </View>
        )}

        {/* Next / Submit */}
        {selected !== null && (
          <TouchableOpacity onPress={handleNext} activeOpacity={0.88}>
            <LinearGradient
              colors={GRADIENTS.primary}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.nextBtn}>
              <Text style={styles.nextBtnText}>
                {currentQ + 1 < questions.length ? 'Next →' : 'See Results'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </View>
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
    marginBottom: SPACING.md,
  },
  backText: {color: '#FFFFFF', fontSize: 16, fontWeight: '600'},
  headerTitle: {color: '#FFFFFF', fontSize: 14, fontWeight: '700'},
  qCounter: {color: '#8080B0', fontSize: 13, fontWeight: '600'},
  quizTrack: {flexDirection: 'row', gap: 4},
  quizTrackSeg: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  body: {flex: 1, padding: SPACING.md, gap: SPACING.md},
  questionCard: {
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
  },
  qLabel: {fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 8},
  qText: {fontSize: 16, fontWeight: '600', lineHeight: 24},
  options: {gap: 10},
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
  },
  optLetter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optLetterText: {fontSize: 13, fontWeight: '700'},
  optText: {flex: 1, fontSize: 14, fontWeight: '500', lineHeight: 20},
  optCheck: {color: COLORS.success, fontSize: 18, fontWeight: '800'},
  optX: {color: COLORS.error, fontSize: 18, fontWeight: '800'},
  feedback: {
    borderRadius: RADIUS.md,
    padding: 12,
    borderWidth: 1,
  },
  feedbackText: {fontSize: 13, fontWeight: '600'},
  nextBtn: {
    borderRadius: RADIUS.lg,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextBtnText: {color: '#FFFFFF', fontSize: 16, fontWeight: '800'},
  // Result styles
  resultHero: {
    paddingTop: 80,
    paddingBottom: 40,
    alignItems: 'center',
    gap: 8,
  },
  resultIcon: {fontSize: 56},
  resultTitle: {color: '#FFFFFF', fontSize: 26, fontWeight: '800'},
  resultScore: {
    color: '#FFFFFF',
    fontSize: 56,
    fontWeight: '900',
    letterSpacing: -2,
  },
  resultSub: {color: 'rgba(255,255,255,0.7)', fontSize: 15},
  resultBody: {
    flex: 1,
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  reviewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: RADIUS.md,
    padding: 12,
  },
  reviewIcon: {fontSize: 16},
  reviewQ: {flex: 1, fontSize: 12, lineHeight: 18},
  resultActions: {flexDirection: 'row', gap: 12, marginTop: SPACING.sm},
  resultBtn: {
    flex: 1,
    borderRadius: RADIUS.lg,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
  },
  resultBtnText: {fontSize: 14, fontWeight: '700'},
  resultBtnPrimary: {
    flex: 1,
    borderRadius: RADIUS.lg,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  resultBtnPrimaryText: {color: '#FFFFFF', fontSize: 14, fontWeight: '700'},
});
