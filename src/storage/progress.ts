// src/storage/progress.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  COMPLETED: '@dartify_completed',
  QUIZ_SCORES: '@dartify_quiz_scores',
  XP: '@dartify_xp',
  STREAK: '@dartify_streak',
  LAST_OPEN: '@dartify_last_open',
  BOOKMARKS: '@dartify_bookmarks',
  SETTINGS: '@dartify_settings',
};

export interface Progress {
  completedLessons: number[];
  quizScores: Record<number, number>; // lessonId -> best score (0-100)
  xp: number;
  streak: number;
  lastOpen: string | null;
  bookmarks: number[];
}

export const getProgress = async (): Promise<Progress> => {
  try {
    const [completed, scores, xp, streak, lastOpen, bookmarks] =
      await AsyncStorage.multiGet([
        KEYS.COMPLETED,
        KEYS.QUIZ_SCORES,
        KEYS.XP,
        KEYS.STREAK,
        KEYS.LAST_OPEN,
        KEYS.BOOKMARKS,
      ]);
    return {
      completedLessons: completed[1] ? JSON.parse(completed[1]) : [],
      quizScores: scores[1] ? JSON.parse(scores[1]) : {},
      xp: xp[1] ? parseInt(xp[1], 10) : 0,
      streak: streak[1] ? parseInt(streak[1], 10) : 0,
      lastOpen: lastOpen[1] ?? null,
      bookmarks: bookmarks[1] ? JSON.parse(bookmarks[1]) : [],
    };
  } catch {
    return {
      completedLessons: [],
      quizScores: {},
      xp: 0,
      streak: 0,
      lastOpen: null,
      bookmarks: [],
    };
  }
};

export const markLessonComplete = async (lessonId: number): Promise<void> => {
  try {
    const raw = await AsyncStorage.getItem(KEYS.COMPLETED);
    const arr: number[] = raw ? JSON.parse(raw) : [];
    if (!arr.includes(lessonId)) {
      arr.push(lessonId);
      await AsyncStorage.setItem(KEYS.COMPLETED, JSON.stringify(arr));
      await addXP(50);
    }
  } catch {}
};

export const saveQuizScore = async (
  lessonId: number,
  score: number,
): Promise<void> => {
  try {
    const raw = await AsyncStorage.getItem(KEYS.QUIZ_SCORES);
    const scores: Record<number, number> = raw ? JSON.parse(raw) : {};
    if ((scores[lessonId] ?? 0) < score) {
      scores[lessonId] = score;
      await AsyncStorage.setItem(KEYS.QUIZ_SCORES, JSON.stringify(scores));
      if (score === 100) {
        await addXP(30);
      } else if (score >= 66) {
        await addXP(15);
      }
    }
  } catch {}
};

export const addXP = async (amount: number): Promise<void> => {
  try {
    const raw = await AsyncStorage.getItem(KEYS.XP);
    const current = raw ? parseInt(raw, 10) : 0;
    await AsyncStorage.setItem(KEYS.XP, String(current + amount));
  } catch {}
};

export const updateStreak = async (): Promise<number> => {
  try {
    const today = new Date().toDateString();
    const lastOpen = await AsyncStorage.getItem(KEYS.LAST_OPEN);
    const streakRaw = await AsyncStorage.getItem(KEYS.STREAK);
    let streak = streakRaw ? parseInt(streakRaw, 10) : 0;

    if (lastOpen) {
      const last = new Date(lastOpen);
      const diff =
        (new Date(today).getTime() - last.getTime()) / (1000 * 60 * 60 * 24);
      if (diff >= 1 && diff < 2) {
        streak += 1;
      } else if (diff >= 2) {
        streak = 1;
      }
    } else {
      streak = 1;
    }

    await AsyncStorage.multiSet([
      [KEYS.STREAK, String(streak)],
      [KEYS.LAST_OPEN, today],
    ]);
    return streak;
  } catch {
    return 0;
  }
};

export const toggleBookmark = async (lessonId: number): Promise<boolean> => {
  try {
    const raw = await AsyncStorage.getItem(KEYS.BOOKMARKS);
    let arr: number[] = raw ? JSON.parse(raw) : [];
    const isBookmarked = arr.includes(lessonId);
    if (isBookmarked) {
      arr = arr.filter(id => id !== lessonId);
    } else {
      arr.push(lessonId);
    }
    await AsyncStorage.setItem(KEYS.BOOKMARKS, JSON.stringify(arr));
    return !isBookmarked;
  } catch {
    return false;
  }
};

export const resetProgress = async (): Promise<void> => {
  await AsyncStorage.multiRemove(Object.values(KEYS));
};

export const getXPLevel = (xp: number) => {
  if (xp < 200) return {level: 1, title: 'Dart Newbie', next: 200};
  if (xp < 500) return {level: 2, title: 'Dart Learner', next: 500};
  if (xp < 1000) return {level: 3, title: 'Dart Builder', next: 1000};
  if (xp < 2000) return {level: 4, title: 'Dart Developer', next: 2000};
  if (xp < 3500) return {level: 5, title: 'Dart Expert', next: 3500};
  return {level: 6, title: 'Dart Master', next: Infinity};
};
