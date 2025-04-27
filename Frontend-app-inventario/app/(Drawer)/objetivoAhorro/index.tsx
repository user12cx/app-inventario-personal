import React, { useEffect, useState, useRef, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  useColorScheme
} from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import CustomAhorro from '@/components/shared/CustomAhorro';
import { getObjetivosAhorro } from '@/service/objetivoService'; // Asegúrate de tener esta función
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { AntDesign } from '@expo/vector-icons';
import { t } from 'i18next';
import { usehookCuentas } from '@/hook/usehookCuentas';
import { Select } from '@/components/select';
import { usehookobjetivo } from '@/hook/usehookobjetivo';
import DateInput from '@/components/shared/DateInput';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Objecttype {
  key: any;
  idObjetivo: number;
  id: number;
  usuario_id: number;
  nombre: string;
  monto_objetivo: number;
  monto_actual: number;
  fecha_limite: string
}

const ObjetivoAhorro = () => {

  const [datos, setdatos] = useState<Objecttype[]>([]);
  const [error, seterror] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  const [fecha, setFecha] = useState(new Date());
  const [usarFechaActual, setUsarFechaActual] = useState(true);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['60%'], []);
  const [showModal, setShowModal] = useState(false);
  const [tipoPago, setTipoPago] = useState("");
  const { datos: cuentas, loading: loadingCuentas } = usehookCuentas();

  const {
    objetivos,
    agregarObjetivo,
    eliminarObjetivo,
    editarObjetivo,
    loading: loadingObjetivos,
    error: errorObjetos
  } = usehookobjetivo();

  const [nombre, setNombre] = useState('');
  const [meta, setMeta] = useState('');
  const [montoActual, setMontoActual] = useState('');
  const [montoEstimado, setMontoEstimado] = useState('');

  const isDarkMode = useColorScheme() === "dark";

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getObjetivosAhorro();
      setdatos(response.result);
    } catch (error) {
      seterror(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleOpenSheet = () => {
    setShowModal(true);
    bottomSheetRef.current?.expand();
  };

  const handleCloseSheet = () => {
    setShowModal(false);
    bottomSheetRef.current?.close();
  };

  const handleGuardar = async () => {
    if (!nombre || !montoActual || !montoEstimado || !tipoPago) {
      showMessage({
        message: 'Completa todos los campos',
        type: 'warning',
        backgroundColor: '#FFF3CD',
        color: '#856404',
      });
      return;
    }

    try {
      const id = await AsyncStorage.getItem("usuario_id");
      if (!id) throw new Error("Usuario no autenticado");

      const usuario_id = parseInt(id);

      await agregarObjetivo({
        nombre,
        fecha_limite: usarFechaActual ? new Date().toISOString() : fecha.toISOString(),
        monto_actual: parseFloat(montoActual),
        monto_objetivo: parseFloat(montoEstimado),
        usuario_id,
        cuenta_id: parseInt(tipoPago),
      });

      showMessage({
        message: 'Objetivo agregado correctamente',
        type: 'success',
        backgroundColor: '#D4EDDA',
        color: '#155724',
      });

      // Limpiar y cerrar
      handleCloseSheet();
      setNombre('');
      setMontoActual('');
      setMontoEstimado('');
      setTipoPago('');
      setUsarFechaActual(true);
      setFecha(new Date());
      fetchData(); // Recargar datos
    } catch (err) {
      console.error(err);
      showMessage({
        message: 'Error al guardar objetivo',
        type: 'danger',
        backgroundColor: '#F8D7DA',
        color: '#721C24',
      });
    }
  };





  return (
    <>
      <ScrollView className="flex-1 dark:bg-slate-900">

        {showModal && (
          <TouchableWithoutFeedback onPress={handleCloseSheet}>
            <View style={{ flex: 1, position: 'absolute', zIndex: 10, top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.3)' }} />
          </TouchableWithoutFeedback>
        )}

        <View className="flex-row justify-between p-4 items-center">
          <Text className="text-xl font-semibold mb-4 dark:text-white">{t("titles.metas_dis")}</Text>
          <TouchableOpacity
            className="bg-[#5A8FCA] w-12 h-12 rounded-full flex items-center justify-center"
            onPress={handleOpenSheet}
          >
            <AntDesign name="addfile" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" className="mt-4" />
        ) : error ? (
          <Text className="text-red-500 text-center mt-4">Error al cargar objetivos</Text>
        ) : (
          datos.map((item) => (
            <CustomAhorro
              key={item.id}
              idObjetivo={item.idObjetivo}
              title={item.nombre}
              montoActual={item.monto_actual}
              meta={item.monto_objetivo}
              fechaLimite={item.fecha_limite ? new Date(item.fecha_limite).toLocaleDateString() : "Sin fecha"}
              onEliminar={eliminarObjetivo} // ✅ Se pasa aquí
            />
          ))
        )}
      </ScrollView>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={() => setShowModal(false)}
        backgroundStyle={{
          backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}


      >
        <BottomSheetView style={{ flex: 1 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
          >
            <ScrollView contentContainerStyle={{ padding: 16 }}>
              <Text className="text-lg font-bold mb-4 text-center dark:text-white">Nuevo Objetivo</Text>

              <TextInput
                placeholder="Nombre del objetivo"
                value={nombre}
                onChangeText={setNombre}
                className="border border-[#5A8FCA] rounded px-3 p-4 mb-3 dark:text-white"
              />

              <TextInput
                placeholder="Obtenido"
                value={montoActual}
                onChangeText={setMontoActual}
                keyboardType="numeric"
                className="border border-[#5A8FCA] rounded px-3 p-4 mb-3 dark:text-white"
              />
              <TextInput
                placeholder="Meta"
                value={montoEstimado}
                onChangeText={setMontoEstimado}
                keyboardType="numeric"
                className="border border-[#5A8FCA] rounded px-3 p-4 mb-3 dark:text-white"
              />
              <View className='p-2'>
                <DateInput
                  fecha={fecha}
                  setFecha={setFecha}
                  usarFechaActual={usarFechaActual}
                  setUsarFechaActual={setUsarFechaActual}
                />
              </View>


              <View className='border border-[#5A8FCA] rounded px-3  mb-3 dark:text-white'>
                <Select
                  placeholder={{ label: 'Cuenta a Enlazar', value: null }}
                  items={cuentas.map((cuenta) => ({ label: cuenta.nombre, value: cuenta.idCuenta }))}
                  value={tipoPago}
                  onValueChange={setTipoPago}
                />
              </View>

              <TouchableOpacity
                className="bg-[#5A8FCA] py-3 rounded items-center"
                onPress={handleGuardar}
              >
                <Text className="text-white font-bold">Guardar</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </BottomSheetView>
      </BottomSheet>

      <FlashMessage position="top" />
    </>
  );
};

export default ObjetivoAhorro;
