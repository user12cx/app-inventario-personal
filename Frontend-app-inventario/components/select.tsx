import { useColorScheme, Platform } from "react-native";
import RNPickerSelect, { PickerSelectProps, PickerStyle } from "react-native-picker-select";
import Ionicons from "@expo/vector-icons/Ionicons";
import tailwind from "twrnc";

/**
 * React Native select component built with Tailwind CSS y soporte para modo oscuro
 */
export const Select = ({ style, Icon, ...props }: PickerSelectProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const baseStyle = tailwind.style(
    "w-full flex flex-row items-center h-12 pl-4 pr-12 rounded-lg",
    isDark
      ? "bg-slate-800 text-white border-gray-600"
      : "bg-white text-black border-neutral-200"
  );

  const combinedStyle: PickerStyle = {
    inputIOS: baseStyle,
    inputAndroid: baseStyle,
    inputWeb: tailwind.style("w-full h-12 rounded-lg"),
    iconContainer: tailwind.style("flex items-center justify-center h-12 w-12"),
    ...style,
  };

  return (
    <RNPickerSelect
      {...props}
      style={combinedStyle}
      useNativeAndroidPickerStyle={false}
      Icon={() => {
        if (Platform.OS === "web") return null;

        if (Icon) {
          return Icon();
        }

        return (
          <Ionicons
            name="chevron-down"
            size={18}
            color={isDark ? "#fff" : "#000"} // Cambia el color del ícono según el tema
          />
        );
      }}
    />
  );
};
