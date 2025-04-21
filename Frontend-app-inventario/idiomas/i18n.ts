import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";

// Tus traducciones
import es from "./es.json";
import en from "./en.json";
import fr from "./fr.json";
import pt from "./pt.json";
import ja from "./ja.json";
// agrega más idiomas...

const getSavedLanguage = async (): Promise<string> => {
  const saved = await AsyncStorage.getItem("language");
  return saved || Localization.locale.split("-")[0]; // fallback automático
};

getSavedLanguage().then((lng) => {
  i18n
    .use(initReactI18next)
    .init({
      compatibilityJSON: "v3",
      lng,
      fallbackLng: "es",
      resources: {
        es: { translation: es },
        en: { translation: en },
        pt: { translation: pt },
        fr: { translation: fr },  
        ja: { translation: ja },
        // más idiomas aquí...
      },
      interpolation: {
        escapeValue: false,
      },
    });
});

export default i18n;
