import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Select } from "../select";
import { useHookCategorias } from "@/hook/usehookCategorias";
import { usehookCuentas } from "@/hook/usehookCuentas";
import FlashMessage, { showMessage } from "react-native-flash-message";
import mostrarMensaje from "@/alert/Mesage";
import { RadioButton } from "react-native-paper";
import DateInput from "./DateInput";
import { usehookTransacciones } from "@/hook/usehookTransacciones";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NuevaTransaccion } from "@/service/transaccionesService";
import { useTranslation } from "react-i18next";

const GastosModal = () => {
  const { t } = useTranslation();

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
    return <Text>{t("gastosModal.cargando")}</Text>;
  }


  const agregarGasto = async () => {
    if (!nombreGasto || !monto || !categoria || !tipoPago) {
      showMessage({
        message: t("gastosModal.todosObligatorios"),
        type: "danger",
        icon: "danger",
        duration: 500,
        floating: true,
        position: "top",
        backgroundColor: 'rgba(255, 186, 186, 1)', // fondo rosado suave
        color: '#D8000C',                           // texto rojo
        style: { borderRadius: 6, borderWidth: 1, borderColor: '#D8000C' },
      });
      return;
    }
  
    const montoFloat = parseFloat(monto);
    if (isNaN(montoFloat) || montoFloat <= 0) {
      showMessage({
        message: t("gastosModal.montoInvalido"),
        type: "danger",
        icon: "danger",
        duration: 600,
        floating: true,
        position: "top",
        backgroundColor: 'rgba(255, 186, 186, 1)',
        color: '#D8000C',
        style: { borderRadius: 6, borderWidth: 1, borderColor: '#D8000C' },
      });
      return;
    }
  
    try {
      const usuario_id = await AsyncStorage.getItem("usuario_id");
  
      if (!usuario_id) {
        showMessage({
          message: t("gastosModal.usuarioNoEncontrado"),
          type: "danger",
          icon: "danger",
          duration: 500,
          floating: true,
          position: "top",
          backgroundColor: 'rgba(255, 186, 186, 1)',
          color: '#D8000C',
          style: { borderRadius: 6, borderWidth: 1, borderColor: '#D8000C' },
        });
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
        showMessage({
          message: t("gastosModal.agregadoCorrectamente"),
          type: "info",
          icon: "info",
          duration: 1500,
          floating: true,
          position: "top",
          backgroundColor: '#AED7F7', // azul claro
          color: '#1565C0',            // azul oscuro
          style: { borderRadius: 6, borderWidth: 1, borderColor: '#1565C0' },
        });
        CancelarAccion(); // <- aquí cancelas después de mostrar el mensaje
      } else {
        showMessage({
          message: t("gastosModal.errorAgregar"),
          type: "danger",
          icon: "danger",
          duration: 500,
          floating: true,
          position: "top",
          backgroundColor: 'rgba(255, 186, 186, 1)',
          color: '#D8000C',
          style: { borderRadius: 6, borderWidth: 1, borderColor: '#D8000C' },
        });
      }
  
    } catch (error) {
      showMessage({
        message: t("gastosModal.errorInesperado"),
        type: "danger",
        icon: "danger",
        duration: 500,
        floating: true,
        position: "top",
        backgroundColor: 'rgba(255, 186, 186, 1)',
        color: '#D8000C',
        style: { borderRadius: 6, borderWidth: 1, borderColor: '#D8000C' },
      });
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
    <ScrollView className="flex-1 p-4 dark:bg-slate-900">

      <View className="mt-4 mb-2">
        <Text className="text-xl text-gray-500 font-bold mb-4 dark:text-white">{t("gastosModal.tipoTransaccion")}</Text>
        <RadioButton.Group onValueChange={newValue => settipoTransaccion(newValue)} value={tipoTransaccion}>
          <View className="flex-row gap-10">
            <View className="flex-row items-center">
              <RadioButton value="gasto" />
              <Text className="dark:text-white">{t("gastosModal.ingreso")}</Text>
            </View>
            <View className="flex-row items-center">
              <RadioButton value="ingreso" />
              <Text className="dark:text-white">{t("gastosModal.gasto")}</Text>
            </View>
          </View>
        </RadioButton.Group>
      </View>

      <View>
        <Text className="text-xl text-gray-500 font-bold mb-4 dark:text-white">{t("gastosModal.nombreGastoIngreso")}</Text>
        <TextInput
          className="bg-white p-4 px-4 border border-gray-200 rounded-lg dark:bg-slate-800 dark:text-white dark:border-gray-600"
          placeholder={t("gastosModal.nombrePlaceholder")}
          value={nombreGasto}
          onChangeText={setNombreGasto}
        />
      </View>

      <View style={{ marginTop: 13 }}>
        <Text className="text-xl text-gray-500 font-bold dark:text-white">{t("gastosModal.monto")}</Text>
      </View>
      <View style={{ marginTop: 13 }}>
        <TextInput
          className="bg-white p-4 px-4 border border-gray-200 rounded-lg dark:bg-slate-800 dark:text-white dark:border-gray-600"
          placeholder={t("gastosModal.montoPlaceholder")}
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
        <Text className="text-xl text-gray-500 font-bold mb-4 dark:text-white">{t("gastosModal.categoria")}</Text>
        <Select
          items={categorias.map((cat) => ({ label: cat.nombre, value: cat.idCategoria }))}
          value={categoria}
          onValueChange={setCategoria}
        />
      </View>

      <View style={{ marginTop: 13 }}>
        <Text className="text-xl text-gray-500 font-bold mb-4 dark:text-white">{t("gastosModal.tipoPago")}</Text>
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
          {t("gastosModal.agregarGasto")}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={CancelarAccion}
        style={{ backgroundColor: "gray", padding: 13, marginTop: 20, borderRadius: 5 }}
      >
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: 17 }}>
          {t("gastosModal.cancelarAccion")}
        </Text>
      </TouchableOpacity>

      <FlashMessage position="top" />
    </ScrollView>
  );
};

export default GastosModal;
