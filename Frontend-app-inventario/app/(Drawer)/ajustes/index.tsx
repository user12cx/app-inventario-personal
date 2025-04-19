import { View, Text, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import AjuesteScrenn from '@/components/shared/PerfilAjustes';
import * as ImagePicker from "expo-image-picker";
import LanguageModal from '../../../components/shared/modalidioma';
import Cerra_Sesion from '@/components/shared/Cerrar_sesion';

const ajustes = () => {
  const [image, setImage] = useState("https://imgs.search.brave.com/AIhr-Sk0iRtUThA1TOMXlmagkXha3WVtDXLRr7FnIW8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/d2hhdC1kby15b3Ut/dGhpbmstb2YtbWVs/aW9kYXMtYXMtYS1j/aGFyYWN0ZXItdjAt/dng4MmUwd3NxYXFj/MS5qcGVnP3dpZHRo/PTY0MCZjcm9wPXNt/YXJ0JmF1dG89d2Vi/cCZzPTYzODdmODQ2/NjUxMjIwOGQ3YzU4/OGFkYjIxODE3ZDY3/YjgzZWRlMGI");
  const [isModalVisible, setModalVisible] = useState(false);
  const [mostrarAjustes, setMostrarAjustes] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePerfil = () => {
    setMostrarAjustes(!mostrarAjustes);
  }

  return (
    <>
      <ScrollView className="flex-1 bg-white dark:bg-slate-900">
        {/* Header */}
        <View className="bg-[#5A8FCA] p-6 flex-row items-center relative">
          <View className="relative">
            <Image className="w-24 h-24 rounded-full border-2 border-white" source={{ uri: image }} />
            <TouchableOpacity onPress={pickImage} className="absolute bottom-0 right-0 bg-white p-2 rounded-full">
              <MaterialIcons name="flip-camera-ios" size={20} color="gray" />
            </TouchableOpacity>
          </View>
          <View className="ml-4">
            <Text className="text-white dark:text-white text-2xl font-semibold">Ivan Chimbo Bautista</Text>
            <Text className="text-green-500 text-sm">en línea</Text>
          </View>
        </View>

        {/* Información */}
        <View className="bg-white dark:bg-slate-800 p-4 mt-4 rounded-lg shadow mx-4">
          <Text className="text-blue-500 dark:text-blue-300 font-semibold">Cuenta</Text>
          <TouchableOpacity>
            <Text className="text-lg font-semibold mt-1 dark:text-gray-200">+51 992 036 274</Text>
            <Text className="text-gray-500 dark:text-gray-400 text-sm">Toca para cambiar el número</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-lg font-semibold mt-4 dark:text-gray-200">Ivan</Text>
            <Text className="text-gray-500 dark:text-gray-400 text-sm">Nombre de usuario</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-lg font-semibold mt-4 dark:text-gray-200">Ingeniero de Software</Text>
            <Text className="text-gray-500 dark:text-gray-400 text-sm">Añade algunas palabras sobre ti</Text>
          </TouchableOpacity>
        </View>

        {/* Información */}
        <View className="bg-white dark:bg-slate-800 p-4 mt-4 rounded-lg shadow mx-4">
          <TouchableOpacity className="gap-4 flex-row " onPress={() => setModalVisible(true)}>
            <Text className="text-blue-500 dark:text-blue-300 text-sm">Idioma</Text>
            <LanguageModal
              visible={isModalVisible}
              onClose={() => setModalVisible(false)}
            />
          </TouchableOpacity>
        </View>

        {/* Ajustes */}
        <View className="bg-white dark:bg-slate-800 p-4 mt-4 rounded-lg shadow mx-4">
          <TouchableOpacity onPress={handlePerfil} className="flex-row items-center justify-between">
            <Text className="text-blue-500 dark:text-blue-300 text-sm">
              {mostrarAjustes ? "Ocultar ajustes" : "Ajustes Perfil"}
            </Text>
            <AntDesign
              name={mostrarAjustes ? "up" : "down"}
              size={14}
              color="#3B82F6"
            />
          </TouchableOpacity>
          {mostrarAjustes && <AjuesteScrenn />}
        </View>

        <Cerra_Sesion />
      </ScrollView>
    </>
  );
}

export default ajustes;
