import React from 'react';
import { StatusBar } from 'react-native';

import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import {
  Rajdhani_500Medium,
  Rajdhani_700Bold,
  useFonts,
} from '@expo-google-fonts/rajdhani';

import { Background } from '~/components/Background';
import { Load } from '~/components/Load';
import { AuthProvider } from '~/hooks/auth';
import { Routes } from '~/routes';

const App = () => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold,
  });

  return (
    <Background>
      <AuthProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {fontsLoaded ? <Routes /> : <Load />}
      </AuthProvider>
    </Background>
  );
};
export default App;
