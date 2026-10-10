// src/screens/LessonDetailScreen.tsx
import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../theme/ThemeContext';
import {COLORS, GRADIENTS, RADIUS, SPACING} from '../theme';
import {
  markLessonComplete,
  toggleBookmark,
  getProgress,
} from '../storage/progress';
import {CodeBlock} from '../components/CodeBlock';
import {lessonsData} from '../data/lessonsData';
import {RootStackParamList} from '../navigation/AppNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

type RouteType = RouteProp<RootStackParamList, 'LessonDetail'>;
type NavProp = NativeStackNavigationProp<RootStackParamList>;

const LEVEL_GRADIENT: Record<string, string[]> = {
  Beginner: GRADIENTS.beginner,
  Intermediate: GRADIENTS.intermediate,
  Advanced: GRADIENTS.advanced,
};

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-6551659254419770/2857551405';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

export default function LessonDetailScreen() {
  const {theme, isDark} = useTheme();
  const route = useRoute<RouteType>();
  const navigation = useNavigation<NavProp>();
  const {lessonId} = route.params;
  const lesson = lessonsData.find(l => l.id === lessonId)!;
  const [isCompleted, setIsCompleted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setAdLoaded(true);
      },
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setAdLoaded(false);
        interstitial.load(); // إعادة تحضير إعلان جديد
      },
    );

    interstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
    };
  }, []);

  useCallback(() => {
    getProgress().then(p => {
      setIsCompleted(p.completedLessons.includes(lessonId));
      setIsBookmarked(p.bookmarks.includes(lessonId));
    });
  }, [])();

  const handleComplete = async () => {
    await markLessonComplete(lessonId);
    setIsCompleted(true);

    if (adLoaded) {
      interstitial.show();
    }
  };

  const handleBookmark = async () => {
    const newState = await toggleBookmark(lessonId);
    setIsBookmarked(newState);
  };

  const gradientColors = LEVEL_GRADIENT[lesson.level] ?? GRADIENTS.primary;
  const contentParagraphs = lesson.content
    .split('\n')
    .filter(l => l.trim().length > 0);

  return (
    <View style={[styles.screen, {backgroundColor: theme.colors.bg}]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {/* Hero */}
      <LinearGradient colors={['#0F0C29', '#1A1A2E']} style={styles.hero}>
        {/* Nav row */}
        <View style={styles.navRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}>
            <Text style={styles.backText}>‹ Back</Text>
          </TouchableOpacity>
          <View style={styles.navActions}>
            <TouchableOpacity onPress={handleBookmark} style={styles.iconBtn}>
              <Text style={styles.iconBtnText}>
                {isBookmarked ? (
                  <Ionicons name="bookmark" size={24} color="#E06C75" />
                ) : (
                  <Ionicons name="bookmark-outline" size={24} color="#FFF" />
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Level chip */}
        <LinearGradient
          colors={gradientColors}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.levelChip}>
          <Text style={styles.levelChipText}>
            {lesson.level === 'Beginner'
              ? '🌱'
              : lesson.level === 'Intermediate'
              ? '⚡'
              : ''}{' '}
            {lesson.level}
          </Text>
        </LinearGradient>

        <Text style={styles.lessonNum}>Lesson {lesson.id}</Text>
        <Text style={styles.heroTitle}>{lesson.title}</Text>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Content paragraphs */}
        <View
          style={[
            styles.section,
            {backgroundColor: theme.colors.card, borderColor: theme.colors.border},
          ]}>
          <Text style={[styles.sectionHeader, {color: COLORS.primary}]}>
            📖 Explanation
          </Text>
          {contentParagraphs.map((para, i) => {
            const isHeading = para.startsWith('#');
            const text = para.replace(/^#+\s*/, '');
            if (isHeading) {
              return (
                <Text key={i} style={[styles.contentHeading, {color: theme.colors.text}]}>
                  {text}
                </Text>
              );
            }
            if (para.startsWith('-') || para.startsWith('•')) {
              return (
                <View key={i} style={styles.bulletRow}>
                  <Text style={[styles.bullet, {color: COLORS.primary}]}>•</Text>
                  <Text style={[styles.bulletText, {color: theme.colors.textSecondary}]}>
                    {para.substring(1).trim()}
                  </Text>
                </View>
              );
            }
            return (
              <Text key={i} style={[styles.contentText, {color: theme.colors.textSecondary}]}>
                {text}
              </Text>
            );
          })}
        </View>

        {/* Code Snippet */}
        <View style={styles.sectionWrap}>
          <Text style={[styles.sectionHeader2, {color: theme.colors.text}]}>
            💻 Code Example
          </Text>
          <CodeBlock
            code={lesson.codeSnippet}
            title={`Lesson ${lesson.id}`}
            showOutput={lesson.expectedOutput}
            showLineNumbers
          />
        </View>

        {/* Tips */}
        <View
          style={[
            styles.section,
            {backgroundColor: theme.colors.card, borderColor: theme.colors.border},
          ]}>
          <Text style={[styles.sectionHeader, {color: COLORS.intermediate}]}>
            💡 Pro Tips
          </Text>
          {lesson.tips.map((tip, i) => (
            <View key={i} style={styles.tipRow}>
              <LinearGradient colors={GRADIENTS.intermediate} style={styles.tipNum}>
                <Text style={styles.tipNumText}>{i + 1}</Text>
              </LinearGradient>
              <Text style={[styles.tipText, {color: theme.colors.textSecondary}]}>
                {tip}
              </Text>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionBtn, {backgroundColor: theme.colors.card, borderColor: theme.colors.border}]}
            onPress={() => navigation.navigate('Quiz', {lessonId})}>
            <Text style={styles.actionBtnIcon}> </Text>
            <Text style={[styles.actionBtnText, {color: theme.colors.text}]}>Take Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, {backgroundColor: theme.colors.card, borderColor: theme.colors.border}]}
            onPress={() => navigation.navigate('Exercise', {lessonId})}>
            <Text style={styles.actionBtnIcon}>✏️</Text>
            <Text style={[styles.actionBtnText, {color: theme.colors.text}]}>Exercise</Text>
          </TouchableOpacity>
        </View>

        {/* Complete Button */}
        {!isCompleted ? (
          <TouchableOpacity onPress={handleComplete} activeOpacity={0.88}>
            <LinearGradient
              colors={GRADIENTS.success}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.completeBtn}>
              <Text style={styles.completeBtnText}>✓ Mark as Complete (+50 XP)</Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <View style={styles.completedBadge}>
            <Text style={styles.completedText}>✅ Lesson Completed!</Text>
          </View>
        )}

        {/* Navigation between lessons */}
        <View style={styles.lessonNav}>
          {lesson.id > 1 && (
            <TouchableOpacity
              style={[styles.navBtn, {backgroundColor: theme.colors.card, borderColor: theme.colors.border}]}
              onPress={() =>
                navigation.replace('LessonDetail', {lessonId: lesson.id - 1})
              }>
              <Text style={[styles.navBtnText, {color: theme.colors.textSecondary}]}>
                ‹ Prev
              </Text>
            </TouchableOpacity>
          )}
          {lesson.id < lessonsData.length && (
            <TouchableOpacity
              style={[styles.navBtn, {backgroundColor: theme.colors.card, borderColor: theme.colors.border}]}
              onPress={() =>
                navigation.replace('LessonDetail', {lessonId: lesson.id + 1})
              }>
              <Text style={[styles.navBtnText, {color: theme.colors.textSecondary}]}>
                Next ›
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={{height: 40}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1},
  hero: {
    paddingTop: 56,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  backBtn: {padding: 4},
  backText: {color: '#FFFFFF', fontSize: 16, fontWeight: '600'},
  navActions: {flexDirection: 'row', gap: 8},
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnText: {fontSize: 16},
  levelChip: {
    alignSelf: 'flex-start',
    borderRadius: RADIUS.full,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: SPACING.sm,
  },
  levelChipText: {color: '#FFFFFF', fontSize: 11, fontWeight: '700'},
  lessonNum: {color: '#6060A0', fontSize: 12, fontWeight: '600', letterSpacing: 1},
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 4,
    lineHeight: 32,
  },
  scroll: {flex: 1},
  scrollContent: {padding: SPACING.md, gap: SPACING.md},
  section: {
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: SPACING.sm,
  },
  sectionHeader2: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: SPACING.sm,
  },
  sectionWrap: {},
  contentHeading: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 6,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 8,
  },
  bulletRow: {flexDirection: 'row', gap: 8, marginBottom: 6},
  bullet: {fontSize: 16, lineHeight: 22},
  bulletText: {flex: 1, fontSize: 14, lineHeight: 22},
  tipRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  tipNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  tipNumText: {color: '#FFFFFF', fontSize: 11, fontWeight: '800'},
  tipText: {flex: 1, fontSize: 13, lineHeight: 20},
  actions: {flexDirection: 'row', gap: 10},
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
  },
  actionBtnIcon: {fontSize: 18},
  actionBtnText: {fontSize: 14, fontWeight: '700'},
  completeBtn: {
    borderRadius: RADIUS.lg,
    paddingVertical: 16,
    alignItems: 'center',
  },
  completeBtnText: {color: '#FFFFFF', fontSize: 15, fontWeight: '800'},
  completedBadge: {
    borderRadius: RADIUS.lg,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: COLORS.success + '20',
  },
  completedText: {color: COLORS.success, fontSize: 15, fontWeight: '800'},
  lessonNav: {flexDirection: 'row', justifyContent: 'space-between', gap: 10},
  navBtn: {
    flex: 1,
    borderRadius: RADIUS.md,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  navBtnText: {fontSize: 14, fontWeight: '600'},
});