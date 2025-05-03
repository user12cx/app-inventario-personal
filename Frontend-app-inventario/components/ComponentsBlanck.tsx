import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
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
            className="w-[170px] h-[105px] rounded-xl border border-gray-300 bg-gray-100 p-4 justify-between shadow"
        >
            <View className="flex-row justify-between items-center mb-1">
                <Text className="text-gray-800 text-lg font-bold">Ejemplo de Targeja</Text>
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
        <View className="p-4 rounded-lg shadow-md border border-gray-300 bg-gray-100 m-2d  dark:to-black">
            <Text className="text-2xl font-bold font-sans text-gray-700">Ejemplo: Vacaciones a rio de janeiro</Text>

            <View className="mt-2 flex-row justify-between gap-1">
                <Text className="text-gray-300 text-base font-sans">
                    OBTENIDO: <Text className="font-bold text-lime-400">$ 400</Text>
                </Text>
                <Text className="text-gray-300 text-base font-sans">
                    META: <Text className="font-bold text-red-400">$ 1000</Text>
                </Text>
                <Text className="text-gray-300 text-base font-sans">
                    LÍMITE: <Text className="font-bold text-gray-100">2025-12-31</Text>
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
      <View className=" border border-gray-300 bg-gray-100 p-4 mb-2 flex-row items-center justify-between rounded-md">
        <View className="flex-1">
          <Text className="text-xl font-bold dark:text-white">Ejemplo: Comida </Text>
        </View>
  
        <View className="flex-row">
          <View className="bg-gray-500 px-3 py-1 rounded-lg mx-1">
            <Text className="text-base">Editar</Text>
          </View>
          <View className="bg-gray-500 px-3 py-1 rounded-lg mx-1">
            <Text className=" text-base">Eliminar</Text>
          </View>
        </View>
      </View>
    );
}