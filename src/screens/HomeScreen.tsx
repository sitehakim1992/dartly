// src/screens/HomeScreen.tsx
import React, {useState, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTheme} from '../theme/ThemeContext';
import {COLORS, GRADIENTS, RADIUS, SPACING} from '../theme';
import {getProgress, updateStreak, Progress} from '../storage/progress';
import {XPBar} from '../components/XPBar';
import {GradientCard} from '../components/GradientCard';
import {lessonsData} from '../data/lessonsData';
import {RootStackParamList} from '../navigation/AppNavigator';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const GREETINGS = ['Welcome back', 'Keep coding', 'Happy learning', 'Level up!'];

export default function HomeScreen() {
  const {theme, isDark, toggleTheme} = useTheme();
  const navigation = useNavigation<NavProp>();
  const [progress, setProgress] = useState<Progress | null>(null);
  const [greeting, setGreeting] = useState(GREETINGS[0]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    await updateStreak();
    const p = await getProgress();
    setProgress(p);
    setGreeting(GREETINGS[Math.floor(Math.random() * GREETINGS.length)]);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  // Memoized stats
  const stats = useMemo(() => {
    const completed = progress?.completedLessons.length ?? 0;
    const total = lessonsData.length;
    const next = lessonsData.find(l => !progress?.completedLessons.includes(l.id)) ?? lessonsData[0];
    
    const levels = ['Beginner', 'Intermediate', 'Advanced'].map(lvl => {
      const levelLessons = lessonsData.filter(l => l.level === lvl);
      const done = levelLessons.filter(l => progress?.completedLessons.includes(l.id)).length;
      return {
        name: lvl,
        total: levelLessons.length,
        done,
        pct: levelLessons.length > 0 ? (done / levelLessons.length) * 100 : 0,
      };
    });

    return {completed, total, next, levels, pct: Math.round((completed / total) * 100)};
  }, [progress]);

  // Safe navigation handler
  const handleQuickToolPress = (label: string) => {
    if (!lessonsData || lessonsData.length === 0) return;
    const defaultLesson = lessonsData[0];
    if (label === 'Saved') navigation.navigate('Bookmarks');
    else if (label === 'Quizzes') navigation.navigate('Quiz', {lessonId: defaultLesson.id});
    else if (label === 'Code') navigation.navigate('Exercise', {lessonId: defaultLesson.id});
  };

  return (
    <View style={[styles.screen, {backgroundColor: theme.colors.bg}]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFF" />
        }>
        
        {/* --- MODERN HERO HEADER --- */}
        <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.hero}>
          <View style={styles.heroHeader}>
            <View>
              <Text style={styles.greetingSmall}>{greeting},</Text>
              <Text style={styles.heroTitle}>Dartly Student</Text>
            </View>
            <TouchableOpacity onPress={toggleTheme} style={styles.themeBtn}>
              <Ionicons name={isDark ? 'sunny-outline' : 'moon-outline'} size={18} color="#FFF" />
            </TouchableOpacity>
          </View>

          {progress && (
            <View style={styles.xpSection}>
              <View style={styles.xpHeader}>
                <Text style={styles.xpLabel}>CURRENT LEVEL</Text>
                <Text style={styles.xpValue}>{progress.xp} XP</Text>
              </View>
              <XPBar xp={progress.xp} />
            </View>
          )}

          <View style={styles.statsGrid}>
            <View style={styles.glassChip}>
              <Ionicons name="flame-outline" size={16} color="#FFF" style={styles.chipIcon} />
              <Text style={styles.chipText}>{progress?.streak ?? 0} Days</Text>
            </View>
            <View style={styles.glassChip}>
              <Ionicons name="target-outline" size={16} color="#FFF" style={styles.chipIcon} />
              <Text style={styles.chipText}>{stats.pct}% Progress</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={{paddingTop:20}}></View>

          {/* --- MOTIVATIONAL DART CODE BLOCK --- */}
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Code Snippet of the Day</Text>
          <View style={styles.codeContainer}>
            <View style={styles.codeHeader}>
              <View style={styles.codeDots}>
                <View style={[styles.codeDot, {backgroundColor: '#FF5F56'}]} />
                <View style={[styles.codeDot, {backgroundColor: '#FFBD2E'}]} />
                <View style={[styles.codeDot, {backgroundColor: '#27C93F'}]} />
              </View>
              <Text style={styles.codeHeaderText}>motivation.dart</Text>
            </View>
            <View style={styles.codeBody}>
              <Text style={styles.codeLine}>
                <Text style={styles.keyword}>void </Text>
                <Text style={styles.function}>main</Text>
                <Text style={styles.punctuation}>() {'{'}</Text>
              </Text>
              <Text style={[styles.codeLine, {paddingLeft: 16}]}>
                <Text style={styles.keyword}>var </Text>
                <Text style={styles.variable}>skills </Text>
                <Text style={styles.punctuation}>= </Text>
                <Text style={styles.string}>"Loading..."</Text>
                <Text style={styles.punctuation}>;</Text>
              </Text>
              <Text style={[styles.codeLine, {paddingLeft: 16}]}>
                <Text style={styles.keyword}>for </Text>
                <Text style={styles.punctuation}>(</Text>
                <Text style={styles.keyword}>int </Text>
                <Text style={styles.variable}>day </Text>
                <Text style={styles.punctuation}>= </Text>
                <Text style={styles.number}>1</Text>
                <Text style={styles.punctuation}>; </Text>
                <Text style={styles.variable}>day </Text>
                <Text style={styles.punctuation}>&lt;= </Text>
                <Text style={styles.number}>365</Text>
                <Text style={styles.punctuation}>; </Text>
                <Text style={styles.variable}>day</Text>
                <Text style={styles.punctuation}>++) {'{'}</Text>
              </Text>
              <Text style={[styles.codeLine, {paddingLeft: 32}]}>
                <Text style={styles.variable}>skills </Text>
                <Text style={styles.punctuation}>+= </Text>
                <Text style={styles.string}>"🚀 Progress!"</Text>
                <Text style={styles.punctuation}>;</Text>
              </Text>
              <Text style={[styles.codeLine, {paddingLeft: 16}]}>{'}'}</Text>
              <Text style={[styles.codeLine, {paddingLeft: 16}]}>
                <Text style={styles.function}>print</Text>
                <Text style={styles.punctuation}>(</Text>
                <Text style={styles.string}>"You are unstoppable!"</Text>
                <Text style={styles.punctuation}>);</Text>
              </Text>
              <Text style={styles.codeLine}>{'}'}</Text>
            </View>
          </View>


        <View style={styles.body}>
          {/* --- CONTINUE LEARNING --- */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Resume Course</Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Lessons')}
              activeOpacity={0.85}
              style={styles.viewAllCard}
            >
              <LinearGradient
                colors={['#1E1E2E', '#2A2A4A']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.viewAllGradient}
              >
                <Text style={styles.viewAllText}>View All Lessons</Text>
                <Ionicons name="arrow-forward" size={16} color={COLORS.primary} />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <GradientCard
            colors={GRADIENTS.primary}
            onPress={() => navigation.navigate('LessonDetail', {lessonId: stats.next.id})}
            style={styles.nextCard}>
            <View style={styles.nextCardContent}>
              <View style={styles.nextTextGroup}>
                <Text style={styles.nextTag}>ACTIVE LESSON</Text>
                <Text style={styles.nextTitle} numberOfLines={1}>{stats.next.title}</Text>
                <View style={styles.levelBadge}>
                   <Text style={styles.levelBadgeText}>{stats.next.level}</Text>
                </View>
              </View>
              <View style={styles.playBtn}>
                <Ionicons name="play" size={20} color="#000" />
              </View>
            </View>
          </GradientCard>

          {/* --- PATH PROGRESS --- */}
          <Text style={[styles.sectionTitle, {color: theme.colors.text, marginTop: SPACING.lg}]}>
            Your Mastery
          </Text>
          <View style={styles.pathGrid}>
            {stats.levels.map((item, idx) => (
              <LinearGradient
                key={item.name}
                colors={[
                  isDark ? '#1E1E2E' : '#F8F9FA',
                  isDark ? '#2A2A3E' : '#E9ECEF'
                ]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.pathCard}>
                <View style={[styles.dot, {backgroundColor: [COLORS.beginner, COLORS.intermediate, COLORS.advanced][idx]}]} />
                <Text style={[styles.pathName, {color: theme.colors.textSecondary}]}>{item.name}</Text>
                <Text style={[styles.pathStat, {color: theme.colors.text}]}>{item.done}/{item.total}</Text>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, {width: `${item.pct}%`, backgroundColor: [COLORS.beginner, COLORS.intermediate, COLORS.advanced][idx]}]} />
                </View>
              </LinearGradient>
            ))}
          </View>

          {/* --- START LEARNING CARD --- */}
          <TouchableOpacity 
            activeOpacity={0.85} 
            onPress={() => navigation.navigate('Lessons')}
            style={styles.startLearningCard}
          >
            <LinearGradient
              colors={['#4776E6', '#8E54E9']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.startLearningGradient}
            >
              <View style={styles.startContent}>
                <Ionicons name="rocket" size={36} color="#FFF" />
                <View style={styles.startTextGroup}>
                  <Text style={styles.startTitle}>Start Learning</Text>
                  <Text style={styles.startSub}>Dive into your first lesson and earn XP</Text>
                </View>
              </View>
              <View style={styles.startBtn}>
                <Text style={styles.startBtnText}>Begin Now</Text>
                <Ionicons name="arrow-forward" size={20} color="#FFF" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* --- QUICK ACCESS --- */}
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Quick Tools</Text>
          <View style={styles.toolRow}>
            {[
              {label: 'Quizzes', icon: 'brain-outline', colors: ['#FF512F', '#DD2476']},
              {label: 'Code', icon: 'code-slash-outline', colors: ['#4776E6', '#8E54E9']},
              {label: 'Saved', icon: 'bookmark-outline', colors: ['#00B4DB', '#0083B0']},
            ].map(tool => (
              <TouchableOpacity 
                key={tool.label} 
                activeOpacity={0.8} 
                style={styles.toolItem}
                onPress={() => handleQuickToolPress(tool.label)}
              >
                <LinearGradient colors={tool.colors} style={styles.toolIconBox}>
                  <Ionicons name={tool.icon as any} size={26} color="#FFF" />
                </LinearGradient>
                <Text style={[styles.toolLabel, {color: theme.colors.text}]}>{tool.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={{height: 100}} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1},
  hero: {
    paddingTop: Platform.OS === 'ios' ? 64 : 54,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    borderBottomLeftRadius: RADIUS.xl,
    borderBottomRightRadius: RADIUS.xl,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  greetingSmall: {color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: '500'},
  heroTitle: {color: '#FFF', fontSize: 28, fontWeight: '800'},
  themeBtn: {
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: RADIUS.md,
  },
  xpSection: {marginBottom: SPACING.md},
  xpHeader: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8},
  xpLabel: {color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: '700', letterSpacing: 1},
  xpValue: {color: '#FFF', fontSize: 12, fontWeight: '700'},
  statsGrid: {flexDirection: 'row', gap: 12},
  glassChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  chipIcon: {marginRight: 6},
  chipText: {color: '#FFF', fontSize: 13, fontWeight: '600'},
  body: {paddingTop: SPACING.md},
  sectionHeader: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm
  },
  sectionTitle: {fontSize: 18, fontWeight: '800', marginHorizontal: SPACING.md, marginBottom: SPACING.sm},
  
  // View All Button
  viewAllCard: {borderRadius: RADIUS.md, overflow: 'hidden'},
  viewAllGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: '#3A3A5A',
  },
  viewAllText: {color: '#FFF', fontWeight: '600', fontSize: 12, marginRight: 6},

  // Resume Card
  nextCard: {marginHorizontal: SPACING.md, borderRadius: RADIUS.xl, elevation: 8},
  nextCardContent: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 4},
  nextTextGroup: {flex: 1, marginRight: 10},
  nextTag: {color: 'rgba(255,255,255,0.6)', fontSize: 9, fontWeight: '800', letterSpacing: 1},
  nextTitle: {color: '#FFF', fontSize: 20, fontWeight: '700', marginVertical: 4},
  levelBadge: {backgroundColor: 'rgba(0,0,0,0.2)', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4},
  levelBadgeText: {color: '#FFF', fontSize: 10, fontWeight: '600'},
  playBtn: {width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center'},

  // Path Progress Cards
  pathGrid: {flexDirection: 'row', paddingHorizontal: SPACING.md, gap: 12, marginBottom: SPACING.lg},
  pathCard: {flex: 1, padding: 12, borderRadius: RADIUS.lg, borderWidth: 1, borderColor: 'transparent'},
  dot: {width: 8, height: 8, borderRadius: 4, marginBottom: 8},
  pathName: {fontSize: 11, fontWeight: '700', marginBottom: 2},
  pathStat: {fontSize: 16, fontWeight: '800'},
  progressTrack: {width: '100%', height: 4, backgroundColor: 'rgba(0,0,0,0.08)', borderRadius: 2, marginTop: 8},
  progressFill: {height: '100%', borderRadius: 2},

  // 💻 Code Block Container Styles
  codeContainer: {
    marginHorizontal: SPACING.md,
    backgroundColor: '#1E1E24',
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: '#2D2D3A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  codeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#141419',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#252530',
  },
  codeDots: {
    flexDirection: 'row',
    gap: 6,
  },
  codeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  codeHeaderText: {
    color: '#6A6A7A',
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }),
    fontSize: 11,
    fontWeight: '600',
  },
  codeBody: {
    padding: 16,
    backgroundColor: '#1b1b22',
  },
  codeLine: {
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }),
    fontSize: 13,
    letterSpacing: -0.2,
    lineHeight: 22,
  },
  keyword: {color: '#E5C07B', fontWeight: 'bold'}, 
  function: {color: '#61AFEF'},                        
  punctuation: {color: '#ABB2BF'},                     
  variable: {color: '#E06C75'},                        
  string: {color: '#98C379', fontWeight: '500'},       
  number: {color: '#D19A66'},                          

  // Start Learning Card
  startLearningCard: {marginHorizontal: SPACING.md, marginBottom: SPACING.lg, borderRadius: RADIUS.xl, elevation: 6},
  startLearningGradient: {padding: SPACING.lg, borderRadius: RADIUS.xl},
  startContent: {flexDirection: 'row', alignItems: 'center', marginBottom: 16},
  startTextGroup: {marginLeft: 14, flex: 1},
  startTitle: {color: '#FFF', fontSize: 20, fontWeight: '800'},
  startSub: {color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 4},
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 12,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  startBtnText: {color: '#FFF', fontSize: 14, fontWeight: '700', marginRight: 8},

  // Quick Tools
  toolRow: {flexDirection: 'row', justifyContent: 'space-around', marginTop: SPACING.sm, marginBottom: SPACING.lg},
  toolItem: {alignItems: 'center'},
  toolIconBox: {width: 60, height: 60, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 8, elevation: 4},
  toolLabel: {fontSize: 12, fontWeight: '600'},
});
// // src/screens/HomeScreen.tsx
// import React, {useState, useCallback, useMemo} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   StatusBar,
//   RefreshControl,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {useFocusEffect, useNavigation} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {useTheme} from '../theme/ThemeContext';
// import {COLORS, GRADIENTS, RADIUS, SPACING} from '../theme';
// import {getProgress, updateStreak, Progress} from '../storage/progress';
// import {XPBar} from '../components/XPBar';
// import {GradientCard} from '../components/GradientCard';
// import {lessonsData} from '../data/lessonsData';
// import {RootStackParamList} from '../navigation/AppNavigator';

