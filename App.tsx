import React, { useEffect, useState } from 'react';
import { View, BackHandler } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mobileAds from 'react-native-google-mobile-ads';
import { ThemeProvider } from './src/theme/ThemeContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import PrivacyConsentModal from './src/components/PrivacyConsentModal';

const PRIVACY_KEY = 'privacy_policy_accepted_v1';

export default function App() {
  // null = still reading storage, false = not accepted yet, true = accepted
  const [accepted, setAccepted] = useState<boolean | null>(null);

  // 1) Read the saved consent on startup
  useEffect(() => {
    AsyncStorage.getItem(PRIVACY_KEY)
      .then(value => setAccepted(value === 'true'))
      .catch(() => setAccepted(false));
  }, []);

  // 2) Initialize Google Mobile Ads ONLY after the user accepted the privacy policy
  useEffect(() => {
    if (accepted !== true) {
      return;
    }
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        console.log('Google Mobile Ads SDK Initialized Successfully', adapterStatuses);
      })
      .catch(error => {
        console.error('Failed to initialize Mobile Ads SDK:', error);
      });
  }, [accepted]);

  const handleAccept = async () => {
    try {
      await AsyncStorage.setItem(PRIVACY_KEY, 'true');
    } catch (e) {
      // if saving fails, the user can still continue for this session
    }
    setAccepted(true);
  };

  const handleDecline = () => {
    BackHandler.exitApp();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#0D0D1A' }}>
      <SafeAreaProvider>
        {accepted === null ? (
          <View style={{ flex: 1, backgroundColor: '#0D0D1A' }} />
        ) : accepted ? (
          <ThemeProvider>
            <AppNavigator />
          </ThemeProvider>
        ) : (
          <View style={{ flex: 1, backgroundColor: '#0D0D1A' }}>
            <PrivacyConsentModal
              visible
              onAccept={handleAccept}
              onDecline={handleDecline}
            />
          </View>
        )}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}