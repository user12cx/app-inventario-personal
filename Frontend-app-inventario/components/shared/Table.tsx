import { gestionarCategoria } from '@/service/categoriaService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import { FlatList, View, Text, TouchableOpacity, RefreshControl } from 'react-native'

interface Categoria {
  idCategoria: number;
  nombre: string;
  tipo: string;
}

interface ListCategoriasProps {
  categorias: Categoria[];

}



const ListCategorias: React.FC<ListCategoriasProps> = ({ categorias, handleEliminar, handleEditar }) => {

  return (
    <View>
      {categorias.map((item) => (
        <View
          key={item.idCategoria.toString()} // Usar key como en FlatList
          className="bg-gray-100 p-4 mb-2 flex-row items-center justify-between shadow-xl"
        >
          <View className="flex-1">
            <Text className="text-xl font-bold">{item.nombre}</Text>
            <Text className="text-sm text-gray-500">{item.tipo}</Text>
          </View>
          <View className="flex-row">
            <TouchableOpacity
              className="bg-blue-500 p-2 rounded-lg mr-2"
              onPress={() => handleEditar(item.idCategoria)} // Pasar id si es necesario
            >
              <Text className="text-white text-sm">Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-red-500 p-2 rounded-lg"
              onPress={() => handleEliminar(item.idCategoria)}
            >
              <Text className="text-white text-sm">Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
}

export default ListCategorias;