// type NavProp = NativeStackNavigationProp<RootStackParamList>;

// const GREETINGS = ['Welcome back', 'Keep coding', 'Happy learning', 'Level up!'];

// export default function HomeScreen() {
//   const {theme, isDark, toggleTheme} = useTheme();
//   const navigation = useNavigation<NavProp>();
//   const [progress, setProgress] = useState<Progress | null>(null);
//   const [greeting, setGreeting] = useState(GREETINGS[0]);
//   const [refreshing, setRefreshing] = useState(false);

//   const loadData = async () => {
//     await updateStreak();
//     const p = await getProgress();
//     setProgress(p);
//     setGreeting(GREETINGS[Math.floor(Math.random() * GREETINGS.length)]);
//   };

//   useFocusEffect(
//     useCallback(() => {
//       loadData();
//     }, []),
//   );

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await loadData();
//     setRefreshing(false);
//   };

//   // Memoized stats
//   const stats = useMemo(() => {
//     const completed = progress?.completedLessons.length ?? 0;
//     const total = lessonsData.length;
//     const next = lessonsData.find(l => !progress?.completedLessons.includes(l.id)) ?? lessonsData[0];
    
//     const levels = ['Beginner', 'Intermediate', 'Advanced'].map(lvl => {
//       const levelLessons = lessonsData.filter(l => l.level === lvl);
//       const done = levelLessons.filter(l => progress?.completedLessons.includes(l.id)).length;
//       return {
//         name: lvl,
//         total: levelLessons.length,
//         done,
//         pct: levelLessons.length > 0 ? (done / levelLessons.length) * 100 : 0,
//       };
//     });

//     return {completed, total, next, levels, pct: Math.round((completed / total) * 100)};
//   }, [progress]);

//   // Safe navigation handler
//   const handleQuickToolPress = (label: string) => {
//     if (!lessonsData || lessonsData.length === 0) return;
//     const defaultLesson = lessonsData[0];
//     if (label === 'Saved') navigation.navigate('Bookmarks');
//     else if (label === 'Quizzes') navigation.navigate('Quiz', {lessonId: defaultLesson.id});
//     else if (label === 'Code') navigation.navigate('Exercise', {lessonId: defaultLesson.id});
//   };

//   return (
//     <View style={[styles.screen, {backgroundColor: theme.colors.bg}]}>
//       <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFF" />
//         }>
        
//         {/* --- MODERN HERO HEADER --- */}
//         <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.hero}>
//           <View style={styles.heroHeader}>
//             <View>
//               <Text style={styles.greetingSmall}>{greeting},</Text>
//               <Text style={styles.heroTitle}>Dartly Student</Text>
//             </View>
//             <TouchableOpacity onPress={toggleTheme} style={styles.themeBtn}>
//               <Ionicons name={isDark ? 'sunny-outline' : 'moon-outline'} size={18} color="#FFF" />
//             </TouchableOpacity>
//           </View>

//           {progress && (
//             <View style={styles.xpSection}>
//               <View style={styles.xpHeader}>
//                 <Text style={styles.xpLabel}>CURRENT LEVEL</Text>
//                 <Text style={styles.xpValue}>{progress.xp} XP</Text>
//               </View>
//               <XPBar xp={progress.xp} />
//             </View>
//           )}

//           <View style={styles.statsGrid}>
//             <View style={styles.glassChip}>
//               <Ionicons name="flame-outline" size={16} color="#FFF" style={styles.chipIcon} />
//               <Text style={styles.chipText}>{progress?.streak ?? 0} Days</Text>
//             </View>
//             <View style={styles.glassChip}>
//               <Ionicons name="target-outline" size={16} color="#FFF" style={styles.chipIcon} />
//               <Text style={styles.chipText}>{stats.pct}% Progress</Text>
//             </View>
//           </View>
//         </LinearGradient>

//         <View style={styles.body}>
//           {/* --- CONTINUE LEARNING --- */}
//           <View style={styles.sectionHeader}>
//             <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Resume Course</Text>
//             <TouchableOpacity 
//               onPress={() => navigation.navigate('Lessons')}
//               activeOpacity={0.85}
//               style={styles.viewAllCard}
//             >
//               <LinearGradient
//                 colors={['#1E1E2E', '#2A2A4A']}
//                 start={{x: 0, y: 0}}
//                 end={{x: 1, y: 0}}
//                 style={styles.viewAllGradient}
//               >
//                 <Text style={styles.viewAllText}>View All Lessons</Text>
//                 <Ionicons name="arrow-forward" size={16} color={COLORS.primary} />
//               </LinearGradient>
//             </TouchableOpacity>
//           </View>

//           <GradientCard
//             colors={GRADIENTS.primary}
//             onPress={() => navigation.navigate('LessonDetail', {lessonId: stats.next.id})}
//             style={styles.nextCard}>
//             <View style={styles.nextCardContent}>
//               <View style={styles.nextTextGroup}>
//                 <Text style={styles.nextTag}>ACTIVE LESSON</Text>
//                 <Text style={styles.nextTitle} numberOfLines={1}>{stats.next.title}</Text>
//                 <View style={styles.levelBadge}>
//                    <Text style={styles.levelBadgeText}>{stats.next.level}</Text>
//                 </View>
//               </View>
//               <View style={styles.playBtn}>
//                 <Ionicons name="play" size={20} color="#000" />
//               </View>
//             </View>
//           </GradientCard>

//           {/* --- PATH PROGRESS --- */}
//           <Text style={[styles.sectionTitle, {color: theme.colors.text, marginTop: SPACING.lg}]}>
//             Your Mastery
//           </Text>
//           <View style={styles.pathGrid}>
//             {stats.levels.map((item, idx) => (
//               <LinearGradient
//                 key={item.name}
//                 colors={[
//                   isDark ? '#1E1E2E' : '#F8F9FA',
//                   isDark ? '#2A2A3E' : '#E9ECEF'
//                 ]}
//                 start={{x: 0, y: 0}}
//                 end={{x: 1, y: 1}}
//                 style={styles.pathCard}>
//                 <View style={[styles.dot, {backgroundColor: [COLORS.beginner, COLORS.intermediate, COLORS.advanced][idx]}]} />
//                 <Text style={[styles.pathName, {color: theme.colors.textSecondary}]}>{item.name}</Text>
//                 <Text style={[styles.pathStat, {color: theme.colors.text}]}>{item.done}/{item.total}</Text>
//                 <View style={styles.progressTrack}>
//                   <View style={[styles.progressFill, {width: `${item.pct}%`, backgroundColor: [COLORS.beginner, COLORS.intermediate, COLORS.advanced][idx]}]} />
//                 </View>
//               </LinearGradient>
//             ))}
//           </View>

