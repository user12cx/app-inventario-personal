import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/authContexto';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {

  const { userInfo } = useAuth();
  return (
    <DrawerContentScrollView {...props} scrollEnabled={false}>
      <View className="p-4 mb-10">

        {/* Contenedor de imagen y modo oscuro */}
        <View className="flex-row justify-between items-center">
          {/* Imagen de perfil */}
          <Image
            source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2d9T79ZnmajOYdlgWi5X_es7M8GFk_aeO2Q&s" }}
            className="w-20 h-20 rounded-full border-white"
          />

        </View>

        {/* Contenedor del nombre y desplegar opciones */}
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-black text-xl font-bold dark:text-white">{userInfo.name}{userInfo.apellidos}</Text>
          <TouchableOpacity onPress={() => props.navigation.closeDrawer()} className="bg-[#5A8FCA] p-2 rounded-full">
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Contenedor del número de teléfono */}
        <View className="mt-1">
          <Text className="text-black text-sm text-sans-serif opacity-80  dark:text-[#5A8FCA]">{userInfo.ocupacion}</Text>
        </View>
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
