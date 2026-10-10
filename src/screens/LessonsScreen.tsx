// src/screens/LessonsScreen.tsx
import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import {useTheme} from '../theme/ThemeContext';
import {COLORS, GRADIENTS, RADIUS, SPACING} from '../theme';
import {getProgress, Progress} from '../storage/progress';
import {LessonCard} from '../components/LessonCard';
import {lessonsData, Lesson} from '../data/lessonsData';
import {RootStackParamList} from '../navigation/AppNavigator';

type NavProp = NativeStackNavigationProp<RootStackParamList>;
type Level = 'All' | 'Beginner' | 'Intermediate' | 'Advanced';

const TABS: Level[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const LEVEL_COLORS = {
  All: COLORS.primary,
  Beginner: COLORS.beginner,
  Intermediate: COLORS.intermediate,
  Advanced: COLORS.advanced,
};

// استبدل TestIds.BANNER بـ Ad Unit ID الخاص بك في الإنتاج
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-6551659254419770/5878552136';

export default function LessonsScreen() {
  const {theme, isDark} = useTheme();
  const navigation = useNavigation<NavProp>();
  const [activeTab, setActiveTab] = useState<Level>('All');
  const [progress, setProgress] = useState<Progress | null>(null);

  useFocusEffect(
    useCallback(() => {
      getProgress().then(setProgress);
    }, []),
  );

  const filtered: Lesson[] =
    activeTab === 'All'
      ? lessonsData
      : lessonsData.filter(l => l.level === activeTab);

  const completed = progress?.completedLessons ?? [];
  const completedCount = lessonsData.filter(l =>
    completed.includes(l.id),
  ).length;

  return (
    <View style={[styles.screen, {backgroundColor: theme.colors.bg}]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      {/* Header */}
      <LinearGradient
        colors={['#0F0C29', '#1A1A2E']}
        style={styles.header}>
        <Text style={styles.headerTitle}>📚 All Lessons</Text>
        <Text style={styles.headerSub}>
          {completedCount}/{lessonsData.length} completed · From Beginner to Expert
        </Text>
      </LinearGradient>

      {/* Level Tabs */}
      <View
        style={[styles.tabsWrap, {backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border}]}>
        <View style={styles.tabs}>
          {TABS.map(tab => {
            const isActive = tab === activeTab;
            const color = LEVEL_COLORS[tab];
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[
                  styles.tab,
                  isActive && {
                    backgroundColor: color + '20',
                    borderBottomColor: color,
                    borderBottomWidth: 2,
                  },
                ]}>
                <Text
                  style={[
                    styles.tabText,
                    {color: isActive ? color : theme.colors.textTertiary},
                    isActive && styles.tabTextActive,
                  ]}>
                  {tab === 'Intermediate' ? 'Inter.' : tab}
                </Text>
                <View
                  style={[
                    styles.countBadge,
                    {
                      backgroundColor: isActive
                        ? color + '30'
                        : theme.colors.surfaceAlt,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.countText,
                      {color: isActive ? color : theme.colors.textTertiary},
                    ]}>
                    {tab === 'All'
                      ? lessonsData.length
                      : lessonsData.filter(l => l.level === tab).length}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Lessons List */}
      <FlatList
        data={filtered}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <LessonCard
            lesson={item}
            isCompleted={completed.includes(item.id)}
            quizScore={progress?.quizScores?.[item.id]}
            isBookmarked={progress?.bookmarks?.includes(item.id)}
            onPress={() =>
              navigation.navigate('LessonDetail', {lessonId: item.id})
            }
          />
        )}
      />

      {/* Banner Ad Container */}
      <View style={styles.adContainer}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1},
  header: {
    paddingTop: 60,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerSub: {color: '#8080B0', fontSize: 13, marginTop: 4},
  tabsWrap: {
    borderBottomWidth: 1,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.sm,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
  },
  tabTextActive: {fontWeight: '700'},
  countBadge: {
    borderRadius: RADIUS.full,
    paddingHorizontal: 6,
    paddingVertical: 1,
    minWidth: 22,
    alignItems: 'center',
  },
  countText: {fontSize: 10, fontWeight: '700'},
  list: {paddingTop: SPACING.md, paddingBottom: SPACING.md},
  adContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'transparent',
  },
});