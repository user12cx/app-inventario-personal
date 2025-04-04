import React from 'react';
import { Stack } from 'expo-router';
import { Button, StatusBar, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const _layoutStack = () => {
  return (
    <>
      <StatusBar backgroundColor="#5A8FCA" barStyle="default" />

      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: "#f8fafc"
          },
          headerStyle: {
            backgroundColor: '#f8fafc',

          },
          headerTintColor: '#000', // Color del texto y botones
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          headerTitleAlign: 'center', // Centrar el título
          headerShadowVisible: false, // Sin sombra en la cabecera
        }}
      >
        <Stack.Screen
          name="Login/index"
          options={{
            title: 'Iniciar Sesión',
            headerTitleStyle: {
              fontSize: 28,  // Tamaño del texto
              fontWeight: 'bold', // Negrita (opcional)
            }
          }}
        />
        <Stack.Screen
          name="register/index"
          options={{
            title: 'Create Account',
            headerStyle: {
              backgroundColor: '#ECF3FB', // Fondo oscuro tipo Samsung
            },
            headerTitleStyle: {
              fontSize: 28,  // Tamaño del texto
              fontWeight: 'bold', // Negrita (opcional)
            },

            // headerShown: false, // Ocultar cabecera
          }}
        />
      </Stack>
    </>
  );
};

export default _layoutStack;