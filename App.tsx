import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/contexts/AuthContext';
import { BooksProvider } from './src/contexts/BooksContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <BooksProvider>
          <AppNavigator />
          <StatusBar style="auto" />
        </BooksProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
