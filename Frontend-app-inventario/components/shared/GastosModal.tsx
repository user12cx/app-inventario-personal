import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { Select } from "../select";
import * as Print from "expo-print"; // Se cambió a expo-print
import { AntDesign } from "@expo/vector-icons";
import { useHookCategorias } from "@/hook/usehookCategorias";
import { usehookCuentas } from "@/hook/usehookCuentas";
import FlashMessage, { showMessage } from "react-native-flash-message";
import mostrarMensaje from "@/alert/Mesage";
import SkeletonLoader from "@/squeletor/SkeletonLoader";

const GastosModal = () => {
    const [nombreGasto, setNombreGasto] = useState("");
    const [monto, setMonto] = useState("");
    const [categoria, setCategoria] = useState("");
    const [tipoPago, setTipoPago] = useState("");

    const [historialGastos, setHistorialGastos] = useState([]);

    const { categorias, loading: loadingCategorias } = useHookCategorias();
    const { datos: cuentas, loading: loadingCuentas } = usehookCuentas();


    if (loadingCategorias || loadingCuentas) {
        return <Text>Cargando categorías...</Text>; // o un spinner
    }



    // Función para imprimir historial de gastos con estilos
    const imprimirGastos = async () => {
        if (historialGastos.length === 0) {
            mostrarMensaje(
                "No hay gastos para imprimir",
                "danger", // Tipo de mensaje (advertencia o error)
                '#FFEBEE', // Fondo rojo muy claro (suave)
                '#D32F2F', // Color de texto rojo oscuro
                500 // Duración en ms
            );


            return;
        }

        const tableRows = historialGastos
            .map(
                ({ nombre, monto, categoria, tipoPago }, index) => `
                <tr class="${index % 2 === 0 ? "even" : "odd"}">
                    <td>${nombre}</td>
                    <td>$${monto}</td>
                    <td>${categoria}</td>
                    <td>${tipoPago}</td>
                </tr>
            `
            )
            .join("");

        const html = `
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
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
        </body>
        </html>
    `;

        try {
            await Print.printAsync({ html });
        } catch (error) {
            Alert.alert("Error", "No se pudo imprimir el historial.");
        }
    };

    // Función para agregar gasto al historial
    const agregarGasto = () => {
        if (!nombreGasto || !monto || !categoria || !tipoPago) {
            mostrarMensaje(
                "Todos los campos son obligatorios",
                "danger", // Tipo de mensaje
                'rgba(255, 186, 186, 1)', // Fondo semi-transparente
                '#D8000C', // Color de texto
                500 // Duración en ms
            );

            return;
        }

        const montoFloat = parseFloat(monto);
        if (isNaN(montoFloat) || montoFloat <= 0) {
            mostrarMensaje(
                "El monto debe ser mayor a 1",
                "danger", // Tipo de mensaje
                'rgba(255, 186, 186, 1)', // Fondo semi-transparente
                '#D8000C', // Color de texto
                600 // Duración en ms
            );
            return;
        }

        const nuevoGasto = {
            id: Date.now(),
            nombre: nombreGasto,
            monto: montoFloat.toFixed(2),
            categoria,
            tipoPago,
        };

        setHistorialGastos([...historialGastos, nuevoGasto]);
        setNombreGasto("");
        setMonto("");
        setCategoria("");
        setTipoPago("");

        mostrarMensaje(
            "Agregado Correctamente",
            "success", // Tipo de mensaje
            '#A5D6A7', // Fondo verde claro (sin opacidad)
            '#2C6B2F', // Color de texto verde oscuro
            500 // Duración en ms
        );


    };


    // Función para eliminar un gasto
    const eliminarGasto = (id) => {
        setHistorialGastos(historialGastos.filter(gasto => gasto.id !== id));
    };

    return (
        <View className="flex-1 p-4">

            <View className="flex-row justify-between items-center">
                <Text className="text-xl font-bold mb-4">Registar Gastos Pendiantes</Text>

                <TouchableOpacity onPress={imprimirGastos} className="bg-[#5A8FCA] w-12 h-12 rounded-full flex items-center justify-center">
                    <AntDesign name="printer" size={24} color="white" />
                </TouchableOpacity>

            </View>

            <View>
                <Text className="text-lg font-semibold">Nombre del Gasto</Text>
                <TextInput className="bg-white p-4 px-4 mt-1 border border-gray-200 rounded-lg"
                    placeholder="Ej. Cena en restaurante"
                    value={nombreGasto}
                    onChangeText={setNombreGasto}
                />
            </View>

            <View style={{ marginTop: 10 }}>
                <Text className="text-lg font-semibold">Monto</Text></View>
            <View style={{ marginTop: 10 }}>
                <TextInput className="bg-white p-4 px-4 border border-gray-200 rounded-lg"
                    placeholder="$0.00"
                    keyboardType="numeric"
                    value={monto}
                    onChangeText={setMonto}
                />
            </View>

            <View style={{ marginTop: 10 }}>
                <Text className="text-lg font-semibold">Categoría</Text>
                <Select
                    items={categorias.map((cat) => ({
                        label: cat.nombre,     // ajusta al campo real
                        value: cat.idCategoria // ajusta al campo real
                    }))}
                    value={categoria}
                    onValueChange={setCategoria}
                />
            </View>

            <View style={{ marginTop: 10 }}>
                <Text className="text-lg font-semibold">Tipo de Pago</Text>
                <Select
                    items={cuentas.map((cuenta) => ({
                        label: cuenta.nombre,       // ajusta a tus datos reales
                        value: cuenta.idCuenta,     // ajusta a tus datos reales
                    }))}
                    value={cuentas}
                    onValueChange={setTipoPago}
                />
            </View>


            <TouchableOpacity onPress={agregarGasto} style={{ backgroundColor: "#5A8FCA", padding: 10, marginTop: 20, borderRadius: 5 }}>
                <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Agregar gasto</Text>
            </TouchableOpacity>

            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 20 }}>Historial de Gastos Diarios</Text>
            {historialGastos.length === 0 ? (
                <SkeletonLoader /> 
            )
                :
                (
                    <FlatList
                        data={historialGastos}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                padding: 10,
                                backgroundColor: "#f9f9f9",
                                marginTop: 5,
                                borderRadius: 5
                            }}>
                                <View>
                                    <Text style={{ fontWeight: "bold" }}>{item.nombre}</Text>
                                    <Text>${item.monto} - {item.categorias} ({item.cuentas})</Text>
                                </View>
                                <TouchableOpacity onPress={() => eliminarGasto(item.id)}>
                                    <AntDesign name="delete" size={24} color="red" />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                )}

            {/* tu navegación o contenido principal */}
            <FlashMessage position="top" />
        </View>
    );
};

export default GastosModal;
