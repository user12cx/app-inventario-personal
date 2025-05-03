import { View, Text, Linking, TouchableOpacity, ScrollView, TextInput, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import registerForPushNotificationsAsync from "@/app/notification/notify";
import { CartItemPlaceholder, CategoriaFicticia, Chardata, HistorialCompras, MetaFicticia } from "@/components/ComponentsBlanck";

const AcercaDe = () => {
  const { t } = useTranslation();



  return (
    <ScrollView className="flex-1 bg-white dark:bg-slate-900 p-5">
      {/* Encabezado */}
      <View className="items-center mb-5">
        <Ionicons name="information-circle-outline" size={80} color="#5A8FCA" />
        <Text className="text-2xl font-bold text-[#5A8FCA] dark:text-[#5A8FCA]">
          {t("about.title")}
        </Text>
        <Text className="text-gray-500 dark:text-gray-300 text-lg">{t("about.version")}</Text>
      </View>

      {/* Descripción */}
      <Text className="text-gray-700 dark:text-gray-200 text-base text-justify mb-5">
        {t("about.description")}
        <Text className="font-semibold"> {t("about.callToAction")}</Text>
      </Text>

      {/* Información del desarrollador */}
      <View className="mb-5">
        <Text className="text-xl font-semibold text-[#5A8FCA] dark:text-[#5A8FCA] mb-2">
          {t("about.developer")}
        </Text>
        <Text className="text-gray-700 dark:text-gray-300">
          Ivan Chimbo Bautista -
          <Text className="text-[#5A8FCA] font-bold"> {t("about.role")} </Text>
        </Text>
      </View>

      <Text className="text-xl font-semibold text-[#5A8FCA] dark:text-[#5A8FCA] mb-2">
        {t("about.contact")}
      </Text>

      {/* WhatsApp */}
      <View className="mb-5 flex-row items-center">
        <FontAwesome5 name="whatsapp" size={24} color="green" />
        <TouchableOpacity onPress={() => Linking.openURL("https://wa.me/51992036274")}>
          <Text className="text-blue-500 underline ml-2">{t("about.whatsapp")}</Text>
        </TouchableOpacity>
      </View>

      {/* GitHub */}
      <View className="mb-5 flex-row items-center">
        <FontAwesome name="github" size={24} color="black" />
        <TouchableOpacity onPress={() => Linking.openURL("https://github.com/user12cx")}>
          <Text className="text-blue-500 underline ml-2">{t("about.github")}</Text>
        </TouchableOpacity>
      </View>

      {/* Política de privacidad */}
      <View className="mb-5">
        <Text className="text-xl font-semibold text-[#5A8FCA] dark:text-[#5A8FCA] mb-2">
          {t("about.privacyPolicy")}
        </Text>
        <TouchableOpacity onPress={() => Linking.openURL("https://www.iubenda.com/es/help/39451-politica-de-privacidad-para-apps-de-android")}>
          <Text className="text-blue-500 underline">{t("about.viewDetails")}</Text>
        </TouchableOpacity>
      </View>

        <MetaFicticia/>
   

      {/* Pie de página */}
      <Text className="text-gray-500 dark:text-gray-400 text-center mt-5">
        © {new Date().getFullYear()} {t("about.title")}. {t("about.rights")}
      </Text>
    </ScrollView>
  );
};

export default AcercaDe;
