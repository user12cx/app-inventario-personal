// app/AnimatedSplash.tsx

import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import * as SplashScreen from 'expo-splash-screen';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AnimatedSplash() {
  useEffect(() => {
    const iniciarApp = async () => {
      await SplashScreen.hideAsync(); // Oculta el splash nativo

      // Espera a que cargue la animación y verifica el login
      setTimeout(async () => {
        const usuarioId = await AsyncStorage.getItem('usuario_id');
        const terms = await AsyncStorage.getItem('termsAccepte');

        if (usuarioId && terms === 'true') {
          router.replace('/(Drawer)/Home');
        } else {
          router.replace('/(Stack)/Login');
        }
      }, 3000); // dura lo mismo que la animación
    };

    iniciarApp();
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/splash/MainScene.json')}
        autoPlay
        loop={false}
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 400,
    height: 400,
  },
});
