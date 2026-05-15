// src/components/GradientCard.tsx
import React, {ReactNode} from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {RADIUS} from '../theme';

interface GradientCardProps extends TouchableOpacityProps {
  colors: string[];
  children: ReactNode;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  onPress?: () => void;
  start?: {x: number; y: number};
  end?: {x: number; y: number};
}

export const GradientCard = ({
  colors,
  children,
  style,
  contentStyle,
  onPress,
  start = {x: 0, y: 0},
  end = {x: 1, y: 1},
  ...rest
}: GradientCardProps) => {
  const content = (
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      style={[styles.gradient, style]}>
      <View style={[styles.content, contentStyle]}>{children}</View>
    </LinearGradient>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.88}
        style={[styles.shadow, style]}
        {...rest}>
        {content}
      </TouchableOpacity>
    );
  }
  return content;
};

const styles = StyleSheet.create({
  gradient: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
  },
  content: {
    padding: 16,
  },
  shadow: {
    borderRadius: RADIUS.lg,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
});
