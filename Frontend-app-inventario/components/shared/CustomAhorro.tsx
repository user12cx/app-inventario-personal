import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { ProgressBar } from 'react-native-paper';
import { AntDesign, Feather } from '@expo/vector-icons';

interface MetasItems {
    title: string;
    montoActual: number;
    meta: number;
    fechaLimite: string;
    onAportar?: () => void;
}

const CustomAhorro: React.FC<MetasItems> = ({ title, montoActual, meta, fechaLimite, onAportar }) => {
    const progress = Math.max(0, Math.min(1, montoActual / (meta || 1)));
    const [mostrarInput, setMostrarInput] = useState(false);
    const [texto, setTexto] = useState('');

    const handleAceptar = () => {
        // Aquí puedes hacer algo con el valor de `texto`, por ejemplo:
        console.log("Valor aportado:", texto);
        setMostrarInput(false);
        setTexto('');
        // También podrías llamar a `onAportar` si aplica
    };

    const handleCancelar = () => {
        setMostrarInput(false);
        setTexto('');
    };

    return (
        <View className="p-4 rounded-lg shadow-md border border-gray-200 m-2 bg-white dark:bg-slate-800 dark:border-gray-600">
            <Text className="text-2xl font-bold font-sans text-[#5A8FCA]">{title}</Text>

            <View className='flex-row gap-3'>
                <View className='w-[350px]'>
                    <View className="mt-2 flex-row justify-between gap-1">
                        <Text className="text-gray-600 text-base font-sans dark:text-gray-400">OBTENIDO: <Text className="font-bold font-sans text-lime-600">$ {montoActual}</Text></Text>
                        <Text className="text-gray-600 text-base font-sans dark:text-gray-400">META: <Text className="font-bold font-sans text-red-600">$ {meta}</Text></Text>
                        <Text className="text-gray-600 text-base font-sans dark:text-gray-400">LÍMITE: <Text className="font-bold font-sans text-gray-800">{fechaLimite}</Text></Text>
                    </View>

                    <View className="mt-2">
                        {(() => {
                            let progressColor = "#EF4444";
                            if (progress >= 0.75) progressColor = "#22C55E";
                            else if (progress >= 0.5) progressColor = "#3B82F6";
                            else if (progress >= 0.25) progressColor = "#EAB308";

                            return (
                                <>
                                    <ProgressBar progress={progress} color={progressColor} />
                                    <Text className="text-base mt-1 text-gray-700 font-medium">
                                        <Text style={{ color: progressColor }}>{(progress * 100).toFixed()} % </Text> completado
                                    </Text>
                                </>
                            );
                        })()}
                    </View>

                    <View >
                        {mostrarInput && (
                            <View className="gap-4 flex-row mb-2 mt-4">
                                <TextInput
                                    placeholder="Escribe aquí..."
                                    value={texto}
                                    onChangeText={setTexto}
                                    className="border border-[#5A8FCA] rounded px-2 py-1 w-[220px] dark:bg-slate-800 dark:text-white"
                                    keyboardType="numeric"
                                />

                                <TouchableOpacity
                                    onPress={handleAceptar}
                                    className="bg-green-200 p-2 rounded-full"
                                >
                                    <Feather name="check" size={20} color="green" />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={handleCancelar}
                                    className="bg-gray-200 p-2 rounded-full"
                                >
                                    <Feather name="x" size={20} color="black" />
                                </TouchableOpacity>

                            </View>
                        )}
                    </View>

                </View>


                <View className='absolute top-[-28px] right-[-3]'>
                    <TouchableOpacity
                        className="mt-2 bg-green-100 w-[40px] h-[40px] items-center justify-center rounded-full"
                        onPress={() => setMostrarInput(true)}
                    >
                        <AntDesign name="pluscircleo" size={20} color="green" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="mt-2 bg-red-100 w-[40px] h-[40px] items-center justify-center rounded-full"
                        onPress={onAportar}
                    >
                        <AntDesign name="delete" size={20} color="red" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default CustomAhorro;
