import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, FlatList } from "react-native";

const LanguageModal = ({ visible, onClose }) => {
    const [selectedLanguage, setSelectedLanguage] = useState("es");

    const languages = [
        { code: "es", name: "Español" },
        { code: "en", name: "English" },
        { code: "ar", name: "العربية" },
        { code: "be", name: "Беларуская" },
        { code: "po", name: "Portugues" },
        { code: "hr", name: "Hrvatski" },
        { code: "in", name: "Indio" },
        { code: "nl", name: "Nederlands" },
        { code: "ja", name: "Japones" },
    ];

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View className="flex-1 bg-white">
                {/* Encabezado */}
                <View className="bg-[#5A8FCA] h-[60px] flex-row p-5 justify-between items-center">
                    <TouchableOpacity onPress={onClose} className="flex-row gap-3">
                        <Ionicons name="arrow-back" size={24} color="white" />
                        <Text className="text-white text-2xl font-semibold">Lenguaje</Text>
                    </TouchableOpacity>
                </View>
                <View className="m-4 ">
                    <Text className="text-gray-600 font-semibold text-lg">📌 ¿Sabías que...?</Text>
                    <Text className="text-gray-500 mt-2">
                        - Durante la Primera Guerra Mundial, el fútbol logró una tregua temporal entre soldados enemigos en 1914.
                        Se cree que los partidos se jugaron sin importar el idioma que hablaban. ⚽✨
                    </Text>
                    <Text className="text-gray-500 mt-2">
                        - El idioma más hablado en el mundo es el inglés, pero el chino mandarín tiene más hablantes nativos. 🗣️
                    </Text>
                    <Text className="text-gray-500 mt-2">
                        - El euskera, hablado en el País Vasco, es uno de los idiomas más antiguos de Europa y no está relacionado con ningún otro idioma conocido. 🏔️
                    </Text>
                </View>
                {/* Título */}
                <Text className="text-blue-500 font-bold m-4">Selecciona un idioma</Text>

                {/* Lista de idiomas con los radio buttons alineados */}
                <FlatList
                    data={languages}
                    keyExtractor={(item) => item.code}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            className="flex-row items-center gap-6 p-4 "
                            onPress={() => setSelectedLanguage(item.code)}
                        >
                            <Ionicons
                                name={selectedLanguage === item.code ? "radio-button-on" : "radio-button-off"}
                                size={24}
                                color={selectedLanguage === item.code ? "#5A8FCA" : "gray"}
                            />
                            <Text className="text-lg">{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </Modal>
    );
};

export default LanguageModal;
