import { View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { Cookie, CheckSquare, Square } from "lucide-react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const TerminosYCondiciones = ({ visible, onClose, onAccept }: Props) => {
  const [checks, setChecks] = useState([false, false, false]);

  const toggleCheck = (index: number) => {
    const newChecks = [...checks];
    newChecks[index] = !newChecks[index];
    setChecks(newChecks);
  };

  const allChecked = checks.every((item) => item);

  return (
    <Modal visible={visible} transparent animationType="fade" >
      <View className="absolute top-20 left-6 right-6 bg-white p-6 rounded-xl shadow-xl border border-gray-300">
        {/* Título */}
        <View className="items-center mb-6">
          <Cookie size={40} color="#7b57ff" />
          <Text className="text-lg font-bold text-gray-800 mt-2">Términos y Condiciones</Text>
        </View>

        {/* Lista con checkboxes alineados */}
        <View className="space-y-4">
          {[
            "Aceptar la política de privacidad.",
            "Permitir uso de datos.",
            "Aceptar términos de uso.",
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center space-x-3 py-2 gap-4"
              onPress={() => toggleCheck(index)}
            >
              {checks[index] ? (
                <CheckSquare size={24} color="green" />
              ) : (
                <Square size={24} color="gray" />
              )}
              <Text className="text-gray-600 flex-1">{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Botones */}
        <View className="flex-row justify-end mt-6 space-x-4 gap-6">
          <TouchableOpacity className="px-4 py-2 bg-gray-300 rounded-lg" onPress={onClose}>
            <Text className="text-gray-700 font-medium">Cerrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`px-4 py-2 rounded-lg ${allChecked ? "bg-blue-500" : "bg-gray-400"}`}
            disabled={!allChecked}
            onPress={onAccept}
          >
            <Text className="text-white font-medium">Aceptar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TerminosYCondiciones;
