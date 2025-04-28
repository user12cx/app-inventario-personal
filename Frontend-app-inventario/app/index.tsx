import FlashMessage from 'react-native-flash-message';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/MainLayout';
import AuthProvider from '@/context/authContexto';
// import "../locales/i18n"; // Asegúrate de que la ruta sea correcta
import 'react-native-reanimated';
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";

const Index = () => {
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                // Verifica si el usuario y los términos están guardados
                const usuarioId = await AsyncStorage.getItem("usuario_id");
                const termsAccepted = await AsyncStorage.getItem("termsAccepte");

                if (usuarioId && termsAccepted === "true") {
                    // Si el usuario está logeado y aceptó los términos
                    router.push("/(Drawer)/Home"); // Redirige al Home
                } else {
                    // Si no está logeado o no ha aceptado los términos
                    router.push("/(Stack)/Login"); // Redirige al Login
                }
            } catch (error) {
                console.error("Error al verificar el estado de inicio de sesión", error);
                router.push("/(Stack)/Login"); // Si ocurre un error, redirige al Login
            } finally {
                setLoading(false); 
            }
        };

        checkLoginStatus(); // Llama a la función de verificación
    }, []);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#5A8FCA" />
            </View>
        );
    }

    return (
        <BottomSheetModalProvider>
            <AuthProvider>
                <MainLayout />
            </AuthProvider>
        </BottomSheetModalProvider>
    );
};

export default Index;
