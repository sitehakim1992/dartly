// src/navigation/AppNavigator.tsx
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; // ✅ Added
import {useTheme} from '../theme/ThemeContext';
import {COLORS, RADIUS} from '../theme';

// Screens
import HomeScreen from '../screens/HomeScreen';
import LessonsScreen from '../screens/LessonsScreen';
import LessonDetailScreen from '../screens/LessonDetailScreen';
import QuizScreen from '../screens/QuizScreen';
import ExerciseScreen from '../screens/ExerciseScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import BookmarksScreen from '../screens/BookmarksScreen';

export type RootStackParamList = {
  Main: undefined;
  LessonDetail: {lessonId: number};
  Quiz: {lessonId: number};
  Exercise: {lessonId: number};
};

export type TabParamList = {
  Home: undefined;
  Lessons: undefined;
  Search: undefined;
  Bookmarks: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// ✅ Updated TabIcon to use Ionicons
const TabIcon = ({
  iconName,
  focused,
  label,
}: {
  iconName: string;
  focused: boolean;
  label: string;
}) => {
  const {theme} = useTheme();
  const color = focused ? COLORS.primary : theme.colors.icon;

  return (
    <View style={styles.tabItem}>
      <Ionicons name={iconName as any} size={24} color={color} />
      <Text
        style={[
          styles.tabLabel,
          {color},
          focused && styles.tabLabelActive,
        ]}>
        {label}
      </Text>
      {focused && (
        <View style={[styles.tabDot, {backgroundColor: COLORS.primary}]} />
      )}
    </View>
  );
};

// ✅ Import Text here since it's only used in TabIcon now
import {Text} from 'react-native';

const MainTabs = () => {
  const {theme} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          borderTopWidth: 0.5,
          height: 80,
          paddingBottom: 12,
          paddingTop: 8,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon iconName={focused ? 'home' : 'home-outline'} focused={focused} label="Home" />
          ),
        }}
      />
      <Tab.Screen
        name="Lessons"
        component={LessonsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon iconName={focused ? 'library' : 'library-outline'} focused={focused} label="Learn" />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon iconName={focused ? 'search' : 'search-outline'} focused={focused} label="Search" />
          ),
        }}
      />
      <Tab.Screen
        name="Bookmarks"
        component={BookmarksScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon iconName={focused ? 'bookmark' : 'bookmark-outline'} focused={focused} label="Saved" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon iconName={focused ? 'person' : 'person-outline'} focused={focused} label="Profile" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  const {theme} = useTheme();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: theme.colors.bg},
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen
          name="LessonDetail"
          component={LessonDetailScreen}
          options={{animation: 'slide_from_bottom'}}
        />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Exercise" component={ExerciseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
  },
  tabLabelActive: {
    fontWeight: '700',
  },
  tabDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 3,
  },
});
// // src/navigation/AppNavigator.tsx
// import React from 'react';
// import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {useTheme} from '../theme/ThemeContext';
// import {COLORS, RADIUS} from '../theme';

// // Screens
// import HomeScreen from '../screens/HomeScreen';
// import LessonsScreen from '../screens/LessonsScreen';
// import LessonDetailScreen from '../screens/LessonDetailScreen';
// import QuizScreen from '../screens/QuizScreen';
// import ExerciseScreen from '../screens/ExerciseScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import SearchScreen from '../screens/SearchScreen';
// import BookmarksScreen from '../screens/BookmarksScreen';

// export type RootStackParamList = {
//   Main: undefined;
//   LessonDetail: {lessonId: number};
//   Quiz: {lessonId: number};
//   Exercise: {lessonId: number};
// };

// export type TabParamList = {
//   Home: undefined;
//   Lessons: undefined;
//   Search: undefined;
//   Bookmarks: undefined;
//   Profile: undefined;
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();
// const Tab = createBottomTabNavigator<TabParamList>();

// const TabIcon = ({
//   icon,
//   focused,
//   label,
// }: {
//   icon: string;
//   focused: boolean;
//   label: string;
// }) => {
//   const {theme} = useTheme();
//   return (
//     <View style={styles.tabItem}>
//       <Text
//         style={[
//           styles.tabIcon,
//           {color: focused ? COLORS.primary : theme.colors.icon},
//         ]}>
//         {icon}
//       </Text>
//       <Text
//         style={[
//           styles.tabLabel,
//           {color: focused ? COLORS.primary : theme.colors.icon},
//           focused && styles.tabLabelActive,
//         ]}>
//         {label}
//       </Text>
//       {focused && (
//         <View style={[styles.tabDot, {backgroundColor: COLORS.primary}]} />
//       )}
//     </View>
//   );
// };

// const MainTabs = () => {
//   const {theme} = useTheme();
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           backgroundColor: theme.colors.surface,
//           borderTopColor: theme.colors.border,
//           borderTopWidth: 0.5,
//           height: 80,
//           paddingBottom: 12,
//           paddingTop: 8,
//           elevation: 0,
//           shadowOpacity: 0,
//         },
//         tabBarShowLabel: false,
//       }}>
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           tabBarIcon: ({focused}) => (
//             <TabIcon icon="🏠" focused={focused} label="Home" />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Lessons"
//         component={LessonsScreen}
//         options={{
//           tabBarIcon: ({focused}) => (
//             <TabIcon icon="📚" focused={focused} label="Learn" />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Search"
//         component={SearchScreen}
//         options={{
//           tabBarIcon: ({focused}) => (
//             <TabIcon icon="🔍" focused={focused} label="Search" />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Bookmarks"
//         component={BookmarksScreen}
//         options={{
//           tabBarIcon: ({focused}) => (
//             <TabIcon icon="🔖" focused={focused} label="Saved" />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{
//           tabBarIcon: ({focused}) => (
//             <TabIcon icon="👤" focused={focused} label="Profile" />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// export const AppNavigator = () => {
//   const {theme} = useTheme();
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         screenOptions={{
//           headerShown: false,
//           contentStyle: {backgroundColor: theme.colors.bg},
//           animation: 'slide_from_right',
//         }}>
//         <Stack.Screen name="Main" component={MainTabs} />
//         <Stack.Screen
//           name="LessonDetail"
//           component={LessonDetailScreen}
//           options={{animation: 'slide_from_bottom'}}
//         />
//         <Stack.Screen name="Quiz" component={QuizScreen} />
//         <Stack.Screen name="Exercise" component={ExerciseScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// const styles = StyleSheet.create({
//   tabItem: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 60,
//   },
//   tabIcon: {
//     fontSize: 22,
//     marginBottom: 2,
//   },
//   tabLabel: {
//     fontSize: 10,
//     fontWeight: '500',
//   },
//   tabLabelActive: {
//     fontWeight: '700',
//   },
//   tabDot: {
//     width: 4,
//     height: 4,
//     borderRadius: 2,
//     marginTop: 3,
//   },
// });
