// hooks/useExitApp.ts
import { useEffect } from 'react';
import { BackHandler, Alert } from 'react-native';

const useExitApp = () => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Confirmar salida",
        "¿Estás seguro de que quieres salir de la app?",
        [
          {
            text: "Cancelar",
            onPress: () => null, // Si el usuario cancela, no pasa nada
            style: "cancel",
          },
          {
            text: "Salir",
            onPress: () => {
              // Sale de la app
              BackHandler.exitApp();
            },
          },
        ],
        { cancelable: false } // No permitir que se cierre al tocar fuera de la alerta
      );
      return true; // Esto evita que la app se cierre inmediatamente
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    // Limpieza del listener cuando el componente se desmonta
    return () => backHandler.remove();
  }, []);
};

export default useExitApp;
