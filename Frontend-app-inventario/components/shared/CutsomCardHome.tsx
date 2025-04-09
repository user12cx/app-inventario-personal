import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router"; // Importamos router para la navegación

interface Props {
  title: string;
  icons: string;
  iconSize?: number;
  iconColor?: string; // Color dinámico para el ícono y el borde
  fondo: "primary" | "infoBold" | "violet" | "succes" | "infoRigth" | "buy";
  ruta?: string; // Ruta a donde redirigir (opcional)
}

const CutsomCardHome = ({ title, icons, iconSize = 24, iconColor = "black", fondo,  ruta,}: Props) => {
  const theme = {
    primary: "bg-[#eaeaff]", // Color para 'primary'
    infoBold: "bg-[#fff0da]", // Color para 'infoBold'
    violet: "bg-[#fbebf8]", // Color para 'violet'
    succes: "bg-[#D6D6D1]", // Color para 'succes'
    buy: "bg-[#D0F0D0]", // Color para 'buy'
    perf:"bg-[#C1DBF0]",
    infoRigth: "bg-[#fffae7]", // Color para 'infoRigth'
  }[fondo];

  return (
    <TouchableOpacity
      onPress={(e) => {
        if (ruta) {
          router.push(ruta); // Redirige a la ruta si está definida
          console.log("Redirigiendo a la ruta", ruta);
        }
      }}
    >
      <View
        style={{ borderColor: iconColor }} // Aplica el color del ícono al borde
        className={`${theme} w-[60px] h-[60px] rounded-full justify-center items-center border-2`}
      >
        <AntDesign className="font-bold" name={icons} size={iconSize} color={iconColor} />
      </View>
      <Text className="text-center font-semibold text-[15px]">{title}</Text>
    </TouchableOpacity>
  );
};

export default CutsomCardHome;
