// src/theme/index.ts
import {Appearance} from 'react-native';

export const GRADIENTS = {
  primary: ['#667EEA', '#764BA2'],
  success: ['#11998E', '#38EF7D'],
  warning: ['#F7971E', '#FFD200'],
  danger: ['#FF416C', '#FF4B2B'],
  beginner: ['#4776E6', '#8E54E9'],
  intermediate: ['#11998E', '#38EF7D'],
  advanced: ['#F7971E', '#FFD200'],
  hero: ['#0F0C29', '#302B63', '#24243E'],
  cardDark: ['#1A1A2E', '#16213E'],
  cardLight: ['#FFFFFF', '#F0F4FF'],
  quiz: ['#8E2DE2', '#4A00E0'],
  complete: ['#11998E', '#38EF7D'],
};

export const COLORS = {
  // Brand
  primary: '#667EEA',
  primaryDark: '#5A6FD6',
  accent: '#764BA2',
  accentLight: '#9B6EC7',

  // Levels
  beginner: '#4776E6',
  intermediate: '#11998E',
  advanced: '#F7971E',

  // Neutrals - Dark
  dark: {
    bg: '#0D0D1A',
    surface: '#1A1A2E',
    surfaceAlt: '#16213E',
    card: '#1E1E3A',
    border: '#2A2A4A',
    borderLight: '#3A3A5A',
    text: '#FFFFFF',
    textSecondary: '#A0A0C0',
    textTertiary: '#6060A0',
    icon: '#8080B0',
  },

  // Neutrals - Light
  light: {
    bg: '#F5F5FF',
    surface: '#FFFFFF',
    surfaceAlt: '#F0F0FA',
    card: '#FFFFFF',
    border: '#E0E0F0',
    borderLight: '#EBEBFF',
    text: '#1A1A2E',
    textSecondary: '#4A4A6A',
    textTertiary: '#8080A0',
    icon: '#6060A0',
  },

  // Semantic
  success: '#38EF7D',
  error: '#FF416C',
  warning: '#FFD200',
  info: '#667EEA',
  code: '#1E1E3A',
  codeBg: '#0D1117',
};

export type Theme = typeof darkTheme;

export const darkTheme = {
  isDark: true,
  colors: {
    ...COLORS,
    ...COLORS.dark,
    gradients: GRADIENTS,
  },
};

export const lightTheme = {
  isDark: false,
  colors: {
    ...COLORS,
    ...COLORS.light,
    gradients: GRADIENTS,
  },
};

export const FONTS = {
  regular: {fontFamily: 'System', fontWeight: '400' as const},
  medium: {fontFamily: 'System', fontWeight: '500' as const},
  semibold: {fontFamily: 'System', fontWeight: '600' as const},
  bold: {fontFamily: 'System', fontWeight: '700' as const},
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};
