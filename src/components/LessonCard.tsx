// src/components/LessonCard.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../theme/ThemeContext';
import {COLORS, RADIUS, SPACING, GRADIENTS} from '../theme';
import {Lesson} from '../data/lessonsData';

interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  quizScore?: number;
  isBookmarked?: boolean;
  onPress: () => void;
}

const LEVEL_CONFIG = {
  Beginner: {
    gradient: GRADIENTS.beginner,
    icon: '🌱',
    color: COLORS.beginner,
  },
  Intermediate: {
    gradient: GRADIENTS.intermediate,
    icon: '⚡',
    color: COLORS.intermediate,
  },
  Advanced: {
    gradient: GRADIENTS.advanced,
    icon: '🔥',
    color: COLORS.advanced,
  },
};

export const LessonCard = ({
  lesson,
  isCompleted,
  quizScore,
  isBookmarked,
  onPress,
}: LessonCardProps) => {
  const {theme} = useTheme();
  const config = LEVEL_CONFIG[lesson.level];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.88}
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.card,
          borderColor: isCompleted ? config.color + '40' : theme.colors.border,
          borderWidth: isCompleted ? 1.5 : 1,
        },
      ]}>
      {/* Left accent */}
      <LinearGradient
        colors={config.gradient}
        style={styles.accent}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
      />

      {/* Number badge */}
      <View style={[styles.numBadge, {backgroundColor: theme.colors.surfaceAlt}]}>
        <Text style={[styles.numText, {color: theme.colors.textSecondary}]}>
          {String(lesson.id).padStart(2, '0')}
        </Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={[styles.title, {color: theme.colors.text}]} numberOfLines={2}>
          {lesson.title}
        </Text>
        <View style={styles.meta}>
          <Text style={[styles.metaText, {color: theme.colors.textTertiary}]}>
            {config.icon} {lesson.level}
          </Text>
          <Text style={[styles.metaText, {color: theme.colors.textTertiary}]}>
            · 3 quiz · exercise
          </Text>
        </View>
        {quizScore !== undefined && (
          <View style={styles.scoreRow}>
            <View
              style={[
                styles.scoreBadge,
                {
                  backgroundColor:
                    quizScore >= 66
                      ? COLORS.success + '20'
                      : COLORS.warning + '20',
                },
              ]}>
              <Text
                style={[
                  styles.scoreText,
                  {
                    color:
                      quizScore >= 66 ? COLORS.success : COLORS.warning,
                  },
                ]}>
                Quiz: {quizScore}%
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Status icons */}
      <View style={styles.right}>
        {isBookmarked && <Text style={styles.bookmark}>🔖</Text>}
        {isCompleted ? (
          <View
            style={[
              styles.checkCircle,
              {backgroundColor: config.color + '20'},
            ]}>
            <Text style={styles.checkIcon}>✓</Text>
          </View>
        ) : (
          <Text style={[styles.arrow, {color: theme.colors.textTertiary}]}>›</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RADIUS.lg,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  accent: {
    width: 4,
    alignSelf: 'stretch',
  },
  numBadge: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  numText: {
    fontSize: 13,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    paddingVertical: 14,
    paddingRight: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  meta: {
    flexDirection: 'row',
    marginTop: 4,
    flexWrap: 'wrap',
  },
  metaText: {
    fontSize: 11,
  },
  scoreRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
  scoreBadge: {
    borderRadius: RADIUS.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  scoreText: {
    fontSize: 10,
    fontWeight: '700',
  },
  right: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 14,
    gap: 4,
  },
  bookmark: {
    fontSize: 12,
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    color: '#38EF7D',
    fontSize: 14,
    fontWeight: '800',
  },
  arrow: {
    fontSize: 22,
    fontWeight: '300',
  },
});
