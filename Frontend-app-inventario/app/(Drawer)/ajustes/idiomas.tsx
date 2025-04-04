import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { useTranslation } from "react-i18next";
import "../../../i18n";
import { changeAppLanguage } from "../../../i18n";

const Idiomas = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(i18n.language);
    };
    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);
  
  const switchLanguage = async () => {
    const newLanguage = language === "en" ? "es" : "en";
    await changeAppLanguage(newLanguage);
    alert(`newLanguage:${newLanguage}`)
    
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>{t("Welcome!")}</Text>
      <Button title={t("change_language")} onPress={switchLanguage} />
    </View>
  );
};

export default Idiomas;
