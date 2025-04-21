// hooks/useExitApp.ts
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler, Alert } from 'react-native';
import { useCallback } from 'react';
import { t } from 'i18next';

const useExitApp = () => {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          t("salir_app.salir"),
          t("salir_app.salir_mensaje"),
          [
            { text: t("titles.cancelar"), style: 'cancel' },
            { text: t("titles.ok"), onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: false }
        );
        return true;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [])
  );
};

export default useExitApp;
