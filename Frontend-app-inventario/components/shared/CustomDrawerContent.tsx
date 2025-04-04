import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props} scrollEnabled={false}>
      <View className="bg-[#5A8FCA] p-4 mb-10">
        
        {/* Contenedor de imagen y modo oscuro */}
        <View className="flex-row justify-between items-center">
          {/* Imagen de perfil */}
          <Image
            source={require('../../assets/images/autentificacionlogin.png')}
            className="w-20 h-20 rounded-full border-white"
          />
          
          {/* Botón de modo oscuro */}
          <TouchableOpacity>
            <Ionicons name="moon-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Contenedor del nombre y desplegar opciones */}
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-white text-xl font-bold">Ivan Bautista</Text>
          <TouchableOpacity>
            <Ionicons name="chevron-down-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Contenedor del número de teléfono */}
        <View className="mt-1">
          <Text className="text-white text-xl opacity-80">+51 992 036 274</Text>
        </View>
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
