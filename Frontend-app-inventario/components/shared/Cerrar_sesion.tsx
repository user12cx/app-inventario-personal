import { View, Text, TouchableOpacity, Alert, BackHandler } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";

const Cerra_Sesion = () => {
    // Función para cerrar sesión
    const handleCerrarSesion = async () => {
        Alert.alert(
            "Cerrar Sesión",
            "Se cerraran la App y Sesion ¿Si?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Si",
                    onPress: async () => {
                        // Borrar los datos del AsyncStorage
                        await AsyncStorage.removeItem("usuario_id");
                        await AsyncStorage.removeItem("termsAccepte");
                        // sale de la app y cierra Sesion
                        BackHandler.exitApp();
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View className="bg-white dark:bg-slate-800 p-4 mt-4 rounded-lg shadow mx-4">
            <TouchableOpacity
                onPress={handleCerrarSesion}
                className="flex-row items-center justify-between"
            >
                <Text className="text-blue-500 dark:text-blue-300 text-sm">Cerrar Sesión</Text>
                <AntDesign
                    name={"export2"}
                    size={14}
                    color="#3B82F6" // Azul similar a text-blue-500
                />
            </TouchableOpacity>
        </View>

    );
};

export default Cerra_Sesion;
