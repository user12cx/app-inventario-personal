import React, { useRef, useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, Pressable, FlatList, KeyboardAvoidingView, ScrollView, Platform, RefreshControl, useColorScheme } from 'react-native';
import BottomSheet, { BottomSheetView, TouchableWithoutFeedback } from '@gorhom/bottom-sheet';
import { usehookCuentas } from '@/hook/usehookCuentas';
import { TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { t } from 'i18next';

const Index = () => {
  const isDarkMode = useColorScheme() === "dark";

  const [showModal, setShowModal] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [refreshingActive, setRefreshingActive] = useState(false);
  const { datos } = usehookCuentas();

  const [nombre, setNombre] = useState('');
  const [monto, setMonto] = useState('');
  const [estado, setEstado] = useState('');

  const snapPoints = useMemo(() => ['40%'], []);

  const handleOpenSheetCuentas = () => {
    setShowModal(true);
    bottomSheetRef.current?.expand();
  };

  const limpiarCampos=()=>{
    setEstado('')
    setNombre('')
    setMonto('')
  }

  const handleCloseModalCuentas = () => {
    setShowModal(false);
    bottomSheetRef.current?.close();
  };

  const handleRefresh = async () => {
    setRefreshingActive(true);
    // await usehookCuentas(); // Esto debería actualizar los datos.
    setRefreshingActive(false);
  };

  const handleGuardar = () => {
    // Aquí puedes enviar los datos al backend o hacer lo que necesites
    console.log({ nombre, monto, estado });
    handleCloseModalCuentas();
    limpiarCampos()
    showMessage({
      message:'Nueva Targeta Agregada Correctamente',
      type:'success',
      icon:'success',
      duration:500,
      floating:true,
      position:'top',
      backgroundColor: '#DFF2BF', // Fondo claro
      color: '#4F8A10', // Texto verde
      style: {
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#38761A', // Borde más oscuro (verde oscuro)
      },
    })
  };

  return (
    <>

      {/* Contenido principal */}
      <View className='flex-1  dark:bg-slate-900'>

        <View className="flex-row justify-between p-4 items-center">
          <Text className="text-xl font-bold mb-4  dark:text-white">{t("titles.tarjetas_dis")}</Text>
          <TouchableOpacity
            className="bg-[#5A8FCA] w-12 h-12 rounded-full flex items-center justify-center"
            onPress={handleOpenSheetCuentas}
          >
            <AntDesign name="addfile" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={Array.isArray(datos) ? datos : []}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={handleOpenSheetCuentas}
              className="p-4 mb-2 shadow-xl m-2 bg-gray-100  dark:bg-slate-800">

              <View className="flex-row justify-between">
                <Text className="text-xl dark:text-white">{item.nombre}</Text>
                <Text className="text-green-500 text-base">{`$ ${item.saldo}`}</Text>
              </View>
              <Text className="text-amber-500">{item.estado}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.idCuenta}
          refreshControl={
            <RefreshControl refreshing={refreshingActive} onRefresh={handleRefresh} />
          }

        />
      </View>


      {/* Modal con fondo oscuro simple */}
      {showModal && (
        <TouchableWithoutFeedback onPress={handleCloseModalCuentas}>
          <View style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10, backgroundColor: 'rgba(0, 0, 0, 0.3)' }} />
        </TouchableWithoutFeedback>
      )}

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={() => setShowModal(false)} // importante para que se quite el overlay
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
              <Text className="text-lg font-bold mb-4 text-center dark:text-white">Agregar Tarjeta</Text>

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
                <Text className="text-white font-bold">Guardar</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </BottomSheetView>
      </BottomSheet>

      {/* FlashMessage */}
      <FlashMessage position="top" />
    </>
  );
};

export default Index;