//           {/* --- MOTIVATIONAL DART CODE BLOCK --- */}
//           <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Code Snippet of the Day</Text>
//           <View style={styles.codeContainer}>
//             <View style={styles.codeHeader}>
//               <View style={styles.codeDots}>
//                 <View style={[styles.codeDot, {backgroundColor: '#FF5F56'}]} />
//                 <View style={[styles.codeDot, {backgroundColor: '#FFBD2E'}]} />
//                 <View style={[styles.codeDot, {backgroundColor: '#27C93F'}]} />
//               </View>
//               <Text style={styles.codeHeaderText}>motivation.dart</Text>
//             </View>
//             <View style={styles.codeBody}>
//               <Text style={styles.codeLine}>
//                 <Text style={styles.keyword}>void </Text>
//                 <Text style={styles.function}>main</Text>
//                 <Text style={styles.punctuation}>() {`{`}</Text>
//               </Text>
//               <Text style={[styles.codeLine, {paddingLeft: 16}]}>
//                 <Text style={styles.keyword}>var </Text>
//                 <Text style={styles.variable}>skills </Text>
//                 <Text style={styles.punctuation}>= </Text>
//                 <Text style={styles.string}>"Loading..."</Text>
//                 <Text style={styles.punctuation}>;</Text>
//               </Text>
//               <Text style={[styles.codeLine, {paddingLeft: 16}]}>
//                 <Text style={styles.keyword}>for </Text>
//                 <Text style={styles.punctuation}>( </Text>
//                 <Text style={styles.keyword}>int </Text>
//                 <Text style={styles.variable}>day </Text>
//                 <Text style={styles.punctuation}>= </Text>
//                 <Text style={styles.number}>1</Text>
//                 <Text style={styles.punctuation}>; </Text>
//                 <Text style={styles.variable}>day </Text>
//                 <Text style={styles.punctuation}>&lt;= </Text>
//                 <Text style={styles.number}>365</Text>
//                 <Text style={styles.punctuation}>; </Text>
//                 <Text style={styles.variable}>day</Text>
//                 <Text style={styles.punctuation}>++ ) {`{`}</Text>
//               </Text>
//               <Text style={[styles.codeLine, {paddingLeft: 32}]}>
//                 <Text style={styles.variable}>skills </Text>
//                 <Text style={styles.punctuation}>+= </Text>
//                 <Text style={styles.string}>" 🚀 Progress!"</Text>
//                 <Text style={styles.punctuation}>;</Text>
//               </Text>
//               <Text style={[styles.codeLine, {paddingLeft: 16}]}>{`}`}</Text>
//               <Text style={[styles.codeLine, {paddingLeft: 16}]}>
//                 <Text style={styles.function}>print</Text>
//                 <Text style={styles.punctuation}>(</Text>
//                 <Text style={styles.string}>"You are unstoppable!"</Text>
//                 <Text style={styles.punctuation}>);</Text>
//               </Text>
//               <Text style={styles.codeLine}>{`}`}</Text>
//             </View>
//           </View>

//           {/* --- START LEARNING CARD --- */}
//           <TouchableOpacity 
//             activeOpacity={0.85} 
//             onPress={() => navigation.navigate('Lessons')}
//             style={styles.startLearningCard}
//           >
//             <LinearGradient
//               colors={['#4776E6', '#8E54E9']}
//               start={{x: 0, y: 0}}
//               end={{x: 1, y: 1}}
//               style={styles.startLearningGradient}
//             >
//               <View style={styles.startContent}>
//                 <Ionicons name="rocket" size={36} color="#FFF" />
//                 <View style={styles.startTextGroup}>
//                   <Text style={styles.startTitle}>Start Learning</Text>
//                   <Text style={styles.startSub}>Dive into your first lesson and earn XP</Text>
//                 </View>
//               </View>
//               <View style={styles.startBtn}>
//                 <Text style={styles.startBtnText}>Begin Now</Text>
//                 <Ionicons name="arrow-forward" size={20} color="#FFF" />
//               </View>
//             </LinearGradient>
//           </TouchableOpacity>

//           {/* --- QUICK ACCESS --- */}
//           <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Quick Tools</Text>
//           <View style={styles.toolRow}>
//             {[
//               {label: 'Quizzes', icon: 'brain-outline', colors: ['#FF512F', '#DD2476']},
//               {label: 'Code', icon: 'code-slash-outline', colors: ['#4776E6', '#8E54E9']},
//               {label: 'Saved', icon: 'bookmark-outline', colors: ['#00B4DB', '#0083B0']},
//             ].map(tool => (
//               <TouchableOpacity 
//                 key={tool.label} 
//                 activeOpacity={0.8} 
//                 style={styles.toolItem}
//                 onPress={() => handleQuickToolPress(tool.label)}
//               >
//                 <LinearGradient colors={tool.colors} style={styles.toolIconBox}>
//                   <Ionicons name={tool.icon as any} size={26} color="#FFF" />
//                 </LinearGradient>
//                 <Text style={[styles.toolLabel, {color: theme.colors.text}]}>{tool.label}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
          
//           <View style={{height: 100}} />
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   screen: {flex: 1},
//   hero: {
//     paddingTop: 60,
//     paddingHorizontal: SPACING.lg,
//     paddingBottom: SPACING.xl,
//     borderBottomLeftRadius: RADIUS.xl,
//     borderBottomRightRadius: RADIUS.xl,
//   },
//   heroHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: SPACING.lg,
//   },
//   greetingSmall: {color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: '500'},
//   heroTitle: {color: '#FFF', fontSize: 28, fontWeight: '800'},
//   themeBtn: {
//     padding: 10,
//     backgroundColor: 'rgba(255,255,255,0.15)',
//     borderRadius: RADIUS.md,
//   },
//   xpSection: {marginBottom: SPACING.lg},
//   xpHeader: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8},
//   xpLabel: {color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: '700', letterSpacing: 1},
//   xpValue: {color: '#FFF', fontSize: 12, fontWeight: '700'},
//   statsGrid: {flexDirection: 'row', gap: 12},
//   glassChip: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     borderRadius: RADIUS.lg,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.1)',
//   },
//   chipIcon: {marginRight: 6},
//   chipText: {color: '#FFF', fontSize: 13, fontWeight: '600'},
//   body: {paddingTop: SPACING.md},
//   sectionHeader: {
//     flexDirection: 'row', 
//     justifyContent: 'space-between', 
//     alignItems: 'center', 
//     marginHorizontal: SPACING.md,
//     marginBottom: SPACING.sm
//   },
//   sectionTitle: {fontSize: 18, fontWeight: '800', marginHorizontal: SPACING.md, marginBottom: SPACING.sm},
  
//   // View All Button
//   viewAllCard: {borderRadius: RADIUS.md, overflow: 'hidden'},
//   viewAllGradient: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     borderRadius: RADIUS.md,
//     borderWidth: 1,
//     borderColor: '#3A3A5A',
//   },
//   viewAllText: {color: '#FFF', fontWeight: '600', fontSize: 12, marginRight: 6},

//   // Resume Card
//   nextCard: {marginHorizontal: SPACING.md, borderRadius: RADIUS.xl, elevation: 8},
//   nextCardContent: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 4},
//   nextTextGroup: {flex: 1, marginRight: 10},
//   nextTag: {color: 'rgba(255,255,255,0.6)', fontSize: 9, fontWeight: '800', letterSpacing: 1},
//   nextTitle: {color: '#FFF', fontSize: 20, fontWeight: '700', marginVertical: 4},
//   levelBadge: {backgroundColor: 'rgba(0,0,0,0.2)', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4},
//   levelBadgeText: {color: '#FFF', fontSize: 10, fontWeight: '600'},
//   playBtn: {width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center'},

//   // Path Progress Cards
//   pathGrid: {flexDirection: 'row', paddingHorizontal: SPACING.md, gap: 12, marginBottom: SPACING.lg},
//   pathCard: {flex: 1, padding: 12, borderRadius: RADIUS.lg, borderWidth: 1, borderColor: 'transparent'},
//   dot: {width: 8, height: 8, borderRadius: 4, marginBottom: 8},
//   pathName: {fontSize: 11, fontWeight: '700', marginBottom: 2},
//   pathStat: {fontSize: 16, fontWeight: '800'},
//   progressTrack: {width: '100%', height: 4, backgroundColor: 'rgba(0,0,0,0.08)', borderRadius: 2, marginTop: 8},
//   progressFill: {height: '100%', borderRadius: 2},

