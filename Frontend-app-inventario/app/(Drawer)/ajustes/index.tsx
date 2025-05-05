import { View, Text, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import AjuesteScrenn from '@/components/shared/PerfilAjustes';
import LanguageModal from '../../../components/shared/modalidioma';
import Cerra_Sesion from '@/components/shared/Cerrar_sesion';
import { t } from 'i18next';

import { useAuth } from '@/context/authContexto';

const ajustes = () => {
  const { userInfo } = useAuth();

  const [isModalVisible, setModalVisible] = useState(false);
  const [mostrarAjustes, setMostrarAjustes] = useState(false);


  const handlePerfil = () => {
    setMostrarAjustes(!mostrarAjustes);
  }

  return (
    <>
      <ScrollView className="flex-1 bg-white dark:bg-slate-900">
        {/* Header */}
        <View className="bg-[#5A8FCA] p-6 flex-row items-center relative">
          <View className="justify-center items-center border-2 border-white rounded-full w-20 h-20">
            <MaterialIcons name="personal-injury" size={25} color="white" />
          </View>
          <View className="ml-4">
            <Text className="text-white dark:text-white text-2xl font-semibold"> {userInfo.name} {userInfo.apellidos}</Text>
            <Text className="text-green-500 text-sm">en línea</Text>
          </View>
        </View>

        {/* Información */}
        <View className="bg-white dark:bg-slate-800 p-4 mt-4 rounded-lg shadow mx-4">
          <Text className="text-blue-500 dark:text-blue-300 font-semibold">{t("titles.cuenta")}</Text>
          <TouchableOpacity>
            <Text className="text-lg font-semibold mt-1 dark:text-gray-200">{userInfo.telefono}</Text>
            <Text className="text-gray-500 dark:text-gray-400 text-sm">{t("perfil_atributes.numero")}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-lg font-semibold mt-4 dark:text-gray-200">{userInfo.email}</Text>
            <Text className="text-gray-500 dark:text-gray-400 text-sm">{t("perfil_atributes.email")}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-lg font-semibold mt-4 dark:text-gray-200">{userInfo.usuario}</Text>
            <Text className="text-gray-500 dark:text-gray-400 text-sm">{t("perfil_atributes.user")}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-lg font-semibold mt-4 dark:text-gray-200">{userInfo.ocupacion}</Text>
            <Text className="text-gray-500 dark:text-gray-400 text-sm">{t("perfil_atributes.description")}</Text>
          </TouchableOpacity>
        </View>

        {/* Información */}
        <View className="bg-white dark:bg-slate-800 p-4 mt-4 rounded-lg shadow mx-4">
          <TouchableOpacity className="gap-4 flex-row " onPress={() => setModalVisible(true)}>
            <Text className="text-blue-500 dark:text-blue-300 text-sm">{t("language.title")}</Text>
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
              {mostrarAjustes ? t("titles.perfil_cuenta") : t("titles.perfil_acconst")}
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
