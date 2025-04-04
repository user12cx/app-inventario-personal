import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { Select } from "../select";
import * as Print from "expo-print"; // Se cambió a expo-print

const GastosModal = () => {
    const [nombreGasto, setNombreGasto] = useState("");
    const [monto, setMonto] = useState("");
    const [categoria, setCategoria] = useState(null);
    const [tipoPago, setTipoPago] = useState(null);
    const [historialGastos, setHistorialGastos] = useState([]);

    const categorias = [
        { key: "Ropa", value: "Ropa", label: "Ropa" },
        { key: "Comida", value: "Comida", label: "Comida" },
        { key: "Viajes", value: "Viajes", label: "Viajes" },
        { key: "Tecnologia", value: "Tecnologia", label: "Tecnologia" },
        { key: "Salud", value: "Salud", label: "Salud" },
    ];

    const tiposPago = [
        { key: "Efectivo", value: "Efectivo", label: "Efectivo" },
        { key: "Tarjeta", value: "Tarjeta", label: "Tarjeta" },
        { key: "Transferencia", value: "Transferencia", label: "Transferencia" },
    ];

    // Función para imprimir historial de gastos con estilos
    const imprimirGastos = async () => {
        if (historialGastos.length === 0) {
            Alert.alert("Error", "No hay gastos para imprimir.");
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
            Alert.alert("Error", "Todos los campos son obligatorios.");
            return;
        }

        const montoFloat = parseFloat(monto);
        if (isNaN(montoFloat) || montoFloat <= 0) {
            Alert.alert("Error", "El monto debe ser un número válido mayor a 0.");
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
        setCategoria(null);
        setTipoPago(null);
    };

    // Función para eliminar un gasto
    const eliminarGasto = (id) => {
        setHistorialGastos(historialGastos.filter(gasto => gasto.id !== id));
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>Registar Gastos Pendiantes</Text>

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
                <Select items={categorias} value={categoria} onValueChange={setCategoria} />
            </View>

            <View style={{ marginTop: 10 }}>
                <Text className="text-lg font-semibold">Tipo de Pago</Text>
                <Select items={tiposPago} value={tipoPago} onValueChange={setTipoPago} />
            </View>


            <TouchableOpacity onPress={agregarGasto} style={{ backgroundColor: "blue", padding: 10, marginTop: 20, borderRadius: 5 }}>
                <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>+ Sumar gasto</Text>
            </TouchableOpacity>

            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 20 }}>Historial de Gastos</Text>
            {historialGastos.length === 0 ? (
                <Text style={{ textAlign: "center", marginTop: 10 }}>No hay gastos registrados.</Text>
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
                                <Text>${item.monto} - {item.categoria} ({item.tipoPago})</Text>
                            </View>
                            <TouchableOpacity onPress={() => eliminarGasto(item.id)}>
                                <Text style={{ color: "red" }}>❌ Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}

            <TouchableOpacity onPress={imprimirGastos} style={{ backgroundColor: "green", padding: 10, marginTop: 20, borderRadius: 5 }}>
                <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>🖨 Imprimir Gastos</Text>
            </TouchableOpacity>
        </View>
    );
};

export default GastosModal;
