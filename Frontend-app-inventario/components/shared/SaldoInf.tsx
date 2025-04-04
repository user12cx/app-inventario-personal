import { View, Text, TextInput, TouchableOpacity, Alert, Modal } from 'react-native';
import React, { useState } from 'react';
import { LineChart } from 'react-native-chart-kit';

const SaldoInf = () => {
    const [saldoActual, setSaldoActual] = useState(0);
    const [saldoAgregar, setSaldoAgregar] = useState('');
    const [saldoMes, setSaldoMes] = useState(500);
    const [nuevoSaldoMes, setNuevoSaldoMes] = useState('');
    const [historialSaldos, setHistorialSaldos] = useState([200, 400, 600, 800, 1000]); // Datos ficticios
    const [modalVisible, setModalVisible] = useState(false);

    const agregarSaldo = () => {
        const nuevoSaldo = parseFloat(saldoAgregar);
        if (!isNaN(nuevoSaldo)) {
            Alert.alert(
                "Confirmar Ingreso",
                `Monto a ingresar: $${nuevoSaldo}\nTotal después del ingreso: $${saldoActual + nuevoSaldo}`,
                [
                    { text: "Cancelar", style: "cancel" },
                    {
                        text: "Aceptar",
                        onPress: () => {
                            setSaldoActual(saldoActual + nuevoSaldo);
                            setHistorialSaldos([...historialSaldos, saldoActual + nuevoSaldo]);
                            setSaldoAgregar('');
                        },
                    },
                ]
            );
        }
    };

    const actualizarSaldoMes = () => {
        const nuevoMontoMes = parseFloat(nuevoSaldoMes);
        if (!isNaN(nuevoMontoMes)) {
            setSaldoMes(saldoMes + nuevoMontoMes);
            setNuevoSaldoMes('');
            setModalVisible(false);
        }
    };

    return (
        <View className="flex-1 p-5 bg-gray-100">
            <View className="bg-white shadow-lg rounded-2xl p-6 mb-4">
                <Text className="text-xl font-bold text-gray-700">Saldo Actual:</Text>
                <Text className="text-2xl font-extrabold text-green-600">${saldoActual}</Text>
            </View>

            <View className="bg-white shadow-lg rounded-2xl p-6 mb-4">
                <Text className="text-xl font-bold text-gray-700">Saldo Destinado para este Mes:</Text>
                <Text className={`text-2xl font-extrabold ${saldoActual - saldoMes < 0 ? 'text-red-600' : 'text-blue-600'}`}>${saldoMes}</Text>
                <TouchableOpacity
                    className="bg-blue-500 mt-2 p-2 rounded-xl shadow-lg"
                    onPress={() => setModalVisible(true)}
                >
                    <Text className="text-white text-lg font-bold text-center">Actualizar Saldo Mensual</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                    <View className="bg-white p-6 rounded-2xl shadow-lg w-80">
                        <Text className="text-lg font-bold text-gray-700 mb-4">Ingrese el monto a agregar</Text>
                        <TextInput
                            className="bg-white shadow-md rounded-xl p-2 text-lg border border-gray-300"
                            placeholder="Monto"
                            keyboardType="numeric"
                            value={nuevoSaldoMes}
                            onChangeText={setNuevoSaldoMes}
                        />
                        <View className="flex-row justify-between mt-4">
                            <TouchableOpacity
                                className="bg-red-500 px-4 py-2 rounded-xl"
                                onPress={() => setModalVisible(false)}
                            >
                                <Text className="text-white font-bold">Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="bg-green-500 px-4 py-2 rounded-xl"
                                onPress={actualizarSaldoMes}
                            >
                                <Text className="text-white font-bold">Aceptar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <View className="bg-white shadow-lg rounded-2xl p-6 mb-4">
                <Text className="text-xl font-bold text-gray-700">Saldo Restante:</Text>
                <Text className={`text-2xl font-extrabold ${saldoActual - saldoMes < 0 ? 'text-red-600' : 'text-green-600'}`}>${saldoActual - saldoMes}</Text>
            </View>

            <TextInput
                className="bg-white shadow-md rounded-xl p-4 text-lg border border-gray-300"
                placeholder="Agregar Saldo"
                keyboardType="numeric"
                value={saldoAgregar}
                onChangeText={setSaldoAgregar}
            />

            <TouchableOpacity
                className="bg-green-500 mt-4 p-4 rounded-xl shadow-lg"
                onPress={agregarSaldo}
            >
                <Text className="text-white text-lg font-bold text-center">Agregar</Text>
            </TouchableOpacity>

            <View className="mt-6 bg-white shadow-lg rounded-2xl p-6">
                <Text className="text-xl font-bold text-gray-700 mb-4">Historial de Saldos</Text>
                <LineChart
                    data={{
                        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
                        datasets: [{ data: historialSaldos }],
                    }}
                    width={350}
                    height={200}
                    yAxisLabel="$"
                    chartConfig={{
                        backgroundGradientFrom: "#ffffff",
                        backgroundGradientTo: "#ffffff",
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                    bezier
                />
            </View>
        </View>
    );
};

export default SaldoInf;
