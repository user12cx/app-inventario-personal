import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { ProgressBar } from 'react-native-paper';
import { AntDesign, Feather } from '@expo/vector-icons';
import { usehookobjetivo } from '@/hook/usehookobjetivo';
import { showMessage } from 'react-native-flash-message';
import { usehookCuentas } from '@/hook/usehookCuentas';
import { Select } from '../select';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface MetasItems {
    title: string;
    idObjetivo: number;
    montoActual: number;
    meta: number;
    fechaLimite: string;
    onEliminar?: (id: number) => void;
}

const CustomAhorro: React.FC<MetasItems> = ({ title, montoActual, meta, fechaLimite, idObjetivo, onEliminar }) => {
    const progress = Math.max(0, Math.min(1, montoActual / (meta || 1)));
    const [mostrarInput, setMostrarInput] = useState(false);
    const [texto, setTexto] = useState('');
    const [tipoPago, setTipoPago] = useState("");
    const [editando, setEditando] = useState(false); // <-- NUEVO estado para saber si estás editando

    const { eliminarObjetivo, editarObjetivo } = usehookobjetivo();
    const { datos: cuentas, loading: loadingCuentas } = usehookCuentas();

    const handleAceptar = async () => {
        const nuevoMonto = parseFloat(texto);

        if (!tipoPago) {
            showMessage({ message: "Selecciona una cuenta", type: "warning" });
            return;
        }

        if (isNaN(nuevoMonto)) {
            showMessage({ message: "Monto inválido", type: "danger" });
            return;
        }

        try {

            const usuarioIdString = await AsyncStorage.getItem('usuario_id');
            const usuario_id = usuarioIdString ? parseInt(usuarioIdString) : null;

            if (!usuario_id) {
                showMessage({ message: "Usuario no encontrado", type: "danger" });
                return;
            }

            if (editando) {
                await editarObjetivo(idObjetivo, {
                    nombre: title,
                    fecha_limite: fechaLimite,
                    monto_objetivo: meta,
                    monto_actual: nuevoMonto,
                    usuario_id,
                    cuenta_id: Number(tipoPago),
                });
                showMessage({ message: "Meta actualizada exitosamente", type: "success" });
            } else {
                console.log("Agregar dinero, lógica aún no implementada");
                // Aquí deberías hacer lógica para sumar dinero si quieres manejarlo distinto.
            }
        } catch (error) {
            console.error(error);
            showMessage({ message: "Error al actualizar", type: "danger" });
        } finally {
            setMostrarInput(false);
            setTexto('');
            setEditando(false);
            setTipoPago('');
        }
    };

    const handleCancelar = () => {
        setMostrarInput(false);
        setTexto('');
        setEditando(false);
        setTipoPago('');
    };

    const handleEliminar = () => {
        Alert.alert(
            "¿Eliminar meta?",
            "¿Estás seguro de que deseas eliminar esta meta de ahorro?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const response = await eliminarObjetivo(idObjetivo);
                            if (response.success) {
                                showMessage({ message: "Meta eliminada exitosamente", type: "success" });
                                onEliminar?.(idObjetivo);
                            } else {
                                showMessage({ message: response.message || "No se pudo eliminar la meta.", type: "danger" });
                            }
                        } catch (error) {
                            showMessage({ message: "Ocurrió un error al eliminar la meta.", type: "danger" });
                            console.error(error);
                        }
                    }
                }
            ]
        );
    };

    const handleEditar = () => {
        setMostrarInput(true);
        setEditando(true);
    };

    return (
        <View className="p-4 rounded-lg shadow-md border border-gray-200 m-2 bg-white dark:bg-slate-800 dark:border-gray-600">
            <Text className="text-2xl font-bold font-sans text-[#5A8FCA]">{title}</Text>

            <View className='flex-row gap-3'>
                <View className='w-[340px]'>
                    <View className="mt-2 flex-row justify-between gap-1">
                        <Text className="text-gray-600 text-base font-sans dark:text-gray-400">
                            OBTENIDO: <Text className="font-bold font-sans text-lime-600">$ {montoActual}</Text>
                        </Text>
                        <Text className="text-gray-600 text-base font-sans dark:text-gray-400">
                            META: <Text className="font-bold font-sans text-red-600">$ {meta}</Text>
                        </Text>
                        <Text className="text-gray-600 text-base font-sans dark:text-gray-400">
                            LÍMITE: <Text className="font-bold font-sans text-gray-500">{fechaLimite}</Text>
                        </Text>
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

                    {/* Mostrar input y select */}
                    {mostrarInput && (
                        <View className="gap-2 mb-2 mt-4">

                            <View className='flex-row gap-4'>
                                <TextInput
                                    placeholder="$ ..."
                                    value={texto}
                                    onChangeText={setTexto}
                                    className="border border-[#5A8FCA] rounded px-2 py-4 w-[140px] dark:bg-slate-800 dark:text-white"
                                    keyboardType="numeric"
                                />
                                <View className='border border-[#5A8FCA] rounded dark:bg-slate-800 dark:text-white w-[200px]'>
                                    <Select
                                        placeholder={{ label: 'Cuenta a Enlazar', value: null }}
                                        items={cuentas.map((cuenta) => ({ label: cuenta.nombre, value: cuenta.idCuenta }))}
                                        value={tipoPago}
                                        onValueChange={setTipoPago}
                                    />
                                </View>

                            </View>

                            <View className="flex-row justify-end gap-2 mt-4">
                                <TouchableOpacity
                                    onPress={handleAceptar}
                                    className="bg-green-200 p-2 rounded-md"
                                >
                                    <Text>Aseptar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={handleCancelar}
                                    className="bg-gray-200 p-2 rounded-md"
                                >
                                    <Text>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>

                {/* Botones de acción (Editar y Eliminar) */}
                <View className='absolute top-[-28px] right-[-3]'>
                    <TouchableOpacity
                        className="mt-2 bg-green-100 w-[40px] h-[40px] items-center justify-center rounded-full"
                        onPress={handleEditar}
                    >
                        <AntDesign name="edit" size={20} color="green" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="mt-2 bg-red-100 w-[40px] h-[40px] items-center justify-center rounded-full"
                        onPress={handleEliminar}
                    >
                        <AntDesign name="delete" size={20} color="red" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default CustomAhorro;
