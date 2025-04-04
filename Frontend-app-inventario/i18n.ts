import React from "react";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import en from "../Frontend-app-inventario/idiomas/en.json";
import es from "../Frontend-app-inventario/idiomas/en.json";

const LANGUAGE_KEY = "appLanguage";

const resources = { en: { translation: en }, es: { translation: es } };

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Idioma por defecto
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

// Cargar idioma guardado
AsyncStorage.getItem(LANGUAGE_KEY).then((language) => {
  if (language) {
    i18next.changeLanguage(language);
  }
});

export const changeAppLanguage = async (language: string) => {
  await AsyncStorage.setItem(LANGUAGE_KEY, language);
  i18next.changeLanguage(language);
};

export default i18next;
