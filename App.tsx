import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import mobileAds from 'react-native-google-mobile-ads';
import { ThemeProvider } from './src/theme/ThemeContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  useEffect(() => {
    // 🚀 تهيئة Google Mobile Ads SDK عند فتح التطبيق مباشرة
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        console.log('Google Mobile Ads SDK Initialized Successfully', adapterStatuses);
      })
      .catch(error => {
        console.error('Failed to initialize Mobile Ads SDK:', error);
      });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppNavigator />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}