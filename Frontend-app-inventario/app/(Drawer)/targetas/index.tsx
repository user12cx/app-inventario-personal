import React, { useRef, useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, Pressable, FlatList, KeyboardAvoidingView, ScrollView, Platform, RefreshControl } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { usehookCuentas } from '@/hook/usehookCuentas';
import { TextInput } from 'react-native';

const Index = () => {
  const [showModal, setShowModal] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [refreshingActive, setRefreshingActive] = useState(false);
  const { datos } = usehookCuentas();

  const [nombre, setNombre] = useState('');
  const [monto, setMonto] = useState('');
  const [estado, setEstado] = useState('');

  const snapPoints = useMemo(() => ['50%'], []);

  const handleOpenSheet = () => {
    setShowModal(true);
    bottomSheetRef.current?.expand();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    bottomSheetRef.current?.forceClose();
  };

  const handleRefresh = async () => {
    setRefreshingActive(true);
    // await usehookCuentas(); // Esto debería actualizar los datos.
    setRefreshingActive(false);
  };

  const handleGuardar = () => {
    // Aquí puedes enviar los datos al backend o hacer lo que necesites
    console.log({ nombre, monto, estado });
    handleCloseModal();
  };

  return (
    <>
      {/* Modal con fondo oscuro simple */}
      {showModal && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            // backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 10,
          }}
        >
          <Pressable className="flex-1 justify-center items-center" onPress={handleCloseModal} />
        </View>
      )}

      {/* Contenido principal */}
      <View className="flex-row justify-between p-4">
        <Text className="text-xl font-semibold mb-4">Tarjetas Disponibles</Text>
        <TouchableOpacity
          className="bg-[#5A8FCA] w-12 h-12 rounded-full flex items-center justify-center"
          onPress={handleOpenSheet}
        >
          <Text className="text-white text-4xl">+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={Array.isArray(datos) ? datos : []}
        renderItem={({ item }) => (
          <TouchableOpacity className="p-4 mb-2 shadow-xl m-4">
            <View className="flex-row justify-between">
              <Text className="text-xl">{item.nombre}</Text>
              <Text className="text-green-700 text-base">{`$ ${item.saldo}`}</Text>
            </View>
            <Text className="text-green-400">{item.estado}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.idCuenta}
        refreshControl={
          <RefreshControl refreshing={refreshingActive} onRefresh={handleRefresh} />
        }
      />

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={() => setShowModal(false)} // importante para que se quite el overlay
      >
        <BottomSheetView style={{ flex: 1 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
          >
            <ScrollView contentContainerStyle={{ padding: 16 }}>
              <Text className="text-lg font-bold mb-4 text-center">Agregar Tarjeta</Text>

              <TextInput
                placeholder="Nombre de la tarjeta"
                value={nombre}
                onChangeText={setNombre}
                className="border border-[#5A8FCA] rounded px-3 p-4 mb-3"
              />

              <TextInput
                placeholder="Monto"
                value={monto}
                onChangeText={setMonto}
                keyboardType="numeric"
                className="border border-[#5A8FCA] rounded px-3 p-4 mb-3"
              />

              <TextInput
                placeholder="Estado"
                value={estado}
                onChangeText={setEstado}
                className="border border-[#5A8FCA] rounded px-3 p-4 mb-4"
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
    </>
  );
};

export default Index;
