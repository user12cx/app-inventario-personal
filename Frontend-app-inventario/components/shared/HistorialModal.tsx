import { getPaginatedTransactions, OrdenItem } from "@/service/transaccionesService";
import { FontAwesome, Ionicons, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, Modal, TouchableOpacity, ActivityIndicator, FlatList } from "react-native";
import * as Print from "expo-print"; // Importar expo-print
import { t } from "i18next";

interface HistorialModalProps {
    visible: boolean;
    onClose: () => void;
    usuario_id: string;
}

const HistorialModal: React.FC<HistorialModalProps> = ({ visible, onClose, usuario_id }) => {
    const [transacciones, setTransacciones] = useState<OrdenItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (visible) {
            console.log("📌 Modal visible, cargando transacciones...");
            fetchTransacciones();
        }
    }, [visible]);

    const fetchTransacciones = async () => {
        try {
            setLoading(true);
            const usuario_id = await AsyncStorage.getItem("usuario_id");

            if (!usuario_id) {
                throw new Error("No se encontró usuario_id en AsyncStorage.");
            }

            console.log("🔍 Buscando transacciones para usuario_id:", usuario_id);

            const response = await getPaginatedTransactions(parseInt(usuario_id, 10));
            console.log("✅ Datos recibidos de la API:", response);

            setTransacciones(response);
        } catch (error) {
            console.error("❌ Error al obtener transacciones:", error);
        } finally {
            setLoading(false);
        }
    };

    // Función para generar e imprimir el PDF
    const handlePrint = async () => {
        const tableRows = transacciones.map(transaccion => `
            <tr class="odd">
                <td>${transaccion.descripcion}</td>
                <td>S/. ${transaccion.monto}</td>
                <td>${transaccion.categoria}</td>
                <td>${transaccion.tipo}</td>
                <td>${new Date(transaccion.fecha).toLocaleDateString()}</td>

            </tr>
        `).join("");

        const htmlContent = `
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                    }
                    h2 {
                        text-align: center;
                        color: #333;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                    }
                    th, td {
                        border: 1px solid #000;
                        text-align: left;
                        padding: 8px;
                    }
                    th {
                        background-color: #75b2dd;
                        color: white;
                        text-align: center;
                    }
                    tr.odd {
                        background-color: #fff;
                    }
                </style>
            </head>
            <body>
                <h2>Historial de Gastos</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Monto</th>
                            <th>Categoría</th>
                            <th>Tipo de Pago</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            </body>
            </html>
        `;

        await Print.printAsync({ html: htmlContent });
    };

    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View className="flex-1 bg-white dark:bg-slate-900">
                {/* Encabezado con botón de cierre y botón de impresión */}
                <View className="bg-[#5A8FCA] h-[60px] flex-row p-5 justify-between items-center">
                    <TouchableOpacity onPress={onClose} className="flex-row gap-3">
                        <Ionicons name="close" size={24} color="white" />
                        <Text className="text-white text-2xl font-semibold">{t("titles.close")}</Text>
                    </TouchableOpacity>

                    {/* Botón para imprimir */}
                    <TouchableOpacity onPress={handlePrint} className="flex-row items-center gap-2">
                        <Feather name="printer" size={24} color="white" />
                        <Text className="text-white text-lg font-semibold">{t("titles.imprimir")}</Text>
                    </TouchableOpacity>
                </View>

                {/* Título */}
                <View className="p-5">
                    <Text className="text-[#5A8FCA] text-2xl font-bold text-center">{t("titles.history")}</Text>
                </View>

                {/* Cargando */}
                {loading ? (
                    <ActivityIndicator size="large" color="#5A8FCA" className="mt-10" />
                ) : transacciones.length === 0 ? (
                    <View className="items-center justify-center mt-10 px-4">
                        <Text className="text-lg dark:text-white text-center">
                           No hay Transacciones aun
                        </Text>
                    </View>) : (
                    <FlatList
                        data={transacciones}
                        keyExtractor={(item) => item.idTransaccion.toString()}
                        renderItem={({ item }) => (
                            <View className="flex-row items-center p-4 dark:border-gray-700">
                                {/* Icono */}
                                <View className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4 dark:bg-gray-700">
                                    <FontAwesome name="shopping-cart" size={20} color={item.tipo === "Gasto" ? "#FF3B30" : "#34D399"} />
                                </View>

                                {/* Información */}
                                <View className="flex-1">
                                    <Text className="text-xl font-bold text-gray-800 dark:text-gray-300">{item.descripcion}</Text>
                                    <Text className="text-gray-500 text-base">
                                        {item.categoria} | {item.tipo} | {new Date(item.fecha).toLocaleDateString()}
                                    </Text>
                                </View>

                                {/* Monto con color dinámico */}
                                <Text className={`text-lg font-bold py-1 px-3 rounded-2xl ${item.tipo === "Ingreso" ? "text-green-500" : "text-red-500"}`}>
                                    S/. {item.monto}
                                </Text>
                            </View>
                        )}
                    />
                )}
            </View>
        </Modal>
    );
};

export default HistorialModal;
