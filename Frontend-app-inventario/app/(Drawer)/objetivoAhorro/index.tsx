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

interface Objecttype {
  key: number;
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

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%'], []);
  const [showModal, setShowModal] = useState(false);

  const [nombre, setNombre] = useState('');
  const [meta, setMeta] = useState('');

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
    if (!nombre || !meta) {
      showMessage({
        message: 'Completa todos los campos',
        type: 'warning',
        backgroundColor: '#FFF3CD',
        color: '#856404',
      });
      return;
    }

    try {
      // await agregarObjetivoAhorro(nombre, parseFloat(meta)); // Ajusta según tu API
      showMessage({
        message: 'Objetivo agregado',
        type: 'success',
        backgroundColor: '#D4EDDA',
        color: '#155724',
      });
      handleCloseSheet();
      setNombre('');
      setMeta('');
      fetchData();
    } catch (err) {
      showMessage({
        message: 'Error al guardar',
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
          <Text className="text-xl font-semibold mb-4 dark:text-white">Metas Disponibles</Text>
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
              title={item.nombre}
              montoActual={item.monto_actual}
              meta={item.monto_objetivo}
              fechaLimite={item.fecha_limite ? new Date(item.fecha_limite).toLocaleDateString() : "Sin fecha"}
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
              <Text className="text-lg font-bold mb-4 text-center">Nuevo Objetivo</Text>

              <TextInput
                placeholder="Nombre del objetivo"
                value={nombre}
                onChangeText={setNombre}
                className="border border-[#5A8FCA] rounded px-3 p-4 mb-3"
              />

              <TextInput
                placeholder="Obtenido"
                value={meta}
                onChangeText={setMeta}
                keyboardType="numeric"
                className="border border-[#5A8FCA] rounded px-3 p-4 mb-3"
              />
              <TextInput
                placeholder="Meta"
                value={meta}
                onChangeText={setMeta}
                keyboardType="numeric"
                className="border border-[#5A8FCA] rounded px-3 p-4 mb-3"
              />
              <TextInput
                placeholder="Fecha"
                value={meta}
                onChangeText={setMeta}
                className="border border-[#5A8FCA] rounded px-3 p-4 mb-3"
              />

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
