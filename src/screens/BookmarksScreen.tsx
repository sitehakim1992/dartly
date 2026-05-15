// src/screens/BookmarksScreen.tsx
import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet, FlatList, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTheme} from '../theme/ThemeContext';
import {SPACING} from '../theme';
import {getProgress, Progress} from '../storage/progress';
import {LessonCard} from '../components/LessonCard';
import {lessonsData} from '../data/lessonsData';
import {RootStackParamList} from '../navigation/AppNavigator';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function BookmarksScreen() {
  const {theme, isDark} = useTheme();
  const navigation = useNavigation<NavProp>();
  const [progress, setProgress] = useState<Progress | null>(null);

  useFocusEffect(
    useCallback(() => {
      getProgress().then(setProgress);
    }, []),
  );

  const bookmarked = lessonsData.filter(l =>
    progress?.bookmarks.includes(l.id),
  );

  return (
    <View style={[styles.screen, {backgroundColor: theme.colors.bg}]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <LinearGradient
        colors={['#0F0C29', '#1A1A2E']}
        style={styles.header}>
        <Text style={styles.headerTitle}>🔖 Bookmarks</Text>
        <Text style={styles.headerSub}>{bookmarked.length} saved lessons</Text>
      </LinearGradient>

      {bookmarked.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>🔖</Text>
          <Text style={[styles.emptyTitle, {color: theme.colors.text}]}>
            No bookmarks yet
          </Text>
          <Text style={[styles.emptyText, {color: theme.colors.textSecondary}]}>
            Tap the bookmark icon on any lesson to save it for later.
          </Text>
        </View>
      ) : (
        <FlatList
          data={bookmarked}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={styles.list}
          renderItem={({item}) => (
            <LessonCard
              lesson={item}
              isCompleted={progress?.completedLessons.includes(item.id) ?? false}
              quizScore={progress?.quizScores?.[item.id]}
              isBookmarked
              onPress={() =>
                navigation.navigate('LessonDetail', {lessonId: item.id})
              }
            />
          )}
        />
      )}
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
  headerTitle: {color: '#FFFFFF', fontSize: 26, fontWeight: '800'},
  headerSub: {color: '#8080B0', fontSize: 13, marginTop: 4},
  list: {paddingTop: SPACING.md, paddingBottom: 100},
  empty: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 40,
    gap: 12,
  },
  emptyIcon: {fontSize: 56},
  emptyTitle: {fontSize: 20, fontWeight: '700'},
  emptyText: {fontSize: 14, textAlign: 'center', lineHeight: 22},
});
