// src/components/XPBar.tsx
import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../theme/ThemeContext';
import {GRADIENTS, RADIUS} from '../theme';
import {getXPLevel} from '../storage/progress';

interface XPBarProps {
  xp: number;
}

export const XPBar = ({xp}: XPBarProps) => {
  const {theme} = useTheme();
  const {level, title, next} = getXPLevel(xp);
  const prev = [0, 200, 500, 1000, 2000, 3500][level - 1] ?? 0;
  const progress = next === Infinity ? 1 : (xp - prev) / (next - prev);
  const animWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animWidth, {
      toValue: progress,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.badgeWrap}>
          <LinearGradient
            colors={GRADIENTS.primary}
            style={styles.badge}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            <Text style={styles.level}>Lv.{level}</Text>
          </LinearGradient>
        </View>
        <View style={styles.info}>
          <Text style={[styles.title, {color: theme.colors.text}]}>{title}</Text>
          <Text style={[styles.xpText, {color: theme.colors.textSecondary}]}>
            {xp} XP {next !== Infinity ? `/ ${next} XP` : '(MAX)'}
          </Text>
        </View>
      </View>
      <View style={[styles.track, {backgroundColor: theme.colors.border}]}>
        <Animated.View
          style={[
            styles.fill,
            {
              width: animWidth.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}>
          <LinearGradient
            colors={GRADIENTS.primary}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  badgeWrap: {
    shadowColor: '#667EEA',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 4,
  },
  badge: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  level: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
  },
  xpText: {
    fontSize: 12,
    marginTop: 2,
  },
  track: {
    height: 8,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
});
