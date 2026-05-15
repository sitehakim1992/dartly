// src/screens/SearchScreen.tsx
import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTheme} from '../theme/ThemeContext';
import {COLORS, RADIUS, SPACING} from '../theme';
import {getProgress, Progress} from '../storage/progress';
import {LessonCard} from '../components/LessonCard';
import {lessonsData} from '../data/lessonsData';
import {RootStackParamList} from '../navigation/AppNavigator';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function SearchScreen() {
  const {theme, isDark} = useTheme();
  const navigation = useNavigation<NavProp>();
  const [query, setQuery] = useState('');
  const [progress, setProgress] = useState<Progress | null>(null);

  useFocusEffect(
    useCallback(() => {
      getProgress().then(setProgress);
    }, []),
  );

  const results = query.trim().length < 2
    ? []
    : lessonsData.filter(l =>
        l.title.toLowerCase().includes(query.toLowerCase()) ||
        l.content.toLowerCase().includes(query.toLowerCase()) ||
        l.level.toLowerCase().includes(query.toLowerCase()),
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
        <Text style={styles.headerTitle}>🔍 Search Lessons</Text>
        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
            },
          ]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={[styles.searchInput, {color: theme.colors.text}]}
            placeholder="Search topics, functions, concepts…"
            placeholderTextColor={theme.colors.textTertiary}
            value={query}
            onChangeText={setQuery}
            autoCorrect={false}
            autoCapitalize="none"
          />
          {query.length > 0 && (
            <Text
              style={[styles.clearBtn, {color: theme.colors.textTertiary}]}
              onPress={() => setQuery('')}>
              ✕
            </Text>
          )}
        </View>
      </LinearGradient>

      {query.trim().length < 2 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🔎</Text>
          <Text style={[styles.emptyTitle, {color: theme.colors.text}]}>
            Search for anything
          </Text>
          <Text style={[styles.emptyText, {color: theme.colors.textSecondary}]}>
            Try "functions", "async", "null safety", "classes"...
          </Text>
          <View style={styles.suggestRow}>
            {['Variables', 'async/await', 'Classes', 'Streams', 'Pattern Matching'].map(s => (
              <Text
                key={s}
                onPress={() => setQuery(s)}
                style={[
                  styles.suggest,
                  {
                    backgroundColor: COLORS.primary + '15',
                    color: COLORS.primary,
                  },
                ]}>
                {s}
              </Text>
            ))}
          </View>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>😕</Text>
              <Text style={[styles.emptyTitle, {color: theme.colors.text}]}>
                No results for "{query}"
              </Text>
            </View>
          }
          ListHeaderComponent={
            results.length > 0 ? (
              <Text style={[styles.resultCount, {color: theme.colors.textTertiary}]}>
                {results.length} lesson{results.length !== 1 ? 's' : ''} found
              </Text>
            ) : null
          }
          renderItem={({item}) => (
            <LessonCard
              lesson={item}
              isCompleted={progress?.completedLessons.includes(item.id) ?? false}
              quizScore={progress?.quizScores?.[item.id]}
              onPress={() => navigation.navigate('LessonDetail', {lessonId: item.id})}
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
    gap: 12,
  },
  headerTitle: {color: '#FFFFFF', fontSize: 22, fontWeight: '800'},
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RADIUS.lg,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    gap: 10,
  },
  searchIcon: {fontSize: 16},
  searchInput: {flex: 1, fontSize: 15},
  clearBtn: {fontSize: 14, padding: 4},
  list: {paddingTop: SPACING.md, paddingBottom: 100},
  resultCount: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: SPACING.xl,
    gap: 10,
  },
  emptyIcon: {fontSize: 48},
  emptyTitle: {fontSize: 18, fontWeight: '700', textAlign: 'center'},
  emptyText: {fontSize: 14, textAlign: 'center', lineHeight: 22},
  suggestRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginTop: 12,
  },
  suggest: {
    borderRadius: RADIUS.full,
    paddingHorizontal: 14,
    paddingVertical: 6,
    fontSize: 13,
    fontWeight: '600',
  },
});
