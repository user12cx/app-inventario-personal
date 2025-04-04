import { View, Text } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { OrdenItem } from "@/service/transaccionesService";

const Item = ({ descripcion, categoria, cuenta, fecha, monto, tipo }: OrdenItem) => (
    <View className="flex-row items-center p-4">
        {/* Icono */}
        <View className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
            <FontAwesome name="shopping-cart" size={20} color={tipo === "Gasto" ? "#FF3B30" : "#34D399"} />
        </View>

        {/* Información */}
        <View className="flex-1">
            <Text className="text-xl font-bold text-gray-800">{descripcion}</Text>
            <Text className="text-gray-500 text-base">
                {categoria} - {cuenta} - {new Date(fecha).toLocaleDateString()} {/* Formatear fecha */}
            </Text>
        </View>

        {/* Monto con color dinámico */}
        <Text className={`text-lg font-bold py-1 px-3 rounded-2xl ${tipo === "Ingreso" ? "text-green-500" : "text-red-500"}`}>
            $ {monto}
        </Text>
    </View>
);

interface OrdenListProps {
    data: OrdenItem[];
}

const OrdenList = ({ data }: OrdenListProps) => {
    return (
        <View>
            {data.map((item) => (
                <Item key={item.idTransaccion} {...item} />
            ))}
        </View>
    );
};

export default OrdenList;
