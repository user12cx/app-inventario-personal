import React, { useRef, useMemo, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, RefreshControl, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Alert } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import ListCategorias from '../../../components/shared/Table';
import { useHookCategorias } from '@/hook/usehookCategorias';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { AntDesign } from '@expo/vector-icons';

const Categorías = () => {
  const {
    categorias,
    loading,
    error,
    refreshing,
    eliminarCategoria,
    editarCategoria,
    agregarCategoria, // Traemos la función agregarCategoria del hook
    onRefresh,
    message, // Mensaje de éxito/error
  } = useHookCategorias();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%'], []);
  const [showModal, setShowModal] = useState(false);

  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('Ingreso');

  const handleOpenSheet = () => {
    setShowModal(true);
    bottomSheetRef.current?.expand();
  };

  const handleCloseSheet = () => {
    setShowModal(false);
    bottomSheetRef.current?.close();
  };

  const handleGuardar = () => {
    agregarCategoria(nombre, tipo); // Llamamos a la función para agregar la categoría
    setTimeout(() => {
      setNombre('');
      setTipo('Ingreso');
      handleCloseSheet();
    }, 1500);
  };

  const handleEliminarCategoria = (categoriaId: number) => {
    // Mostrar la alerta de confirmación
    Alert.alert(
      'Confirmar Eliminación',
      '¿Estás seguro de que deseas eliminar esta categoría?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              // Eliminar la categoría
              await eliminarCategoria(categoriaId);

              // Mostrar mensaje de éxito después de eliminar
              showMessage({
                message: 'Categoría eliminada con éxito.',
                type: 'success',
                icon: 'success',
                duration: 500,
                floating: true,
                position: 'top',
                backgroundColor: '#DFF2BF', // Fondo claro
                color: '#4F8A10', // Texto verde
                style: {
                  borderRadius: 6,
                  borderWidth: 1,
                  borderColor: '#38761A', // Borde más oscuro (verde oscuro)
                },
              });
            } catch (error) {
              // Si hay un error, muestra un mensaje de error
              showMessage({
                message: 'Error al eliminar la categoría.',
                type: 'danger',
                icon: 'auto',
                duration: 1000,
                floating: true,
                position: 'top',
                backgroundColor: '#FFBABA', // Fondo rojo
                color: '#D8000C', // Texto rojo
                style: { borderRadius: 6 },
              });
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <ScrollView
        className="flex-1 p-4"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text className="text-red-500 text-center mt-4">{`Error: ${error}`}</Text>
        ) : (
          <View>

            <View className="flex-row justify-between p-4 items-center">
              <Text className="text-xl font-bold mb-4">Categorías Disponibles</Text>
              {/* Botón flotante */}
              <TouchableOpacity
                className="bg-[#5A8FCA] w-12 h-12 rounded-full flex items-center justify-center"
                onPress={handleOpenSheet}
              >
                <AntDesign name="addfile" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <ListCategorias
              categorias={categorias}
              handleEliminar={handleEliminarCategoria} // Usamos el nuevo manejador
              handleEditar={editarCategoria}
            />
          </View>
        )}
      </ScrollView>

      {/* Fondo transparente que cierra el BottomSheet cuando se toca */}
      {showModal && (
        <TouchableWithoutFeedback onPress={handleCloseSheet}>
          <View style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.3)' }} />
        </TouchableWithoutFeedback>
      )}

      {/* BottomSheet Modal */}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={() => setShowModal(false)}
      >
        <BottomSheetView style={{ flex: 1 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
          >
            <ScrollView contentContainerStyle={{ padding: 16 }}>
              <Text className="text-lg font-bold mb-4 text-center">Agregar Categoría</Text>

              <TextInput
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
                className="border border-[#5A8FCA] rounded px-3 p-4 mb-3"
              />

              <TextInput
                placeholder="Tipo (Ingreso o Gasto)"
                value={tipo}
                onChangeText={setTipo}
                className="border border-[#5A8FCA] rounded px-3 p-4 mb-3"
              />

              <TouchableOpacity
                className="bg-[#5A8FCA] py-3 rounded items-center"
                onPress={handleGuardar}
              >
                <Text className="text-white font-bold">Guardar</Text>
              </TouchableOpacity>

              {message && (
                <Text className="text-center mt-4 text-green-500">{message}</Text>
              )}
            </ScrollView>
          </KeyboardAvoidingView>
        </BottomSheetView>
      </BottomSheet>

      {/* FlashMessage */}
      <FlashMessage position="top" />
    </>
  );
};

export default Categorías;
