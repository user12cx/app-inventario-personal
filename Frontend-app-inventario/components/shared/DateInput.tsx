import React, { useState } from "react";
import { View, Text, Switch, TextInput, Platform, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DateInput = ({ fecha, setFecha, usarFechaActual, setUsarFechaActual }) => {
    const [mostrarSelectorFecha, setMostrarSelectorFecha] = useState(false);

    const manejarCambioFecha = (event, selectedDate) => {
        setMostrarSelectorFecha(false);
        if (selectedDate) {
            setFecha(selectedDate);
        }
    };

    return (
        <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <Text className="text-xl text-gray-500 font-bold dark:text-white">Usar Fecha Actual</Text>
                <Switch value={usarFechaActual} onValueChange={setUsarFechaActual} />
            </View>

            <TouchableOpacity
                onPress={() => {
                    if (!usarFechaActual) setMostrarSelectorFecha(true);
                }}
                activeOpacity={usarFechaActual ? 1 : 0.7}
            >
                <TextInput
                    editable={false}
                    value={fecha.toLocaleDateString()}
                    className="bg-white p-4 border border-gray-200 rounded-lg text-gray-700 dark:bg-slate-800 dark:text-white dark:border-gray-600"
                    style={{ color: usarFechaActual ? "#ccc" : "#000" }}
                    placeholder="Selecciona una fecha"
                />
            </TouchableOpacity>

            {mostrarSelectorFecha && (
                <DateTimePicker
                    value={fecha}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={manejarCambioFecha}
                />
            )}
        </View>
    );
};

export default DateInput;
