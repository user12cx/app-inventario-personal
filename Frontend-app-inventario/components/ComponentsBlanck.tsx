import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';

export const ComponentsBlanck = () => {
    return (
        <View>
            <Text>ComponentsBlanck</Text>
        </View>
    )
}

export const CartItemPlaceholder = () => {
    return (
        <TouchableOpacity
            disabled
            className="w-[170px] h-[105px] rounded-xl border border-gray-300 bg-gray-100 p-4 justify-between shadow dark:bg-slate-600"
        >
            <View className="flex-row justify-between items-center mb-1">
                <Text className=" text-lg font-bold dark:text-white">Ejemplo de Targeja</Text>
                <Ionicons name="card-outline" size={24} color="#b0b0b0" />
            </View>

            <Text className="text-gray-700 text-sm opacity-60">Sin datos aún</Text>
            <Text className="text-gray-700 text-xl font-semibold mt-1">S/ 0.00</Text>
        </TouchableOpacity>
    );
};

export const MetaFicticia = () => {
    const progresoFicticio = 0.4;

    return (
        <View className="p-4 rounded-lg shadow-md border border-gray-300 bg-gray-100 m-2d  dark:bg-slate-600">
            <Text className="text-2xl font-bold font-sans dark:text-white">Ejemplo: Vacaciones a rio de janeiro</Text>

            <View className="mt-2 flex-row justify-between gap-1">
                <Text className="text-gray-500 text-base font-sans">
                    OBTENIDO: <Text className="font-bold text-lime-400">$ 400</Text>
                </Text>
                <Text className="text-gray-500 text-base font-sans">
                    META: <Text className="font-bold text-red-400">$ 1000</Text>
                </Text>
                <Text className="text-gray-500 text-base font-sans">
                    LÍMITE: <Text className="font-bold">2025-12-31</Text>
                </Text>
            </View>

            <View className="mt-2">
                <ProgressBar progress={progresoFicticio} color="#EAB308" />
                <Text className="text-base mt-1 text-gray-300 font-medium">
                    <Text style={{ color: "#EAB308" }}>40% </Text> completado
                </Text>
            </View>

            <Text className="mt-4 text-gray-400 italic text-sm">
                Aún no has creado ninguna meta. Aquí tienes un ejemplo para inspirarte.
            </Text>
        </View>
    );
};

export const CategoriaFicticia = () => {
    return (
        <View className=" border border-gray-300 bg-gray-100 p-4 mb-2 flex-row items-center justify-between rounded-md dark:bg-slate-600">
            <View className="flex-1">
                <Text className="text-xl font-bold dark:text-black">Ejemplo: Comida </Text>
            </View>

            <View className="flex-row">
                <View className="bg-gray-300 px-3 py-1 rounded-lg mx-1">
                    <Text className="text-base">Editar</Text>
                </View>
                <View className="bg-gray-300 px-3 py-1 rounded-lg mx-1">
                    <Text className=" text-base">Eliminar</Text>
                </View>
            </View>
        </View>
    );
}

export const HistorialCompras = () => {
    return (
        <View className="flex-row items-center p-4 dark:border-gray-700">
            {/* Icono */}
            <View className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4 dark:bg-gray-700">
                <FontAwesome name="shopping-cart" size={20} color={ "#FF3B30" } />
            </View>

            {/* Información */}
            <View className="flex-1">
                <Text className="text-xl font-bold text-gray-800 dark:text-gray-300">Arroz con pollo</Text>
                <Text className="text-gray-500 text-base">
                    Comida| Gasto | 12/12/2023
                </Text>
            </View>

            {/* Monto con color dinámico */}
            <Text className={`text-lg font-bold py-1 px-3 rounded-2xl ${"text-red-500"}`}>
                S/.120
            </Text>
        </View>

    )
}