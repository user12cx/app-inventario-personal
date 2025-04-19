import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface Categoria {
  idCategoria: number;
  nombre: string;
}

interface ListCategoriasProps {
  categorias: Categoria[];
  handleEliminar: (id: number) => void;
  handleEditar: (id: number) => void;
}

const ListCategorias: React.FC<ListCategoriasProps> = ({ categorias, handleEliminar, handleEditar }) => {
  return (
    <View>
      {categorias.map((item) => (
        <View
          key={item.idCategoria.toString()}
          className="bg-gray-100 dark:bg-slate-800 p-4 mb-2 flex-row items-center justify-between shadow-xl rounded-md"
        >
          <View className="flex-1">
            <Text className="text-xl font-bold  dark:text-white">{item.nombre}</Text>
          </View>

          <View className="flex-row">
            <TouchableOpacity
              className="bg-[#5A8FCA] p-2 rounded-lg mr-2"
              onPress={() => handleEditar(item.idCategoria)}
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
};

export default ListCategorias;
