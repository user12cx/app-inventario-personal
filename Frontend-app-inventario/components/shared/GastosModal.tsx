import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Select } from "../select";
import { useHookCategorias } from "@/hook/usehookCategorias";
import { usehookCuentas } from "@/hook/usehookCuentas";
import FlashMessage from "react-native-flash-message";
import mostrarMensaje from "@/alert/Mesage";
import { RadioButton } from "react-native-paper";
import DateInput from "./DateInput";
import { usehookTransacciones } from "@/hook/usehookTransacciones";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NuevaTransaccion } from "@/service/transaccionesService";

const GastosModal = () => {
  const [nombreGasto, setNombreGasto] = useState("");
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tipoPago, setTipoPago] = useState("");
  const [tipoTransaccion, settipoTransaccion] = useState("gasto");
  const [fecha, setFecha] = useState(new Date());
  const [usarFechaActual, setUsarFechaActual] = useState(true);

  const { categorias, loading: loadingCategorias } = useHookCategorias();
  const { datos: cuentas, loading: loadingCuentas } = usehookCuentas();
  const { agregarTransaccion, loadingAdd } = usehookTransacciones();

  if (loadingCategorias || loadingCuentas || loadingAdd) {
    return <Text>Cargando datos...</Text>;
  }

  const agregarGasto = async () => {
    if (!nombreGasto || !monto || !categoria || !tipoPago) {
      mostrarMensaje("Todos los campos son obligatorios", "danger", 'rgba(255, 186, 186, 1)', '#D8000C', 500);
      return;
    }

    const montoFloat = parseFloat(monto);
    if (isNaN(montoFloat) || montoFloat <= 0) {
      mostrarMensaje("El monto debe ser mayor a 1", "danger", 'rgba(255, 186, 186, 1)', '#D8000C', 600);
      return;
    }

    try {
      const usuario_id = await AsyncStorage.getItem("usuario_id");

      if (!usuario_id) {
        mostrarMensaje("No se encontró el ID del usuario", "danger", 'rgba(255, 186, 186, 1)', '#D8000C', 500);
        return;
      }

      const transaccion: NuevaTransaccion = {
        descripcion: nombreGasto,
        categoria_id: parseInt(categoria),
        monto: montoFloat,
        tipo_id: tipoTransaccion === "gasto" ? 1 : 2,
        cuenta_id: parseInt(tipoPago),
        fecha: (usarFechaActual ? new Date() : fecha).toISOString().slice(0, 19),
        usuario_id: parseInt(usuario_id),
      };

      const fueExitosa = await agregarTransaccion(transaccion);

      if (fueExitosa) {
        mostrarMensaje("Agregado correctamente", "success", '#A5D6A7', '#2C6B2F', 500);
        setNombreGasto("");
        setMonto("");
        setCategoria("");
        setTipoPago("");
        setUsarFechaActual(true);
        setFecha(new Date());
      } else {
        mostrarMensaje("Error al agregar transacción", "danger", 'rgba(255, 186, 186, 1)', '#D8000C', 500);
      }

    } catch (error) {
      mostrarMensaje("Error inesperado", "danger", 'rgba(255, 186, 186, 1)', '#D8000C', 500);
    }
  };

  const CancelarAccion = () => {
    setNombreGasto("");
    setMonto("");
    setCategoria("");
    setTipoPago("");
    setUsarFechaActual(true);
    setFecha(new Date());
  };

  return (
    <ScrollView className="flex-1 p-4">
      <View className="mt-4 mb-2">
        <Text className="text-xl text-gray-500 font-bold mb-4">Tipo de Transacción</Text>
        <RadioButton.Group onValueChange={newValue => settipoTransaccion(newValue)} value={tipoTransaccion}>
          <View className="flex-row gap-10">
            <View className="flex-row items-center">
              <RadioButton value="gasto" />
              <Text>Ingreso</Text>
            </View>
            <View className="flex-row items-center">
              <RadioButton value="ingreso" />
              <Text>Gasto</Text>
            </View>
          </View>
        </RadioButton.Group>
      </View>

      <View>
        <Text className="text-xl text-gray-500 font-bold mb-4">Nombre del Gasto o Ingreso</Text>
        <TextInput
          className="bg-white p-4 px-4 border border-gray-200 rounded-lg"
          placeholder="Ej. Cena en restaurante"
          value={nombreGasto}
          onChangeText={setNombreGasto}
        />
      </View>

      <View style={{ marginTop: 13 }}>
        <Text className="text-xl text-gray-500 font-bold">Monto</Text>
      </View>
      <View style={{ marginTop: 13 }}>
        <TextInput
          className="bg-white p-4 px-4 border border-gray-200 rounded-lg"
          placeholder="$0.00"
          keyboardType="numeric"
          value={monto}
          onChangeText={setMonto}
        />
      </View>

      <DateInput
        fecha={fecha}
        setFecha={setFecha}
        usarFechaActual={usarFechaActual}
        setUsarFechaActual={setUsarFechaActual}
      />

      <View style={{ marginTop: 13 }}>
        <Text className="text-xl text-gray-500 font-bold mb-4">Categoría</Text>
        <Select
          items={categorias.map((cat) => ({ label: cat.nombre, value: cat.idCategoria }))}
          value={categoria}
          onValueChange={setCategoria}
        />
      </View>

      <View style={{ marginTop: 13 }}>
        <Text className="text-xl text-gray-500 font-bold mb-4">Tipo de Pago</Text>
        <Select
          items={cuentas.map((cuenta) => ({ label: cuenta.nombre, value: cuenta.idCuenta }))}
          value={tipoPago}
          onValueChange={setTipoPago}
        />
      </View>

      <TouchableOpacity
        onPress={agregarGasto}
        style={{ backgroundColor: "#5A8FCA", padding: 13, marginTop: 30, borderRadius: 5 }}
      >
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: 17 }}>
          Agregar gasto
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={CancelarAccion}
        style={{ backgroundColor: "gray", padding: 13, marginTop: 20, borderRadius: 5 }}
      >
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: 17 }}>
          Cancelar Acción
        </Text>
      </TouchableOpacity>

      <FlashMessage position="top" />
    </ScrollView>
  );
};

export default GastosModal;
