import React, { useRef, useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, FlatList, KeyboardAvoidingView, ScrollView, Platform, RefreshControl, TextInput, useColorScheme } from 'react-native';
import BottomSheet, { BottomSheetView, TouchableWithoutFeedback } from '@gorhom/bottom-sheet';
import { usehookCuentas } from '@/hook/usehookCuentas';
import { AntDesign } from '@expo/vector-icons';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { t } from 'i18next';

const Index = () => {
  const isDarkMode = useColorScheme() === "dark";
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [showModal, setShowModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idCuentaSeleccionada, setIdCuentaSeleccionada] = useState<number | null>(null);
  const [refreshingActive, setRefreshingActive] = useState(false);
  const [nombre, setNombre] = useState('');
  const [monto, setMonto] = useState('');
  const [estado, setEstado] = useState('');
  const snapPoints = useMemo(() => ['40%'], []);

  const { datos, agregarCuenta, editarCuenta } = usehookCuentas();

  const limpiarCampos = () => {
    setNombre('');
    setMonto('');
    setEstado('');
  };

  const handleOpenSheetCuentas = (cuenta?: any) => {
    if (cuenta) {
      setModoEdicion(true);
      setIdCuentaSeleccionada(cuenta.idCuenta);
      setNombre(cuenta.nombre);
      setMonto(cuenta.saldo.toString());
      setEstado(cuenta.estado);
    } else {
      limpiarCampos();
      setModoEdicion(false);
      setIdCuentaSeleccionada(null);
    }

    setShowModal(true);
    bottomSheetRef.current?.expand();
  };

  const handleCloseModalCuentas = () => {
    setShowModal(false);
    bottomSheetRef.current?.close();
  };

  const handleRefresh = async () => {
    setRefreshingActive(true);
    // Aquí podrías actualizar datos si tu hook lo permite
    setRefreshingActive(false);
  };

  const handleGuardar = async () => {
    try {
      if (!nombre || !monto || !estado) {
        showMessage({
          message: "Todos los campos son obligatorios",
          type: "danger",
        });
        return;
      }

      if (modoEdicion && idCuentaSeleccionada !== null) {
        await editarCuenta(idCuentaSeleccionada, nombre, parseFloat(monto), estado);
        showMessage({ message: "Tarjeta actualizada correctamente", type: "success" });
      } else {
        await agregarCuenta(nombre, parseFloat(monto), estado);
        showMessage({ message: "Nueva tarjeta agregada correctamente", type: "success" });
      }

      handleCloseModalCuentas();
      limpiarCampos();
    } catch (error) {
      console.error(error);
      showMessage({ message: "Error al guardar", type: "danger" });
    }
  };

  return (
    <>
      <View className='flex-1 dark:bg-slate-900'>
        <View className="flex-row justify-between p-4 items-center">
          <Text className="text-xl font-bold mb-4 dark:text-white">{t("titles.tarjetas_dis")}</Text>
          <TouchableOpacity
            className="bg-[#5A8FCA] w-12 h-12 rounded-full flex items-center justify-center"
            onPress={() => handleOpenSheetCuentas()}
          >
            <AntDesign name="addfile" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={Array.isArray(datos) ? datos : []}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleOpenSheetCuentas(item)}
              className="p-4 mb-2 shadow-xl m-2 bg-gray-100 dark:bg-slate-800"
            >
              <View className="flex-row justify-between">
                <Text className="text-xl dark:text-white">{item.nombre}</Text>
                <Text className="text-green-500 text-base">{`$ ${item.saldo}`}</Text>
              </View>
              <Text className="text-amber-500">{item.estado}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.idCuenta.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshingActive} onRefresh={handleRefresh} />
          }
        />
      </View>

      {showModal && (
        <TouchableWithoutFeedback onPress={handleCloseModalCuentas}>
          <View style={{
            flex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.3)'
          }} />
        </TouchableWithoutFeedback>
      )}

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
              <Text className="text-lg font-bold mb-4 text-center dark:text-white">
                {modoEdicion ? "Editar Tarjeta" : "Agregar Tarjeta"}
              </Text>

              <TextInput
                placeholder="Nombre de la tarjeta"
                value={nombre}
                onChangeText={setNombre}
                className="border border-[#5A8FCA] rounded px-3 p-4 mb-3 dark:text-white"
              />

              <TextInput
                placeholder="Monto"
                value={monto}
                onChangeText={setMonto}
                keyboardType="numeric"
                className="border border-[#5A8FCA] rounded px-3 p-4 mb-3 dark:text-white"
              />

              <TextInput
                placeholder="Estado"
                value={estado}
                onChangeText={setEstado}
                className="border border-[#5A8FCA] rounded px-3 p-4 mb-4 dark:text-white"
              />

              <TouchableOpacity
                onPress={handleGuardar}
                className="bg-[#5A8FCA] py-3 rounded items-center"
              >
                <Text className="text-white font-bold">{modoEdicion ? "Actualizar" : "Guardar"}</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </BottomSheetView>
      </BottomSheet>

      <FlashMessage position="top" />
    </>
  );
};

export default Index;
