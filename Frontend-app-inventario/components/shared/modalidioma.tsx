import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../../idiomas/i18n"; // Ajusta esta ruta según tu estructura
import { useTranslation } from "react-i18next";

interface LanguageModalProps {
    visible: boolean;
    onClose: () => void;
}

const LanguageModal: React.FC<LanguageModalProps> = ({ visible, onClose }) => {

    const [selectedLanguage, setSelectedLanguage] = useState("es");
    const { t } = useTranslation();

    const languages = [
        { code: "es", name: "Español" },
        { code: "en", name: "English" },
        { code: "pt", name: "Português" },
        { code: "fr", name: "Français" },
        { code: "ja", name: "日本語 (Japanese)" },
    ];

    useEffect(() => {
        const loadLanguage = async () => {
            const savedLang = await AsyncStorage.getItem("language");
            if (savedLang) {
                setSelectedLanguage(savedLang);
            }
        };
        loadLanguage();
    }, []);

    const changeLanguage = async (code: string) => {
        setSelectedLanguage(code);
        await AsyncStorage.setItem("language", code);
        await i18n.changeLanguage(code); // Cambia idioma
        // Cierra el modal;
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View className="flex-1 bg-white dark:bg-slate-900">
                {/* Encabezado */}
                <View className="bg-[#5A8FCA] h-[60px] flex-row p-5 justify-between items-center">
                    <TouchableOpacity onPress={onClose} className="flex-row gap-3">
                        <Ionicons name="arrow-back" size={24} color="white" />
                        <Text className="text-white text-2xl font-semibold">Lenguaje</Text>
                    </TouchableOpacity>
                </View>

                <View className="m-4">
                    <Text className="text-gray-600 dark:text-gray-400 font-semibold text-lg">📌 {t("seccion.didYouKnow")}</Text>
                    <Text className="text-gray-500 dark:text-gray-300 mt-2">
                        - {t("seccion.fact1")}
                    </Text>
                    <Text className="text-gray-500 dark:text-gray-300 mt-2">
                        - {t("seccion.fact2")}
                    </Text>
                    <Text className="text-gray-500 dark:text-gray-300 mt-2">
                        - {t("seccion.fact3")}
                    </Text>
                </View>

                <Text className="text-blue-500 dark:text-blue-300 font-bold m-4">{t("language.selectLanguage")}</Text>


                <FlatList
                    data={languages}
                    keyExtractor={(item) => item.code}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            className="flex-row items-center gap-6 p-4"
                            onPress={() => changeLanguage(item.code)}
                        >
                            <Ionicons
                                name={selectedLanguage === item.code ? "radio-button-on" : "radio-button-off"}
                                size={24}
                                color={selectedLanguage === item.code ? "#5A8FCA" : "gray"}
                            />
                            <Text className="text-lg dark:text-white">{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </Modal>
    );
};

export default LanguageModal;
