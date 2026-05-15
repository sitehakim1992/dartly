// src/screens/ProfileScreen.tsx
import React, {useCallback, useState} from 'react';
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
import {useFocusEffect} from '@react-navigation/native';
import {useTheme} from '../theme/ThemeContext';
import {COLORS, GRADIENTS, RADIUS, SPACING} from '../theme';
import {
  getProgress,
  resetProgress,
  getXPLevel,
  Progress,
} from '../storage/progress';
import {XPBar} from '../components/XPBar';
import {lessonsData} from '../data/lessonsData';

export default function ProfileScreen() {
  const {theme, isDark, toggleTheme} = useTheme();
  const [progress, setProgress] = useState<Progress | null>(null);

  useFocusEffect(
    useCallback(() => {
      getProgress().then(setProgress);
    }, []),
  );

  const handleReset = () => {
    Alert.alert(
      'Reset Progress',
      'This will delete all your progress, XP, and streaks. Are you sure?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await resetProgress();
            getProgress().then(setProgress);
          },
        },
      ],
    );
  };

  const xp = progress?.xp ?? 0;
  const {level, title} = getXPLevel(xp);
  const completed = progress?.completedLessons.length ?? 0;
  const totalQ = Object.keys(progress?.quizScores ?? {}).length;
  const avgScore = totalQ > 0
    ? Math.round(Object.values(progress!.quizScores).reduce((a, b) => a + b, 0) / totalQ)
    : 0;

  const achievements = [
    {icon: '🌱', label: 'First Lesson', unlocked: completed >= 1},
    {icon: '📖', label: '10 Lessons', unlocked: completed >= 10},
    {icon: '🎓', label: '20 Lessons', unlocked: completed >= 20},
    {icon: '⚡', label: 'All Beginner', unlocked: lessonsData.filter(l => l.level === 'Beginner').every(l => progress?.completedLessons.includes(l.id))},
    {icon: '🔥', label: '7-Day Streak', unlocked: (progress?.streak ?? 0) >= 7},
    {icon: '🏆', label: 'Quiz Master', unlocked: avgScore >= 90 && totalQ >= 5},
    {icon: '💎', label: 'All Lessons', unlocked: completed === lessonsData.length},
    {icon: '⭐', label: '500 XP', unlocked: xp >= 500},
  ];

  return (
    <View style={[styles.screen, {backgroundColor: theme.colors.bg}]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <LinearGradient
          colors={['#0F0C29', '#302B63', '#24243E']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.hero}>

          {/* Avatar */}
          <LinearGradient
            colors={GRADIENTS.primary}
            style={styles.avatar}>
            <Text style={styles.avatarText}>D</Text>
          </LinearGradient>

          <Text style={styles.userName}>Dart Developer</Text>
          <Text style={styles.userLevel}>{title} · Level {level}</Text>

          <View style={styles.xpWrap}>
            <XPBar xp={xp} />
          </View>
        </LinearGradient>

        <View style={styles.body}>
          {/* Stats grid */}
          <View style={styles.statsGrid}>
            {[
              {icon: '✅', label: 'Completed', value: `${completed}/${lessonsData.length}`},
              {icon: '🔥', label: 'Streak', value: `${progress?.streak ?? 0} days`},
              {icon: '🧠', label: 'Quizzes', value: `${totalQ}`},
              {icon: '⭐', label: 'Avg Score', value: `${avgScore}%`},
              {icon: '🔖', label: 'Bookmarks', value: `${progress?.bookmarks.length ?? 0}`},
              {icon: '💎', label: 'Total XP', value: `${xp}`},
            ].map(stat => (
              <View
                key={stat.label}
                style={[
                  styles.statCard,
                  {
                    backgroundColor: theme.colors.card,
                    borderColor: theme.colors.border,
                  },
                ]}>
                <Text style={styles.statIcon}>{stat.icon}</Text>
                <Text style={[styles.statValue, {color: theme.colors.text}]}>
                  {stat.value}
                </Text>
                <Text style={[styles.statLabel, {color: theme.colors.textTertiary}]}>
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>

          {/* Achievements */}
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            Achievements
          </Text>
          <View style={styles.achievementsGrid}>
            {achievements.map(a => (
              <View
                key={a.label}
                style={[
                  styles.achieveCard,
                  {
                    backgroundColor: a.unlocked
                      ? COLORS.primary + '15'
                      : theme.colors.card,
                    borderColor: a.unlocked
                      ? COLORS.primary + '40'
                      : theme.colors.border,
                    opacity: a.unlocked ? 1 : 0.5,
                  },
                ]}>
                <Text style={[styles.achieveIcon, {opacity: a.unlocked ? 1 : 0.4}]}>
                  {a.icon}
                </Text>
                <Text
                  style={[
                    styles.achieveLabel,
                    {
                      color: a.unlocked
                        ? COLORS.primary
                        : theme.colors.textTertiary,
                    },
                  ]}>
                  {a.label}
                </Text>
              </View>
            ))}
          </View>

          {/* Settings */}
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            Settings
          </Text>

          <View
            style={[
              styles.settingsCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ]}>
            <TouchableOpacity
              style={[styles.settingRow, {borderBottomColor: theme.colors.border}]}
              onPress={toggleTheme}>
              <Text style={styles.settingIcon}>{isDark ? '☀️' : '🌙'}</Text>
              <Text style={[styles.settingLabel, {color: theme.colors.text}]}>
                {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </Text>
              <Text style={[styles.settingArrow, {color: theme.colors.textTertiary}]}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingRow} onPress={handleReset}>
              <Text style={styles.settingIcon}>🗑️</Text>
              <Text style={[styles.settingLabel, {color: COLORS.error}]}>
                Reset All Progress
              </Text>
              <Text style={[styles.settingArrow, {color: theme.colors.textTertiary}]}>›</Text>
            </TouchableOpacity>
          </View>

          {/* App info */}
          <Text style={[styles.appInfo, {color: theme.colors.textTertiary}]}>
            Dartly v1.0.0 · 60 Lessons · Dart 3.0+
          </Text>

          <View style={{height: 80}} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1},
  hero: {
    paddingTop: 70,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl,
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  avatarText: {color: '#FFFFFF', fontSize: 36, fontWeight: '800'},
  userName: {color: '#FFFFFF', fontSize: 22, fontWeight: '800'},
  userLevel: {color: '#8080B0', fontSize: 13},
  xpWrap: {width: '100%', marginTop: SPACING.sm},
  body: {padding: SPACING.md},
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: SPACING.lg,
  },
  statCard: {
    width: '30%',
    flexGrow: 1,
    borderRadius: RADIUS.lg,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    gap: 4,
  },
  statIcon: {fontSize: 20},
  statValue: {fontSize: 16, fontWeight: '800'},
  statLabel: {fontSize: 10, fontWeight: '600'},
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: SPACING.md,
    marginTop: SPACING.sm,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: SPACING.lg,
  },
  achieveCard: {
    width: '22%',
    flexGrow: 1,
    borderRadius: RADIUS.md,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    gap: 4,
  },
  achieveIcon: {fontSize: 22},
  achieveLabel: {fontSize: 9, fontWeight: '700', textAlign: 'center'},
  settingsCard: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    borderWidth: 1,
    marginBottom: SPACING.lg,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: 16,
    gap: 12,
    borderBottomWidth: 0.5,
  },
  settingIcon: {fontSize: 20},
  settingLabel: {flex: 1, fontSize: 15, fontWeight: '500'},
  settingArrow: {fontSize: 20},
  appInfo: {
    textAlign: 'center',
    fontSize: 12,
    marginBottom: SPACING.md,
  },
});
