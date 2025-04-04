import React from 'react'
import { FlatList, View, Text, TouchableOpacity } from 'react-native'

interface Categoria {
  idCategoria: number;
  nombre: string;
  tipo: string;
}

interface ListCategoriasProps {
  categorias: Categoria[];
}

const ListCategorias: React.FC<ListCategoriasProps> = ({ categorias }) => {
  return (
    <FlatList
      data={categorias}
      keyExtractor={(item) => item.idCategoria.toString()}
      renderItem={({ item }) => (
        <View className="bg-gray-100 p-4 mb-2 flex-row items-center justify-between shadow-xl">
          <View className="flex-1">
            <Text className="text-xl font-bold">{item.nombre}</Text>
            <Text className="text-sm text-gray-500">{item.tipo}</Text>
          </View>
          <View className="flex-row">
            <TouchableOpacity className="bg-blue-500 p-2 rounded-lg mr-2">
              <Text className="text-white text-sm">Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-red-500 p-2 rounded-lg">
              <Text className="text-white text-sm">Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}

export default ListCategorias;
