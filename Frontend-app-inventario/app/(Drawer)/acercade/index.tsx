import { View, Text, Linking, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const AcercaDe = () => {
  return (
    <ScrollView className="flex-1 bg-white p-5">
      {/* Encabezado */}
      <View className="items-center mb-5">
        <Ionicons name="information-circle-outline" size={80} color="#5A8FCA" />
        <Text className="text-2xl font-bold text-[#5A8FCA]">Inventario Personal</Text>
        <Text className="text-gray-500 text-lg">Versión 1.0.0</Text>
      </View>

      {/* Descripción */}
      <Text className="text-gray-700 text-base text-justify mb-5">
        Esta aplicación te permite gestionar tu inventario personal de manera sencilla y eficiente.
        Registra, edita y elimina productos fácilmente para llevar un control detallado de tus pertenencias.
      </Text>

      {/* Información del desarrollador */}
      <View className="mb-5">
        <Text className="text-xl font-semibold text-[#5A8FCA] mb-2">Desarrollador</Text>
        <Text className="text-gray-700">Flexing Code</Text>
      </View>

      <Text className="text-xl font-semibold text-[#5A8FCA] mb-2">Contacto</Text>


      {/* WhatsApp */}
      <View className="mb-5 flex-row items-center">
        <FontAwesome5 name="whatsapp" size={24} color="green" />
        <TouchableOpacity onPress={() => Linking.openURL("https://wa.me/51992036274")}>
          <Text className="text-blue-500 underline ml-2">Chatear por WhatsApp</Text>
        </TouchableOpacity>
      </View>

      {/* GitHub */}
      <View className="mb-5 flex-row items-center">
        <FontAwesome name="github" size={24} color="black" />
        <TouchableOpacity onPress={() => Linking.openURL("https://github.com/user12cx")}>
          <Text className="text-blue-500 underline ml-2">Ver código en GitHub</Text>
        </TouchableOpacity>
      </View>

      {/* Política de privacidad */}
      <View className="mb-5">
        <Text className="text-xl font-semibold text-[#5A8FCA] mb-2">Política de Privacidad</Text>
        <TouchableOpacity onPress={() => Linking.openURL("https://tuapp.com/politica")}>
          <Text className="text-blue-500 underline">Ver detalles</Text>
        </TouchableOpacity>
      </View>

      {/* Pie de página */}
      <Text className="text-gray-500 text-center mt-5">
        © {new Date().getFullYear()} Inventario Personal. Todos los derechos reservados.
      </Text>
    </ScrollView>
  );
};

export default AcercaDe;
