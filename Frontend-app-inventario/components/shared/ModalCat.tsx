import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { gestionarCategoria } from '@/service/categoriaService';

const ModalCat = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('Ingreso');
  const [message, setMessage] = useState('');
  const [usuarioId] = useState(2);

  const openModal = () => bottomSheetModalRef.current?.present();
  const closeModal = () => bottomSheetModalRef.current?.dismiss();

  const handleAddCategory = async () => {
    try {
      const result = await gestionarCategoria(1, usuarioId, null, nombre, tipo);
      if (result.success) {
        setMessage('Categoría agregada con éxito.');
        setTimeout(() => {
          closeModal();
          setMessage('');
          setNombre('');
          setTipo('Ingreso');
        }, 2000);
      } else {
        setMessage(result.error || 'Error al agregar la categoría');
      }
    } catch (error) {
      setMessage('Error al agregar la categoría');
    }
  };

  return (
    <>
      {/* Botón flotante */}
      <TouchableOpacity
        className="bg-blue-500 w-14 h-14 rounded-full flex items-center justify-center absolute bottom-10 right-10 z-10"
        onPress={openModal}
      >
        <Text className="text-white text-4xl">+</Text>
      </TouchableOpacity>

      {/* Modal como hoja inferior */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={['50%']}
        backgroundStyle={{ borderRadius: 20 }}
      >
        <View className="px-6 py-4">
          <Text className="text-lg font-bold mb-2 text-gray-500">Agregar Categoría</Text>

          <TextInput
            className="border-b mb-4 text-xl"
            value={nombre}
            onChangeText={setNombre}
            placeholder="Nombre de la categoría"
          />

          <Text className="text-lg font-bold mb-2 text-gray-500">Tipo</Text>

          <TextInput
            className="border-b mb-4 text-xl"
            value={tipo}
            onChangeText={setTipo}
            placeholder="Tipo (Ingreso o Gasto)"
          />

          <TouchableOpacity className="bg-cyan-500 px-4 py-3 rounded" onPress={handleAddCategory}>
            <Text className="text-white text-center">Guardar</Text>
          </TouchableOpacity>

          {message !== '' && (
            <Text className="text-center mt-4 text-lg text-green-500">{message}</Text>
          )}
        </View>
      </BottomSheetModal>
    </>
  );
};

export default ModalCat;
