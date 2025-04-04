import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { ProgressBar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

// Definimos la interfaz para las props del componente
interface MetasItems {
    title: string;
    montoActual: number;
    meta: number;
    fechaLimite: string;
    onAportar?: () => void;
}

const CustomAhorro: React.FC<MetasItems> = ({ title, montoActual, meta, fechaLimite, onAportar }) => {
    const progress = Math.max(0, Math.min(1, montoActual / (meta || 1)));

    return (
        <LinearGradient 
            colors={['#D4E7FD', '#EDE7F6']} // Azul claro → Violeta claro
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 1 }}
            className="p-4 rounded-lg shadow-md border border-gray-200 m-2"
        >
            <Text className="text-xl font-semibold text-gray-800">{title}</Text>

            <View className='flex-row gap-3'>
                <View className='w-[350px]'>
                    {/* Datos de ahorro */}
                    <View className="mt-2 flex-row justify-between">
                        <Text className="text-gray-600 text-lg">DISPONIBLE: <Text className="font-bold text-lime-600">${montoActual}</Text></Text>
                        <Text className="text-gray-600 text-lg">META: <Text className="font-bold text-red-600">${meta}</Text></Text>
                        <Text className="text-gray-600 text-lg">FECHA LÍMITE: <Text className="font-bold text-violet-800">{fechaLimite}</Text></Text>
                    </View>

                    {/* Barra de progreso */}
                    <View className="mt-2">
                        {(() => {
                            let progressColor = "#EF4444"; // Rojo (Menos del 25%)
                            if (progress >= 0.75) progressColor = "#22C55E"; // Verde (75%-100%)
                            else if (progress >= 0.5) progressColor = "#3B82F6"; // Azul (50%-74%)
                            else if (progress >= 0.25) progressColor = "#EAB308"; // Amarillo (25%-49%)

                            return (
                                <>
                                    <ProgressBar progress={progress} color={progressColor} className="h-2 rounded-full" />
                                    <Text className="text-base mt-1 text-gray-700 font-medium">
                                        <Text style={{ color: progressColor }}>{(progress * 100).toFixed()}%</Text> completado
                                    </Text>
                                </>
                            );
                        })()}
                    </View>
                </View>

                {/* Botones */}
                <View className='absolute top-[-28px] right-[-3]'>
                    <TouchableOpacity
                        className="mt-2 bg-green-100 w-[40px] h-[40px] items-center justify-center rounded-full"
                        onPress={onAportar}
                    >
                        <Text className="text-center text-2xl">➕</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="mt-2 bg-red-100 w-[40px] h-[40px] items-center justify-center rounded-full"
                        onPress={onAportar}
                    >
                        <Text className="text-center text-2xl">🗑</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    );
};

export default CustomAhorro;
