import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { showMessage } from 'react-native-flash-message';

interface Categoria {
  idCategoria: number;
  nombre: string;
}

interface ListCategoriasProps {
  categorias: Categoria[];
  handleEliminar: (id: number) => void;
  handleEditar: (id: number, nombre: string) => void;
}

const ListCategorias: React.FC<ListCategoriasProps> = ({ categorias, handleEliminar, handleEditar }) => {
  const [editandoId, setEditandoId] = useState<number | null>(null); // Controla qué categoría está siendo editada
  const [nuevoNombre, setNuevoNombre] = useState<string>(''); // Almacena el nuevo nombre

  const manejarEdicion = (id: number, nombre: string) => {
    setEditandoId(id);  // Activa el modo de edición
    setNuevoNombre(nombre);  // Rellena el campo con el nombre actual
  };

  const guardarEdicion = (id: number) => {
    if (nuevoNombre.trim() !== '') {
      handleEditar(id, nuevoNombre); // Guarda el cambio
      setEditandoId(null); // Desactiva el modo de edición
      showMessage({
        message:'Categoría eliminada con éxito.',
        type: 'success',
        icon: 'success',
        duration: 500,
        floating: true,
        position: 'top',
        backgroundColor: '#DFF2BF',
        color: '#4F8A10',
        style: { borderRadius: 6, borderWidth: 1, borderColor: '#38761A' },
      });
    }
  };


  return (
    <View>
      {categorias.map((item) => (
        <View
          key={item.idCategoria.toString()}
          className="bg-gray-100 dark:bg-slate-800 p-4 mb-2 flex-row items-center justify-between shadow-xl rounded-md"
        >
          <View className="flex-1">
            {/* Si está en modo edición, mostrar un TextInput, de lo contrario, mostrar el nombre de la categoría */}
            {editandoId === item.idCategoria ? (
              <TextInput
                value={nuevoNombre}
                onChangeText={setNuevoNombre}
                className="border border-[#5A8FCA] rounded p-2 m-1 dark:text-white"
                onBlur={() => guardarEdicion(item.idCategoria)} // Guarda cuando pierde el foco
                onSubmitEditing={() => guardarEdicion(item.idCategoria)} // Guarda cuando presiona Enter
              />
            ) : (
              <Text className="text-xl font-bold dark:text-white">{item.nombre}</Text>
            )}
          </View>

          <View className="flex-row">
            <TouchableOpacity
              className="bg-blue-500 p-2 rounded-lg mx-1"
              onPress={() => manejarEdicion(item.idCategoria, item.nombre)} // Activa la edición
            >
              <Text className="text-white text-sm">Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-red-500 p-2 rounded-lg mx-1"
              onPress={() => handleEliminar(item.idCategoria)} // Eliminar categoría
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
