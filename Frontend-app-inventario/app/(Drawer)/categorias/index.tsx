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

  const handleOpenSheet = () => {
    setShowModal(true);
    bottomSheetRef.current?.expand();
  };

  const handleCloseSheet = () => {
    setShowModal(false);
    bottomSheetRef.current?.close();
  };



  const handleGuardar = async () => {
    const result = await agregarCategoria(nombre); // Esperamos la respuesta
    if (result.success) {
      showMessage({
        message: result.message || 'Categoría agregada con éxito.',
        type: 'success',
        icon: 'success',
        duration: 500,
        floating: true,
        position: 'top',
        backgroundColor: '#DFF2BF',
        color: '#4F8A10',
        style: { borderRadius: 6, borderWidth: 1, borderColor: '#38761A' },
      });
      setNombre('')
      handleCloseSheet()
    } else {
      showMessage({
        message: result.error || 'Error al agregar la categoría.',
        type: 'danger',
        icon: 'info',
        duration: 800,
        floating: true,
        position: 'top',
        backgroundColor: '#FFBABA',
        color: '#D8000C',
        style: { borderRadius: 6 },
      });
    }
    
  };
  
  const handleEliminarCategoria = async (categoriaId: number) => {
    const result = await eliminarCategoria(categoriaId);
    if (result.success) {
      showMessage({
        message: result.message || 'Categoría eliminada con éxito.',
        type: 'success',
        icon: 'success',
        duration: 500,
        floating: true,
        position: 'top',
        backgroundColor: '#DFF2BF',
        color: '#4F8A10',
        style: { borderRadius: 6, borderWidth: 1, borderColor: '#38761A' },
      });
    } else {
      showMessage({
        message: result.error || 'Error al eliminar la categoría.',
        type: 'danger',
        icon: 'info',
        duration: 800,
        floating: true,
        position: 'top',
        backgroundColor: '#FFBABA',
        color: '#D8000C',
        style: { borderRadius: 6 },
      });
    }
  };
  
  return (
    <>
      <ScrollView
        className="flex-1 p-4"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#5A8FCA" />
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
                className="border border-[#5A8FCA] rounded-lg px-3 p-4 mb-3"
              />

              <TouchableOpacity
                className="bg-[#5A8FCA] py-3 rounded-lg items-center mt-6"
                onPress={handleGuardar}
              >
                <Text className="text-white font-bold text-lg">Guardar</Text>
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