//   // Code Block Styling
//   codeContainer: {
//     marginHorizontal: SPACING.md,
//     backgroundColor: '#1E1E24',
//     borderRadius: RADIUS.xl,
//     overflow: 'hidden',
//     marginBottom: SPACING.lg,
//     borderWidth: 1,
//     borderColor: '#2D2D3A',
//     elevation: 4,
//   },
//   codeHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#141419',
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#2D2D3A',
//   },
//   codeDots: {
//     flexDirection: 'row',
//     gap: 6,
//   },
//   codeDot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//   },
//   codeHeaderText: {
//     color: '#8F8FA3',
//     fontFamily: 'Courier',
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   codeBody: {
//     padding: 16,
//   },
//   codeLine: {
//     fontFamily: 'Courier',
//     fontSize: 13,
//     lineHeight: 20,
//   },
//   keyword: {color: '#E06C75', fontWeight: 'bold'}, // Soft Red
//   function: {color: '#61AFEF'}, // Soft Blue
//   punctuation: {color: '#ABB2BF'}, // Light Gray
//   variable: {color: '#98C379'}, // Soft Green
//   string: {color: '#D19A66'}, // Soft Orange
//   number: {color: '#D19A66'},

//   // Start Learning Card
//   startLearningCard: {marginHorizontal: SPACING.md, marginBottom: SPACING.lg, borderRadius: RADIUS.xl, elevation: 6},
//   startLearningGradient: {padding: SPACING.lg, borderRadius: RADIUS.xl},
//   startContent: {flexDirection: 'row', alignItems: 'center', marginBottom: 16},
//   startTextGroup: {marginLeft: 14, flex: 1},
//   startTitle: {color: '#FFF', fontSize: 20, fontWeight: '800'},
//   startSub: {color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 4},
//   startBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     paddingVertical: 12,
//     borderRadius: RADIUS.lg,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.3)',
//   },
//   startBtnText: {color: '#FFF', fontSize: 14, fontWeight: '700', marginRight: 8},

//   // Quick Tools
//   toolRow: {flexDirection: 'row', justifyContent: 'space-around', marginTop: SPACING.sm, marginBottom: SPACING.lg},
//   toolItem: {alignItems: 'center'},
//   toolIconBox: {width: 60, height: 60, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 8, elevation: 4},
//   toolLabel: {fontSize: 12, fontWeight: '600'},
// });
// // src/screens/HomeScreen.tsx
// import React, {useState, useCallback, useMemo} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   StatusBar,
//   RefreshControl,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {useFocusEffect, useNavigation} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {useTheme} from '../theme/ThemeContext';
// import {COLORS, GRADIENTS, RADIUS, SPACING} from '../theme';
// import {getProgress, updateStreak, Progress} from '../storage/progress';
// import {XPBar} from '../components/XPBar';
// import {GradientCard} from '../components/GradientCard';
// import {lessonsData} from '../data/lessonsData';
// import {RootStackParamList} from '../navigation/AppNavigator';

// type NavProp = NativeStackNavigationProp<RootStackParamList>;

// const GREETINGS = ['Welcome back', 'Keep coding', 'Happy learning', 'Level up!'];

// export default function HomeScreen() {
//   const {theme, isDark, toggleTheme} = useTheme();
//   const navigation = useNavigation<NavProp>();
//   const [progress, setProgress] = useState<Progress | null>(null);
//   const [greeting, setGreeting] = useState(GREETINGS[0]);
//   const [refreshing, setRefreshing] = useState(false);

//   const loadData = async () => {
//     await updateStreak();
//     const p = await getProgress();
//     setProgress(p);
//     setGreeting(GREETINGS[Math.floor(Math.random() * GREETINGS.length)]);
//   };

//   useFocusEffect(
//     useCallback(() => {
//       loadData();
//     }, []),
//   );

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await loadData();
//     setRefreshing(false);
//   };

//   // Memoized stats
//   const stats = useMemo(() => {
//     const completed = progress?.completedLessons.length ?? 0;
//     const total = lessonsData.length;
//     const next = lessonsData.find(l => !progress?.completedLessons.includes(l.id)) ?? lessonsData[0];
    
//     const levels = ['Beginner', 'Intermediate', 'Advanced'].map(lvl => {
//       const levelLessons = lessonsData.filter(l => l.level === lvl);
//       const done = levelLessons.filter(l => progress?.completedLessons.includes(l.id)).length;
//       return {
//         name: lvl,
//         total: levelLessons.length,
//         done,
//         pct: levelLessons.length > 0 ? (done / levelLessons.length) * 100 : 0,
//       };
//     });

//     return {completed, total, next, levels, pct: Math.round((completed / total) * 100)};
//   }, [progress]);

//   // Safe navigation handler
//   const handleQuickToolPress = (label: string) => {
//     if (!lessonsData || lessonsData.length === 0) return;
//     const defaultLesson = lessonsData[0];
//     if (label === 'Saved') navigation.navigate('Bookmarks');
//     else if (label === 'Quizzes') navigation.navigate('Quiz', {lessonId: defaultLesson.id});
//     else if (label === 'Code') navigation.navigate('Exercise', {lessonId: defaultLesson.id});
//   };

//   return (
//     <View style={[styles.screen, {backgroundColor: theme.colors.bg}]}>
//       <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFF" />
//         }>
        
//         {/* --- MODERN HERO HEADER --- */}
//         <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.hero}>
//           <View style={styles.heroHeader}>
//             <View>
//               <Text style={styles.greetingSmall}>{greeting},</Text>
//               <Text style={styles.heroTitle}>Dartly Student</Text>
//             </View>
//             <TouchableOpacity onPress={toggleTheme} style={styles.themeBtn}>
//               <Ionicons name={isDark ? 'sunny-outline' : 'moon-outline'} size={18} color="#FFF" />
//             </TouchableOpacity>
//           </View>

//           {progress && (
//             <View style={styles.xpSection}>
//               <View style={styles.xpHeader}>
//                 <Text style={styles.xpLabel}>CURRENT LEVEL</Text>
//                 <Text style={styles.xpValue}>{progress.xp} XP</Text>
//               </View>
//               <XPBar xp={progress.xp} />
//             </View>
//           )}

//           <View style={styles.statsGrid}>
//             <View style={styles.glassChip}>
//               <Ionicons name="flame-outline" size={16} color="#FFF" style={styles.chipIcon} />
//               <Text style={styles.chipText}>{progress?.streak ?? 0} Days</Text>
//             </View>
//             <View style={styles.glassChip}>
//               <Ionicons name="target-outline" size={16} color="#FFF" style={styles.chipIcon} />
//               <Text style={styles.chipText}>{stats.pct}% Progress</Text>
//             </View>
//           </View>
//         </LinearGradient>

//         <View style={styles.body}>
//           {/* --- CONTINUE LEARNING --- */}
//           <View style={styles.sectionHeader}>
//             <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Resume Course</Text>
//             <TouchableOpacity 
//               onPress={() => navigation.navigate('Lessons')}
//               activeOpacity={0.85}
//               style={styles.viewAllCard}
//             >
//               <LinearGradient
//                 colors={['#1E1E2E', '#2A2A4A']}
//                 start={{x: 0, y: 0}}
//                 end={{x: 1, y: 0}}
//                 style={styles.viewAllGradient}
//               >
//                 <Text style={styles.viewAllText}>View All Lessons</Text>
//                 <Ionicons name="arrow-forward" size={16} color={COLORS.primary} />
//               </LinearGradient>
//             </TouchableOpacity>
//           </View>

//           <GradientCard
//             colors={GRADIENTS.primary}
//             onPress={() => navigation.navigate('LessonDetail', {lessonId: stats.next.id})}
//             style={styles.nextCard}>
//             <View style={styles.nextCardContent}>
//               <View style={styles.nextTextGroup}>
//                 <Text style={styles.nextTag}>ACTIVE LESSON</Text>
//                 <Text style={styles.nextTitle} numberOfLines={1}>{stats.next.title}</Text>
//                 <View style={styles.levelBadge}>
//                    <Text style={styles.levelBadgeText}>{stats.next.level}</Text>
//                 </View>
//               </View>
//               <View style={styles.playBtn}>
//                 <Ionicons name="play" size={20} color="#000" />
//               </View>
//             </View>
//           </GradientCard>

//           {/* --- PATH PROGRESS --- ✅ NOW USES LINEARGRADIENT */}
//           <Text style={[styles.sectionTitle, {color: theme.colors.text, marginTop: SPACING.lg}]}>
//             Your Mastery
//           </Text>
//           <View style={styles.pathGrid}>
//             {stats.levels.map((item, idx) => (
//               <LinearGradient
//                 key={item.name}
//                 colors={[
//                   isDark ? '#1E1E2E' : '#F8F9FA',
//                   isDark ? '#2A2A3E' : '#E9ECEF'
//                 ]}
//                 start={{x: 0, y: 0}}
//                 end={{x: 1, y: 1}}
//                 style={styles.pathCard}>
//                 <View style={[styles.dot, {backgroundColor: [COLORS.beginner, COLORS.intermediate, COLORS.advanced][idx]}]} />
//                 <Text style={[styles.pathName, {color: theme.colors.textSecondary}]}>{item.name}</Text>
//                 <Text style={[styles.pathStat, {color: theme.colors.text}]}>{item.done}/{item.total}</Text>
//                 <View style={styles.progressTrack}>
//                   <View style={[styles.progressFill, {width: `${item.pct}%`, backgroundColor: [COLORS.beginner, COLORS.intermediate, COLORS.advanced][idx]}]} />
//                 </View>
//               </LinearGradient>
//             ))}
//           </View>

//           {/* ✅ NEW: START LEARNING CARD (Above Quick Tools) */}
//           <TouchableOpacity 
//             activeOpacity={0.85} 
//             onPress={() => navigation.navigate('Lessons')}
//             style={styles.startLearningCard}
//           >
//             <LinearGradient
//               colors={['#4776E6', '#8E54E9']}
//               start={{x: 0, y: 0}}
//               end={{x: 1, y: 1}}
//               style={styles.startLearningGradient}
//             >
//               <View style={styles.startContent}>
//                 <Ionicons name="rocket" size={36} color="#FFF" />
//                 <View style={styles.startTextGroup}>
//                   <Text style={styles.startTitle}>Start Learning</Text>
//                   <Text style={styles.startSub}>Dive into your first lesson and earn XP</Text>
//                 </View>
//               </View>
//               <View style={styles.startBtn}>
//                 <Text style={styles.startBtnText}>Begin Now</Text>
//                 <Ionicons name="arrow-forward" size={20} color="#FFF" />
//               </View>
//             </LinearGradient>
//           </TouchableOpacity>

//           {/* --- QUICK ACCESS --- */}
//           <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Quick Tools</Text>
//           <View style={styles.toolRow}>
//             {[
//               {label: 'Quizzes', icon: 'brain-outline', colors: ['#FF512F', '#DD2476']},
//               {label: 'Code', icon: 'code-slash-outline', colors: ['#4776E6', '#8E54E9']},
//               {label: 'Saved', icon: 'bookmark-outline', colors: ['#00B4DB', '#0083B0']},
//             ].map(tool => (
//               <TouchableOpacity 
//                 key={tool.label} 
//                 activeOpacity={0.8} 
//                 style={styles.toolItem}
//                 onPress={() => handleQuickToolPress(tool.label)}
//               >
//                 <LinearGradient colors={tool.colors} style={styles.toolIconBox}>
//                   <Ionicons name={tool.icon as any} size={26} color="#FFF" />
//                 </LinearGradient>
//                 <Text style={[styles.toolLabel, {color: theme.colors.text}]}>{tool.label}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
          
//           <View style={{height: 100}} />
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   screen: {flex: 1},
//   hero: {
//     paddingTop: 60,
//     paddingHorizontal: SPACING.lg,
//     paddingBottom: SPACING.xl,
//     borderBottomLeftRadius: RADIUS.xl,
//     borderBottomRightRadius: RADIUS.xl,
//   },
//   heroHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: SPACING.lg,
//   },
//   greetingSmall: {color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: '500'},
//   heroTitle: {color: '#FFF', fontSize: 28, fontWeight: '800'},
//   themeBtn: {
//     padding: 10,
//     backgroundColor: 'rgba(255,255,255,0.15)',
//     borderRadius: RADIUS.md,
//   },
//   xpSection: {marginBottom: SPACING.lg},
//   xpHeader: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8},
//   xpLabel: {color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: '700', letterSpacing: 1},
//   xpValue: {color: '#FFF', fontSize: 12, fontWeight: '700'},
//   statsGrid: {flexDirection: 'row', gap: 12},
//   glassChip: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     borderRadius: RADIUS.lg,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.1)',
//   },
//   chipIcon: {marginRight: 6},
//   chipText: {color: '#FFF', fontSize: 13, fontWeight: '600'},
//   body: {paddingTop: SPACING.md},
//   sectionHeader: {
//     flexDirection: 'row', 
//     justifyContent: 'space-between', 
//     alignItems: 'center', 
//     marginHorizontal: SPACING.md,
//     marginBottom: SPACING.sm
//   },
//   sectionTitle: {fontSize: 18, fontWeight: '800', marginHorizontal: SPACING.md, marginBottom: SPACING.sm},
  
//   // View All Button
//   viewAllCard: {borderRadius: RADIUS.md, overflow: 'hidden'},
//   viewAllGradient: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     borderRadius: RADIUS.md,
//     borderWidth: 1,
//     borderColor: '#3A3A5A',
//   },
//   viewAllText: {color: '#FFF', fontWeight: '600', fontSize: 12, marginRight: 6},

//   // Resume Card
//   nextCard: {marginHorizontal: SPACING.md, borderRadius: RADIUS.xl, elevation: 8},
//   nextCardContent: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 4},
//   nextTextGroup: {flex: 1, marginRight: 10},
//   nextTag: {color: 'rgba(255,255,255,0.6)', fontSize: 9, fontWeight: '800', letterSpacing: 1},
//   nextTitle: {color: '#FFF', fontSize: 20, fontWeight: '700', marginVertical: 4},
//   levelBadge: {backgroundColor: 'rgba(0,0,0,0.2)', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4},
//   levelBadgeText: {color: '#FFF', fontSize: 10, fontWeight: '600'},
//   playBtn: {width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center'},

//   // Path Progress Cards (Now Gradient)
//   pathGrid: {flexDirection: 'row', paddingHorizontal: SPACING.md, gap: 12, marginBottom: SPACING.lg},
//   pathCard: {flex: 1, padding: 12, borderRadius: RADIUS.lg, borderWidth: 1, borderColor: 'transparent'},
//   dot: {width: 8, height: 8, borderRadius: 4, marginBottom: 8},
//   pathName: {fontSize: 11, fontWeight: '700', marginBottom: 2},
//   pathStat: {fontSize: 16, fontWeight: '800'},
//   progressTrack: {width: '100%', height: 4, backgroundColor: 'rgba(0,0,0,0.08)', borderRadius: 2, marginTop: 8},
//   progressFill: {height: '100%', borderRadius: 2},

//   // ✅ Start Learning Card
//   startLearningCard: {marginHorizontal: SPACING.md, marginBottom: SPACING.lg, borderRadius: RADIUS.xl, elevation: 6},
//   startLearningGradient: {padding: SPACING.lg, borderRadius: RADIUS.xl},
//   startContent: {flexDirection: 'row', alignItems: 'center', marginBottom: 16},
//   startTextGroup: {marginLeft: 14, flex: 1},
//   startTitle: {color: '#FFF', fontSize: 20, fontWeight: '800'},
//   startSub: {color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 4},
//   startBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     paddingVertical: 12,
//     borderRadius: RADIUS.lg,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.3)',
//   },
//   startBtnText: {color: '#FFF', fontSize: 14, fontWeight: '700', marginRight: 8},

//   // Quick Tools
//   toolRow: {flexDirection: 'row', justifyContent: 'space-around', marginTop: SPACING.sm, marginBottom: SPACING.lg},
//   toolItem: {alignItems: 'center'},
//   toolIconBox: {width: 60, height: 60, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 8, elevation: 4},
//   toolLabel: {fontSize: 12, fontWeight: '600'},
// });
// // src/screens/HomeScreen.tsx
// import React, {useEffect, useState, useCallback, useMemo} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   StatusBar,
//   RefreshControl,
//   Dimensions,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient'; // ✅ v2.8.3
// import Ionicons from 'react-native-vector-icons/Ionicons'; // ✅ v10.3.0
// import {useFocusEffect, useNavigation} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {useTheme} from '../theme/ThemeContext';
// import {COLORS, GRADIENTS, RADIUS, SPACING} from '../theme';
// import {getProgress, updateStreak, Progress} from '../storage/progress';
// import {XPBar} from '../components/XPBar';
// import {GradientCard} from '../components/GradientCard';
// import {lessonsData} from '../data/lessonsData';
// import {RootStackParamList} from '../navigation/AppNavigator';

// const {width} = Dimensions.get('window');
// type NavProp = NativeStackNavigationProp<RootStackParamList>;

// const GREETINGS = ['Welcome back', 'Keep coding', 'Happy learning', 'Level up!'];

// export default function HomeScreen() {
//   const {theme, isDark, toggleTheme} = useTheme();
//   const navigation = useNavigation<NavProp>();
//   const [progress, setProgress] = useState<Progress | null>(null);
//   const [greeting, setGreeting] = useState(GREETINGS[0]);
//   const [refreshing, setRefreshing] = useState(false);

//   const loadData = async () => {
//     await updateStreak();
//     const p = await getProgress();
//     setProgress(p);
//     setGreeting(GREETINGS[Math.floor(Math.random() * GREETINGS.length)]);
//   };

//   useFocusEffect(
//     useCallback(() => {
//       loadData();
//     }, []),
//   );

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await loadData();
//     setRefreshing(false);
//   };

//   // Memoized stats to avoid re-calculating on every scroll
//   const stats = useMemo(() => {
//     const completed = progress?.completedLessons.length ?? 0;
//     const total = lessonsData.length;
//     const next = lessonsData.find(l => !progress?.completedLessons.includes(l.id)) ?? lessonsData[0];
    
//     const levels = ['Beginner', 'Intermediate', 'Advanced'].map(lvl => {
//       const levelLessons = lessonsData.filter(l => l.level === lvl);
//       const done = levelLessons.filter(l => progress?.completedLessons.includes(l.id)).length;
//       return {
//         name: lvl,
//         total: levelLessons.length,
//         done,
//         pct: levelLessons.length > 0 ? (done / levelLessons.length) * 100 : 0,
//       };
//     });

//     return {completed, total, next, levels, pct: Math.round((completed / total) * 100)};
//   }, [progress]);

//   // ✅ Helper for Quick Tools navigation
//   const handleQuickToolPress = (label: string) => {
//     if (label === 'Saved') {
//       navigation.navigate('Bookmarks');
//     } else if (label === 'Quizzes' || label === 'Code') {
//       const defaultLesson = lessonsData[0];
//       if (defaultLesson) {
//         if (label === 'Quizzes') {
//           navigation.navigate('Quiz', {lessonId: defaultLesson.id});
//         } else {
//           navigation.navigate('Exercise', {lessonId: defaultLesson.id});
//         }
//       } else {
//         navigation.navigate('Lessons');
//       }
//     }
//   };

//   return (
//     <View style={[styles.screen, {backgroundColor: theme.colors.bg}]}>
//       <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFF" />
//         }>
        
//         {/* --- MODERN HERO HEADER --- */}
//         <LinearGradient
//           colors={['#1a1a2e', '#16213e', '#0f3460']}
//           style={styles.hero}>
//           <View style={styles.heroHeader}>
//             <View>
//               <Text style={styles.greetingSmall}>{greeting},</Text>
//               <Text style={styles.heroTitle}>Dartly Student</Text>
//             </View>
//             <TouchableOpacity onPress={toggleTheme} style={styles.themeBtn}>
//               <Ionicons 
//                 name={isDark ? 'sunny-outline' : 'moon-outline'} 
//                 size={18} 
//                 color="#FFF" 
//               />
//             </TouchableOpacity>
//           </View>

//           {progress && (
//             <View style={styles.xpSection}>
//               <View style={styles.xpHeader}>
//                 <Text style={styles.xpLabel}>CURRENT LEVEL</Text>
//                 <Text style={styles.xpValue}>{progress.xp} XP</Text>
//               </View>
//               <XPBar xp={progress.xp} />
//             </View>
//           )}

//           <View style={styles.statsGrid}>
//             <View style={styles.glassChip}>
//               <Ionicons name="flame-outline" size={16} color="#FFF" style={styles.chipIcon} />
//               <Text style={styles.chipText}>{progress?.streak ?? 0} Days</Text>
//             </View>
//             <View style={styles.glassChip}>
//               <Ionicons name="target-outline" size={16} color="#FFF" style={styles.chipIcon} />
//               <Text style={styles.chipText}>{stats.pct}% Progress</Text>
//             </View>
//           </View>
//         </LinearGradient>

//         <View style={styles.body}>
//           {/* --- CONTINUE LEARNING --- */}
//           <View style={styles.sectionHeader}>
//             <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Resume Course</Text>
//             <TouchableOpacity onPress={() => navigation.navigate('Lessons')}>
//               <Text style={{color: COLORS.primary, fontWeight: '600'}}>See All</Text>
//             </TouchableOpacity>
//           </View>

//           <GradientCard
//             colors={GRADIENTS.primary}
//             onPress={() => navigation.navigate('LessonDetail', {lessonId: stats.next.id})}
//             style={styles.nextCard}>
//             <View style={styles.nextCardContent}>
//               <View style={styles.nextTextGroup}>
//                 <Text style={styles.nextTag}>ACTIVE LESSON</Text>
//                 <Text style={styles.nextTitle} numberOfLines={1}>{stats.next.title}</Text>
//                 <View style={styles.levelBadge}>
//                    <Text style={styles.levelBadgeText}>{stats.next.level}</Text>
//                 </View>
//               </View>
//               <View style={styles.playBtn}>
//                 <Ionicons name="play" size={20} color="#000" />
//               </View>
//             </View>
//           </GradientCard>

//           {/* --- PATH PROGRESS --- */}
//           <Text style={[styles.sectionTitle, {color: theme.colors.text, marginTop: SPACING.lg}]}>
//             Your Mastery
//           </Text>
//           <View style={styles.pathGrid}>
//             {stats.levels.map((item, idx) => (
//               <View key={item.name} style={[styles.pathCard, {backgroundColor: theme.colors.card, borderColor: theme.colors.border}]}>
//                 <View style={[styles.dot, {backgroundColor: [COLORS.beginner, COLORS.intermediate, COLORS.advanced][idx]}]} />
//                 <Text style={[styles.pathName, {color: theme.colors.textSecondary}]}>{item.name}</Text>
//                 <Text style={[styles.pathStat, {color: theme.colors.text}]}>{item.done}/{item.total}</Text>
//                 <View style={styles.progressTrack}>
//                   <View style={[styles.progressFill, {width: `${item.pct}%`, backgroundColor: [COLORS.beginner, COLORS.intermediate, COLORS.advanced][idx]}]} />
//                 </View>
//               </View>
//             ))}
//           </View>

//           {/* --- QUICK ACCESS --- ✅ VECTOR ICONS */}
//           <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Quick Tools</Text>
//           <View style={styles.toolRow}>
//             {[
//               {label: 'Quizzes', icon: 'brain-outline', colors: ['#FF512F', '#DD2476']},
//               {label: 'Code', icon: 'code-slash-outline', colors: ['#4776E6', '#8E54E9']},
//               {label: 'Saved', icon: 'bookmark-outline', colors: ['#00B4DB', '#0083B0']},
//             ].map(tool => (
//               <TouchableOpacity 
//                 key={tool.label} 
//                 activeOpacity={0.8} 
//                 style={styles.toolItem}
//                 onPress={() => handleQuickToolPress(tool.label)}
//               >
//                 <LinearGradient colors={tool.colors} style={styles.toolIconBox}>
//                   <Ionicons name={tool.icon as any} size={26} color="#FFF" />
//                 </LinearGradient>
//                 <Text style={[styles.toolLabel, {color: theme.colors.text}]}>{tool.label}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
          
//           <View style={{height: 100}} />
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   screen: {flex: 1},
//   hero: {
//     paddingTop: 60,
//     paddingHorizontal: SPACING.lg,
//     paddingBottom: SPACING.xl,
//     borderBottomLeftRadius: RADIUS.xl,
//     borderBottomRightRadius: RADIUS.xl,
//   },
//   heroHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: SPACING.lg,
//   },
//   greetingSmall: {color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: '500'},
//   heroTitle: {color: '#FFF', fontSize: 28, fontWeight: '800'},
//   themeBtn: {
//     padding: 10,
//     backgroundColor: 'rgba(255,255,255,0.15)',
//     borderRadius: RADIUS.md,
//   },
//   themeBtnText: {fontSize: 18},
//   xpSection: {marginBottom: SPACING.lg},
//   xpHeader: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8},
//   xpLabel: {color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: '700', letterSpacing: 1},
//   xpValue: {color: '#FFF', fontSize: 12, fontWeight: '700'},
//   statsGrid: {flexDirection: 'row', gap: 12},
//   glassChip: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     borderRadius: RADIUS.lg,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.1)',
//   },
//   chipIcon: {marginRight: 6},
//   chipText: {color: '#FFF', fontSize: 13, fontWeight: '600'},
//   body: {paddingTop: SPACING.md},
//   sectionHeader: {
//     flexDirection: 'row', 
//     justifyContent: 'space-between', 
//     alignItems: 'center', 
//     marginHorizontal: SPACING.md,
//     marginBottom: SPACING.sm
//   },
//   sectionTitle: {fontSize: 18, fontWeight: '800', marginHorizontal: SPACING.md, marginBottom: SPACING.sm},
//   nextCard: {marginHorizontal: SPACING.md, borderRadius: RADIUS.xl, elevation: 8},
//   nextCardContent: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 4},
//   nextTextGroup: {flex: 1, marginRight: 10},
//   nextTag: {color: 'rgba(255,255,255,0.6)', fontSize: 9, fontWeight: '800', letterSpacing: 1},
//   nextTitle: {color: '#FFF', fontSize: 20, fontWeight: '700', marginVertical: 4},
//   levelBadge: {backgroundColor: 'rgba(0,0,0,0.2)', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4},
//   levelBadgeText: {color: '#FFF', fontSize: 10, fontWeight: '600'},
//   playBtn: {width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center'},
//   pathGrid: {flexDirection: 'row', paddingHorizontal: SPACING.md, gap: 12, marginBottom: SPACING.lg},
//   pathCard: {flex: 1, padding: 12, borderRadius: RADIUS.lg, borderWidth: 1, alignItems: 'flex-start'},
//   dot: {width: 8, height: 8, borderRadius: 4, marginBottom: 8},
//   pathName: {fontSize: 11, fontWeight: '700', marginBottom: 2},
//   pathStat: {fontSize: 16, fontWeight: '800'},
//   progressTrack: {width: '100%', height: 4, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 2, marginTop: 8},
//   progressFill: {height: '100%', borderRadius: 2},
//   toolRow: {flexDirection: 'row', justifyContent: 'space-around', marginTop: SPACING.sm},
//   toolItem: {alignItems: 'center'},
//   toolIconBox: {width: 60, height: 60, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 8, elevation: 4},
//   toolLabel: {fontSize: 12, fontWeight: '600'},
// });
// // src/screens/HomeScreen.tsx
// import React, {useEffect, useState, useCallback, useMemo} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   StatusBar,
//   RefreshControl,
//   Dimensions,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import {useFocusEffect, useNavigation} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {useTheme} from '../theme/ThemeContext';
// import {COLORS, GRADIENTS, RADIUS, SPACING} from '../theme';
// import {getProgress, updateStreak, Progress} from '../storage/progress';
// import {XPBar} from '../components/XPBar';
// import {GradientCard} from '../components/GradientCard';
// import {lessonsData} from '../data/lessonsData';
// import {RootStackParamList} from '../navigation/AppNavigator';

// const {width} = Dimensions.get('window');
// type NavProp = NativeStackNavigationProp<RootStackParamList>;

// const GREETINGS = ['Welcome back', 'Keep coding', 'Happy learning', 'Level up!'];

// export default function HomeScreen() {
//   const {theme, isDark, toggleTheme} = useTheme();
//   const navigation = useNavigation<NavProp>();
//   const [progress, setProgress] = useState<Progress | null>(null);
//   const [greeting, setGreeting] = useState(GREETINGS[0]);
//   const [refreshing, setRefreshing] = useState(false);

//   const loadData = async () => {
//     await updateStreak();
//     const p = await getProgress();
//     setProgress(p);
//     setGreeting(GREETINGS[Math.floor(Math.random() * GREETINGS.length)]);
//   };

//   useFocusEffect(
//     useCallback(() => {
//       loadData();
//     }, []),
//   );

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await loadData();
//     setRefreshing(false);
//   };

//   // Memoized stats to avoid re-calculating on every scroll
//   const stats = useMemo(() => {
//     const completed = progress?.completedLessons.length ?? 0;
//     const total = lessonsData.length;
//     const next = lessonsData.find(l => !progress?.completedLessons.includes(l.id)) ?? lessonsData[0];
    
//     const levels = ['Beginner', 'Intermediate', 'Advanced'].map(lvl => {
//       const levelLessons = lessonsData.filter(l => l.level === lvl);
//       const done = levelLessons.filter(l => progress?.completedLessons.includes(l.id)).length;
//       return {
//         name: lvl,
//         total: levelLessons.length,
//         done,
//         pct: levelLessons.length > 0 ? (done / levelLessons.length) * 100 : 0,
//       };
//     });

//     return {completed, total, next, levels, pct: Math.round((completed / total) * 100)};
//   }, [progress]);

//   // ✅ Helper for Quick Tools navigation
//   const handleQuickToolPress = (label: string) => {
//     if (label === 'Saved') {
//       navigation.navigate('Bookmarks');
//     } else if (label === 'Quizzes' || label === 'Code') {
//       // Use first available lesson as default for Quiz/Exercise
//       const defaultLesson = lessonsData[0];
//       if (defaultLesson) {
//         if (label === 'Quizzes') {
//           navigation.navigate('Quiz', {lessonId: defaultLesson.id});
//         } else {
//           navigation.navigate('Exercise', {lessonId: defaultLesson.id});
//         }
//       } else {
//         // Fallback: go to Lessons tab
//         navigation.navigate('Lessons');
//       }
//     }
//   };

//   return (
//     <View style={[styles.screen, {backgroundColor: theme.colors.bg}]}>
//       <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFF" />
//         }>
        
//         {/* --- MODERN HERO HEADER --- */}
//         <LinearGradient
//           colors={['#1a1a2e', '#16213e', '#0f3460']}
//           style={styles.hero}>
//           <View style={styles.heroHeader}>
//             <View>
//               <Text style={styles.greetingSmall}>{greeting},</Text>
//               <Text style={styles.heroTitle}>Dartly Student</Text>
//             </View>
//             <TouchableOpacity onPress={toggleTheme} style={styles.themeBtn}>
//               <Text style={styles.themeBtnText}>{isDark ? '☀️' : '🌙'}</Text>
//             </TouchableOpacity>
//           </View>

//           {progress && (
//             <View style={styles.xpSection}>
//               <View style={styles.xpHeader}>
//                 <Text style={styles.xpLabel}>CURRENT LEVEL</Text>
//                 <Text style={styles.xpValue}>{progress.xp} XP</Text>
//               </View>
//               <XPBar xp={progress.xp} />
//             </View>
//           )}

//           <View style={styles.statsGrid}>
//             <View style={styles.glassChip}>
//               <Text style={styles.chipIcon}>🔥</Text>
//               <Text style={styles.chipText}>{progress?.streak ?? 0} Days</Text>
//             </View>
//             <View style={styles.glassChip}>
//               <Text style={styles.chipIcon}>🎯</Text>
//               <Text style={styles.chipText}>{stats.pct}% Progress</Text>
//             </View>
//           </View>
//         </LinearGradient>

//         <View style={styles.body}>
//           {/* --- CONTINUE LEARNING --- */}
//           <View style={styles.sectionHeader}>
//             <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Resume Course</Text>
//             <TouchableOpacity onPress={() => navigation.navigate('Lessons')}>
//               <Text style={{color: COLORS.primary, fontWeight: '600'}}>See All</Text>
//             </TouchableOpacity>
//           </View>

//           <GradientCard
//             colors={GRADIENTS.primary}
//             onPress={() => navigation.navigate('LessonDetail', {lessonId: stats.next.id})}
//             style={styles.nextCard}>
//             <View style={styles.nextCardContent}>
//               <View style={styles.nextTextGroup}>
//                 <Text style={styles.nextTag}>ACTIVE LESSON</Text>
//                 <Text style={styles.nextTitle} numberOfLines={1}>{stats.next.title}</Text>
//                 <View style={styles.levelBadge}>
//                    <Text style={styles.levelBadgeText}>{stats.next.level}</Text>
//                 </View>
//               </View>
//               <View style={styles.playBtn}>
//                 <Text style={styles.playIcon}>▶</Text>
//               </View>
//             </View>
//           </GradientCard>

//           {/* --- PATH PROGRESS --- */}
//           <Text style={[styles.sectionTitle, {color: theme.colors.text, marginTop: SPACING.lg}]}>
//             Your Mastery
//           </Text>
//           <View style={styles.pathGrid}>
//             {stats.levels.map((item, idx) => (
//               <View key={item.name} style={[styles.pathCard, {backgroundColor: theme.colors.card, borderColor: theme.colors.border}]}>
//                 <View style={[styles.dot, {backgroundColor: [COLORS.beginner, COLORS.intermediate, COLORS.advanced][idx]}]} />
//                 <Text style={[styles.pathName, {color: theme.colors.textSecondary}]}>{item.name}</Text>
//                 <Text style={[styles.pathStat, {color: theme.colors.text}]}>{item.done}/{item.total}</Text>
//                 <View style={styles.progressTrack}>
//                   <View style={[styles.progressFill, {width: `${item.pct}%`, backgroundColor: [COLORS.beginner, COLORS.intermediate, COLORS.advanced][idx]}]} />
//                 </View>
//               </View>
//             ))}
//           </View>

//           {/* --- QUICK ACCESS --- ✅ FIXED WITH NAVIGATION */}
//           <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Quick Tools</Text>
//           <View style={styles.toolRow}>
//             {[
//               {label: 'Quizzes', icon: '🧠', colors: ['#FF512F', '#DD2476']},
//               {label: 'Code', icon: '💻', colors: ['#4776E6', '#8E54E9']},
//               {label: 'Saved', icon: '🔖', colors: ['#00B4DB', '#0083B0']},
//             ].map(tool => (
//               <TouchableOpacity 
//                 key={tool.label} 
//                 activeOpacity={0.8} 
//                 style={styles.toolItem}
//                 onPress={() => handleQuickToolPress(tool.label)} // ✅ Navigation added
//               >
//                 <LinearGradient colors={tool.colors} style={styles.toolIconBox}>
//                   <Text style={styles.toolIcon}>{tool.icon}</Text>
//                 </LinearGradient>
//                 <Text style={[styles.toolLabel, {color: theme.colors.text}]}>{tool.label}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
          
//           <View style={{height: 100}} />
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   screen: {flex: 1},
//   hero: {
//     paddingTop: 60,
//     paddingHorizontal: SPACING.lg,
//     paddingBottom: SPACING.xl,
//     borderBottomLeftRadius: RADIUS.xl,
//     borderBottomRightRadius: RADIUS.xl,
//   },
//   heroHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: SPACING.lg,
//   },
//   greetingSmall: {color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: '500'},
//   heroTitle: {color: '#FFF', fontSize: 28, fontWeight: '800'},
//   themeBtn: {
//     padding: 10,
//     backgroundColor: 'rgba(255,255,255,0.15)',
//     borderRadius: RADIUS.md,
//   },
//   themeBtnText: {fontSize: 18},
//   xpSection: {marginBottom: SPACING.lg},
//   xpHeader: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8},
//   xpLabel: {color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: '700', letterSpacing: 1},
//   xpValue: {color: '#FFF', fontSize: 12, fontWeight: '700'},
//   statsGrid: {flexDirection: 'row', gap: 12},
//   glassChip: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     borderRadius: RADIUS.lg,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.1)',
//   },
//   chipIcon: {marginRight: 6},
//   chipText: {color: '#FFF', fontSize: 13, fontWeight: '600'},
//   body: {paddingTop: SPACING.md},
//   sectionHeader: {
//     flexDirection: 'row', 
//     justifyContent: 'space-between', 
//     alignItems: 'center', 
//     marginHorizontal: SPACING.md,
//     marginBottom: SPACING.sm
//   },
//   sectionTitle: {fontSize: 18, fontWeight: '800', marginHorizontal: SPACING.md, marginBottom: SPACING.sm},
//   nextCard: {marginHorizontal: SPACING.md, borderRadius: RADIUS.xl, elevation: 8},
//   nextCardContent: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 4},
//   nextTextGroup: {flex: 1, marginRight: 10},
//   nextTag: {color: 'rgba(255,255,255,0.6)', fontSize: 9, fontWeight: '800', letterSpacing: 1},
//   nextTitle: {color: '#FFF', fontSize: 20, fontWeight: '700', marginVertical: 4},
//   levelBadge: {backgroundColor: 'rgba(0,0,0,0.2)', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4},
//   levelBadgeText: {color: '#FFF', fontSize: 10, fontWeight: '600'},
//   playBtn: {width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center'},
//   playIcon: {color: '#000', fontSize: 20, marginLeft: 4},
//   pathGrid: {flexDirection: 'row', paddingHorizontal: SPACING.md, gap: 12, marginBottom: SPACING.lg},
//   pathCard: {flex: 1, padding: 12, borderRadius: RADIUS.lg, borderWidth: 1, alignItems: 'flex-start'},
//   dot: {width: 8, height: 8, borderRadius: 4, marginBottom: 8},
//   pathName: {fontSize: 11, fontWeight: '700', marginBottom: 2},
//   pathStat: {fontSize: 16, fontWeight: '800'},
//   progressTrack: {width: '100%', height: 4, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 2, marginTop: 8},
//   progressFill: {height: '100%', borderRadius: 2},
//   toolRow: {flexDirection: 'row', justifyContent: 'space-around', marginTop: SPACING.sm},
//   toolItem: {alignItems: 'center'},
//   toolIconBox: {width: 60, height: 60, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 8, elevation: 4},
//   toolIcon: {fontSize: 24},
//   toolLabel: {fontSize: 12, fontWeight: '600'},
// });
// import React, {useEffect, useState, useCallback, useMemo} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   StatusBar,
//   RefreshControl,
//   Dimensions,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import {useFocusEffect, useNavigation} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {useTheme} from '../theme/ThemeContext';
// import {COLORS, GRADIENTS, RADIUS, SPACING} from '../theme';
// import {getProgress, updateStreak, Progress} from '../storage/progress';
// import {XPBar} from '../components/XPBar';
// import {GradientCard} from '../components/GradientCard';
// import {lessonsData} from '../data/lessonsData';
// import {RootStackParamList} from '../navigation/AppNavigator';

// const {width} = Dimensions.get('window');
// type NavProp = NativeStackNavigationProp<RootStackParamList>;

// const GREETINGS = ['Welcome back', 'Keep coding', 'Happy learning', 'Level up!'];

// export default function HomeScreen() {
//   const {theme, isDark, toggleTheme} = useTheme();
//   const navigation = useNavigation<NavProp>();
//   const [progress, setProgress] = useState<Progress | null>(null);
//   const [greeting, setGreeting] = useState(GREETINGS[0]);
//   const [refreshing, setRefreshing] = useState(false);

//   const loadData = async () => {
//     await updateStreak();
//     const p = await getProgress();
//     setProgress(p);
//     setGreeting(GREETINGS[Math.floor(Math.random() * GREETINGS.length)]);
//   };

//   useFocusEffect(
//     useCallback(() => {
//       loadData();
//     }, []),
//   );

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await loadData();
//     setRefreshing(false);
//   };

//   // Memoized stats to avoid re-calculating on every scroll
//   const stats = useMemo(() => {
//     const completed = progress?.completedLessons.length ?? 0;
//     const total = lessonsData.length;
//     const next = lessonsData.find(l => !progress?.completedLessons.includes(l.id)) ?? lessonsData[0];
    
//     const levels = ['Beginner', 'Intermediate', 'Advanced'].map(lvl => {
//       const levelLessons = lessonsData.filter(l => l.level === lvl);
//       const done = levelLessons.filter(l => progress?.completedLessons.includes(l.id)).length;
//       return {
//         name: lvl,
//         total: levelLessons.length,
//         done,
//         pct: levelLessons.length > 0 ? (done / levelLessons.length) * 100 : 0,
//       };
//     });

//     return {completed, total, next, levels, pct: Math.round((completed / total) * 100)};
//   }, [progress]);

//   return (
//     <View style={[styles.screen, {backgroundColor: theme.colors.bg}]}>
//       <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFF" />
//         }>
        
//         {/* --- MODERN HERO HEADER --- */}
//         <LinearGradient
//           colors={['#1a1a2e', '#16213e', '#0f3460']}
//           style={styles.hero}>
//           <View style={styles.heroHeader}>
//             <View>
//               <Text style={styles.greetingSmall}>{greeting},</Text>
//               <Text style={styles.heroTitle}>Dartly Student</Text>
//             </View>
//             <TouchableOpacity onPress={toggleTheme} style={styles.themeBtn}>
//               <Text style={styles.themeBtnText}>{isDark ? '☀️' : '🌙'}</Text>
//             </TouchableOpacity>
//           </View>

//           {progress && (
//             <View style={styles.xpSection}>
//               <View style={styles.xpHeader}>
//                 <Text style={styles.xpLabel}>CURRENT LEVEL</Text>
//                 <Text style={styles.xpValue}>{progress.xp} XP</Text>
//               </View>
//               <XPBar xp={progress.xp} />
//             </View>
//           )}

//           <View style={styles.statsGrid}>
//             <View style={styles.glassChip}>
//               <Text style={styles.chipIcon}>🔥</Text>
//               <Text style={styles.chipText}>{progress?.streak ?? 0} Days</Text>
//             </View>
//             <View style={styles.glassChip}>
//               <Text style={styles.chipIcon}>🎯</Text>
//               <Text style={styles.chipText}>{stats.pct}% Progress</Text>
//             </View>
//           </View>
//         </LinearGradient>

//         <View style={styles.body}>
//           {/* --- CONTINUE LEARNING --- */}
//           <View style={styles.sectionHeader}>
//             <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Resume Course</Text>
//             <TouchableOpacity onPress={() => navigation.navigate('Lessons')}>
//               <Text style={{color: COLORS.primary, fontWeight: '600'}}>See All</Text>
//             </TouchableOpacity>
//           </View>

//           <GradientCard
//             colors={GRADIENTS.primary}
//             onPress={() => navigation.navigate('LessonDetail', {lessonId: stats.next.id})}
//             style={styles.nextCard}>
//             <View style={styles.nextCardContent}>
//               <View style={styles.nextTextGroup}>
//                 <Text style={styles.nextTag}>ACTIVE LESSON</Text>
//                 <Text style={styles.nextTitle} numberOfLines={1}>{stats.next.title}</Text>
//                 <View style={styles.levelBadge}>
//                    <Text style={styles.levelBadgeText}>{stats.next.level}</Text>
//                 </View>
//               </View>
//               <View style={styles.playBtn}>
//                 <Text style={styles.playIcon}>▶</Text>
//               </View>
//             </View>
//           </GradientCard>

//           {/* --- PATH PROGRESS --- */}
//           <Text style={[styles.sectionTitle, {color: theme.colors.text, marginTop: SPACING.lg}]}>
//             Your Mastery
//           </Text>
//           <View style={styles.pathGrid}>
//             {stats.levels.map((item, idx) => (
//               <View key={item.name} style={[styles.pathCard, {backgroundColor: theme.colors.card, borderColor: theme.colors.border}]}>
//                 <View style={[styles.dot, {backgroundColor: [COLORS.beginner, COLORS.intermediate, COLORS.advanced][idx]}]} />
//                 <Text style={[styles.pathName, {color: theme.colors.textSecondary}]}>{item.name}</Text>
//                 <Text style={[styles.pathStat, {color: theme.colors.text}]}>{item.done}/{item.total}</Text>
//                 <View style={styles.progressTrack}>
//                   <View style={[styles.progressFill, {width: `${item.pct}%`, backgroundColor: [COLORS.beginner, COLORS.intermediate, COLORS.advanced][idx]}]} />
//                 </View>
//               </View>
//             ))}
//           </View>

//           {/* --- QUICK ACCESS --- */}
//           <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Quick Tools</Text>
//           <View style={styles.toolRow}>
//             {[
//               {label: 'Quizzes', icon: '🧠', colors: ['#FF512F', '#DD2476']},
//               {label: 'Code', icon: '💻', colors: ['#4776E6', '#8E54E9']},
//               {label: 'Saved', icon: '🔖', colors: ['#00B4DB', '#0083B0']},
//             ].map(tool => (
//               <TouchableOpacity key={tool.label} activeOpacity={0.8} style={styles.toolItem}>
//                 <LinearGradient colors={tool.colors} style={styles.toolIconBox}>
//                   <Text style={styles.toolIcon}>{tool.icon}</Text>
//                 </LinearGradient>
//                 <Text style={[styles.toolLabel, {color: theme.colors.text}]}>{tool.label}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
          
//           <View style={{height: 100}} />
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   screen: {flex: 1},
//   hero: {
//     paddingTop: 60,
//     paddingHorizontal: SPACING.lg,
//     paddingBottom: SPACING.xl,
//     borderBottomLeftRadius: RADIUS.xl,
//     borderBottomRightRadius: RADIUS.xl,
//   },
//   heroHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: SPACING.lg,
//   },
//   greetingSmall: {color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: '500'},
//   heroTitle: {color: '#FFF', fontSize: 28, fontWeight: '800'},
//   themeBtn: {
//     padding: 10,
//     backgroundColor: 'rgba(255,255,255,0.15)',
//     borderRadius: RADIUS.md,
//   },
//   themeBtnText: {fontSize: 18},
//   xpSection: {marginBottom: SPACING.lg},
//   xpHeader: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8},
//   xpLabel: {color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: '700', letterSpacing: 1},
//   xpValue: {color: '#FFF', fontSize: 12, fontWeight: '700'},
//   statsGrid: {flexDirection: 'row', gap: 12},
//   glassChip: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     borderRadius: RADIUS.lg,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.1)',
//   },
//   chipIcon: {marginRight: 6},
//   chipText: {color: '#FFF', fontSize: 13, fontWeight: '600'},
//   body: {paddingTop: SPACING.md},
//   sectionHeader: {
//     flexDirection: 'row', 
//     justifyContent: 'space-between', 
//     alignItems: 'center', 
//     marginHorizontal: SPACING.md,
//     marginBottom: SPACING.sm
//   },
//   sectionTitle: {fontSize: 18, fontWeight: '800', marginHorizontal: SPACING.md, marginBottom: SPACING.sm},
//   nextCard: {marginHorizontal: SPACING.md, borderRadius: RADIUS.xl, elevation: 8},
//   nextCardContent: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 4},
//   nextTextGroup: {flex: 1, marginRight: 10},
//   nextTag: {color: 'rgba(255,255,255,0.6)', fontSize: 9, fontWeight: '800', letterSpacing: 1},
//   nextTitle: {color: '#FFF', fontSize: 20, fontWeight: '700', marginVertical: 4},
//   levelBadge: {backgroundColor: 'rgba(0,0,0,0.2)', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4},
//   levelBadgeText: {color: '#FFF', fontSize: 10, fontWeight: '600'},
//   playBtn: {width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center'},
//   playIcon: {color: '#000', fontSize: 20, marginLeft: 4},
//   pathGrid: {flexDirection: 'row', paddingHorizontal: SPACING.md, gap: 12, marginBottom: SPACING.lg},
//   pathCard: {flex: 1, padding: 12, borderRadius: RADIUS.lg, borderWidth: 1, alignItems: 'flex-start'},
//   dot: {width: 8, height: 8, borderRadius: 4, marginBottom: 8},
//   pathName: {fontSize: 11, fontWeight: '700', marginBottom: 2},
//   pathStat: {fontSize: 16, fontWeight: '800'},
//   progressTrack: {width: '100%', height: 4, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 2, marginTop: 8},
//   progressFill: {height: '100%', borderRadius: 2},
//   toolRow: {flexDirection: 'row', justifyContent: 'space-around', marginTop: SPACING.sm},
//   toolItem: {alignItems: 'center'},
//   toolIconBox: {width: 60, height: 60, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 8, elevation: 4},
//   toolIcon: {fontSize: 24},
//   toolLabel: {fontSize: 12, fontWeight: '600'},
// });
// // src/screens/HomeScreen.tsx
// import React, {useEffect, useState, useCallback} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   StatusBar,
//   RefreshControl,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import {useFocusEffect, useNavigation} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {useTheme} from '../theme/ThemeContext';
// import {COLORS, GRADIENTS, RADIUS, SPACING} from '../theme';
// import {getProgress, updateStreak, Progress} from '../storage/progress';
// import {XPBar} from '../components/XPBar';
// import {GradientCard} from '../components/GradientCard';
// import {lessonsData} from '../data/lessonsData';
// import {RootStackParamList} from '../navigation/AppNavigator';

// type NavProp = NativeStackNavigationProp<RootStackParamList>;

// const GREETINGS = ['Hello', 'مرحباً', 'Bonjour', 'Hola'];

// export default function HomeScreen() {
//   const {theme, isDark, toggleTheme} = useTheme();
//   const navigation = useNavigation<NavProp>();
//   const [progress, setProgress] = useState<Progress | null>(null);
//   const [greeting, setGreeting] = useState(GREETINGS[0]);
//   const [refreshing, setRefreshing] = useState(false);

//   const load = async () => {
//     await updateStreak();
//     const p = await getProgress();
//     setProgress(p);
//     setGreeting(GREETINGS[Math.floor(Math.random() * GREETINGS.length)]);
//   };

//   useFocusEffect(
//     useCallback(() => {
//       load();
//     }, []),
//   );

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await load();
//     setRefreshing(false);
//   };

//   const completed = progress?.completedLessons.length ?? 0;
//   const totalLessons = lessonsData.length;
//   const pct = Math.round((completed / totalLessons) * 100);

//   const nextLesson =
//     lessonsData.find(l => !progress?.completedLessons.includes(l.id)) ??
//     lessonsData[0];

//   const beginnerCount = lessonsData.filter(l => l.level === 'Beginner').length;
//   const interCount = lessonsData.filter(l => l.level === 'Intermediate').length;
//   const advCount = lessonsData.filter(l => l.level === 'Advanced').length;

//   const completedBeginner = lessonsData
//     .filter(l => l.level === 'Beginner')
//     .filter(l => progress?.completedLessons.includes(l.id)).length;

//   return (
//     <View style={[styles.screen, {backgroundColor: theme.colors.bg}]}>
//       <StatusBar
//         barStyle={isDark ? 'light-content' : 'dark-content'}
//         backgroundColor="transparent"
//         translucent
//       />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }>
//         {/* Hero Header */}
//         <LinearGradient
//           colors={['#0F0C29', '#302B63', '#24243E']}
//           start={{x: 0, y: 0}}
//           end={{x: 1, y: 1}}
//           style={styles.hero}>
//           <View style={styles.heroTop}>
//             <View>
//               <Text style={styles.greetingSmall}>{greeting} 👋</Text>
//               <Text style={styles.heroTitle}>Dartly</Text>
//               <Text style={styles.heroSub}>Master Dart from zero to hero</Text>
//             </View>
//             <TouchableOpacity onPress={toggleTheme} style={styles.themeBtn}>
//               <Text style={styles.themeBtnText}>{isDark ? '☀️' : '🌙'}</Text>
//             </TouchableOpacity>
//           </View>

//           {/* XP Bar in hero */}
//           {progress && (
//             <View style={styles.xpWrap}>
//               <XPBar xp={progress.xp} />
//             </View>
//           )}

//           {/* Streak badge */}
//           <View style={styles.statsRow}>
//             <View style={styles.statChip}>
//               <Text style={styles.statChipIcon}>🔥</Text>
//               <Text style={styles.statChipText}>
//                 {progress?.streak ?? 0} day streak
//               </Text>
//             </View>
//             <View style={styles.statChip}>
//               <Text style={styles.statChipIcon}>✅</Text>
//               <Text style={styles.statChipText}>
//                 {completed}/{totalLessons} done
//               </Text>
//             </View>
//             <View style={styles.statChip}>
//               <Text style={styles.statChipIcon}>⭐</Text>
//               <Text style={styles.statChipText}>{progress?.xp ?? 0} XP</Text>
//             </View>
//           </View>
//         </LinearGradient>

//         <View style={styles.body}>
//           {/* Continue Learning */}
//           <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
//             Continue Learning
//           </Text>

//           <GradientCard
//             colors={GRADIENTS.primary}
//             onPress={() =>
//               navigation.navigate('LessonDetail', {lessonId: nextLesson.id})
//             }
//             style={styles.nextCard}>
//             <View style={styles.nextCardInner}>
//               <View>
//                 <Text style={styles.nextLabel}>NEXT UP</Text>
//                 <Text style={styles.nextTitle}>{nextLesson.title}</Text>
//                 <Text style={styles.nextLevel}>📚 {nextLesson.level}</Text>
//               </View>
//               <View style={styles.startBtn}>
//                 <Text style={styles.startBtnText}>▶</Text>
//               </View>
//             </View>
//             {/* Progress bar */}
//             <View style={styles.miniTrack}>
//               <View
//                 style={[styles.miniFill, {width: `${pct}%`}]}
//               />
//             </View>
//             <Text style={styles.miniPct}>{pct}% completed</Text>
//           </GradientCard>

//           {/* Level Progress */}
//           <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
//             Your Path
//           </Text>
//           <View style={styles.pathRow}>
//             {[
//               {level: 'Beginner', icon: '🌱', color: COLORS.beginner, total: beginnerCount, done: completedBeginner, gradient: GRADIENTS.beginner},
//               {level: 'Intermediate', icon: '⚡', color: COLORS.intermediate, total: interCount, done: progress ? lessonsData.filter(l => l.level === 'Intermediate' && progress.completedLessons.includes(l.id)).length : 0, gradient: GRADIENTS.intermediate},
//               {level: 'Advanced', icon: '🔥', color: COLORS.advanced, total: advCount, done: progress ? lessonsData.filter(l => l.level === 'Advanced' && progress.completedLessons.includes(l.id)).length : 0, gradient: GRADIENTS.advanced},
//             ].map(item => (
//               <View
//                 key={item.level}
//                 style={[
//                   styles.pathCard,
//                   {
//                     backgroundColor: theme.colors.card,
//                     borderColor: theme.colors.border,
//                   },
//                 ]}>
//                 <Text style={styles.pathIcon}>{item.icon}</Text>
//                 <Text style={[styles.pathLevel, {color: theme.colors.textSecondary}]}>
//                   {item.level.substring(0, 5)}
//                 </Text>
//                 <Text style={[styles.pathCount, {color: item.color}]}>
//                   {item.done}/{item.total}
//                 </Text>
//                 <View style={[styles.pathTrack, {backgroundColor: theme.colors.border}]}>
//                   <LinearGradient
//                     colors={item.gradient}
//                     start={{x: 0, y: 0}}
//                     end={{x: 1, y: 0}}
//                     style={[
//                       styles.pathFill,
//                       {width: `${(item.done / item.total) * 100}%`},
//                     ]}
//                   />
//                 </View>
//               </View>
//             ))}
//           </View>

//           {/* Quick Actions */}
//           <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
//             Quick Access
//           </Text>
//           <View style={styles.quickRow}>
//             {[
//               {icon: '📖', label: 'Lessons', gradient: GRADIENTS.beginner, screen: 'Lessons'},
//               {icon: '🧠', label: 'Quiz', gradient: GRADIENTS.quiz, screen: 'Lessons'},
//               {icon: '💻', label: 'Exercise', gradient: GRADIENTS.advanced, screen: 'Lessons'},
//               {icon: '🔖', label: 'Bookmarks', gradient: GRADIENTS.intermediate, screen: 'Bookmarks'},
//             ].map(item => (
//               <GradientCard
//                 key={item.label}
//                 colors={item.gradient}
//                 style={styles.quickCard}
//                 contentStyle={styles.quickCardContent}
//                 onPress={() => {
//                   // Navigation handled by tab
//                 }}>
//                 <Text style={styles.quickIcon}>{item.icon}</Text>
//                 <Text style={styles.quickLabel}>{item.label}</Text>
//               </GradientCard>
//             ))}
//           </View>

//           {/* Tips of the day */}
//           <GradientCard
//             colors={['#1A1A2E', '#16213E']}
//             style={styles.tipCard}>
//             <Text style={styles.tipLabel}>💡 Dart Tip</Text>
//             <Text style={styles.tipText}>
//               {lessonsData[Math.floor(Math.random() * 10)].tips[0]}
//             </Text>
//           </GradientCard>

//           <View style={{height: SPACING.xxl}} />
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   screen: {flex: 1},
//   hero: {
//     paddingTop: 60,
//     paddingHorizontal: SPACING.md,
//     paddingBottom: SPACING.xl,
//   },
//   heroTop: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: SPACING.md,
//   },
//   greetingSmall: {color: '#A0A0C0', fontSize: 14, marginBottom: 4},
//   heroTitle: {
//     color: '#FFFFFF',
//     fontSize: 30,
//     fontWeight: '800',
//     letterSpacing: -0.5,
//   },
//   heroSub: {color: '#8080B0', fontSize: 13, marginTop: 2},
//   themeBtn: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   themeBtnText: {fontSize: 20},
//   xpWrap: {marginTop: SPACING.md},
//   statsRow: {
//     flexDirection: 'row',
//     gap: 8,
//     marginTop: SPACING.md,
//     flexWrap: 'wrap',
//   },
//   statChip: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     borderRadius: RADIUS.full,
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     gap: 6,
//   },
//   statChipIcon: {fontSize: 14},
//   statChipText: {color: '#E0E0FF', fontSize: 12, fontWeight: '600'},
//   body: {paddingTop: SPACING.lg},
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     marginHorizontal: SPACING.md,
//     marginBottom: SPACING.sm,
//     marginTop: SPACING.sm,
//   },
//   nextCard: {marginHorizontal: SPACING.md},
//   nextCardInner: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 12,
//   },
//   nextLabel: {
//     color: 'rgba(255,255,255,0.7)',
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 1.5,
//     marginBottom: 4,
//   },
//   nextTitle: {color: '#FFFFFF', fontSize: 17, fontWeight: '700', maxWidth: 220},
//   nextLevel: {color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 4},
//   startBtn: {
//     width: 52,
//     height: 52,
//     borderRadius: 26,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   startBtnText: {color: '#FFFFFF', fontSize: 18},
//   miniTrack: {
//     height: 4,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     borderRadius: 2,
//     overflow: 'hidden',
//     marginBottom: 4,
//   },
//   miniFill: {
//     height: '100%',
//     backgroundColor: 'rgba(255,255,255,0.9)',
//     borderRadius: 2,
//   },
//   miniPct: {color: 'rgba(255,255,255,0.6)', fontSize: 11},
//   pathRow: {
//     flexDirection: 'row',
//     gap: 10,
//     paddingHorizontal: SPACING.md,
//     marginBottom: SPACING.md,
//   },
//   pathCard: {
//     flex: 1,
//     borderRadius: RADIUS.lg,
//     padding: 12,
//     borderWidth: 1,
//     alignItems: 'center',
//     gap: 4,
//   },
//   pathIcon: {fontSize: 20},
//   pathLevel: {fontSize: 10, fontWeight: '600'},
//   pathCount: {fontSize: 14, fontWeight: '800'},
//   pathTrack: {
//     width: '100%',
//     height: 4,
//     borderRadius: 2,
//     overflow: 'hidden',
//     marginTop: 4,
//   },
//   pathFill: {height: '100%', borderRadius: 2},
//   quickRow: {
//     flexDirection: 'row',
//     gap: 10,
//     paddingHorizontal: SPACING.md,
//     marginBottom: SPACING.lg,
//   },
//   quickCard: {flex: 1},
//   quickCardContent: {padding: 12, alignItems: 'center'},
//   quickIcon: {fontSize: 24, marginBottom: 4},
//   quickLabel: {color: '#FFFFFF', fontSize: 11, fontWeight: '700'},
//   tipCard: {marginHorizontal: SPACING.md},
//   tipLabel: {color: '#667EEA', fontSize: 11, fontWeight: '700', marginBottom: 6},
//   tipText: {color: '#A0A0C0', fontSize: 13, lineHeight: 20},
// });
