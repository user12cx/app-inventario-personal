import { View, Text, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import ModalCat from '../../../components/shared/ModalCat';
import ListCategorias from '../../../components/shared/Table';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCategorias, gestionarCategoria } from '@/service/categoriaService';

const Categorías = () => {
  const [categorias, setCategorias] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshingActive, setRefreshingActive] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const usuario_id = await AsyncStorage.getItem("usuario_id");
      if (usuario_id) {
        const response = await getCategorias(parseInt(usuario_id, 10));
        if (response && Array.isArray(response.result)) {
          setCategorias(response.result);
        } else {
          setError("No se encontraron categorías.");
        }
      } else {
        setError("No se encontró usuario_id.");
      }
    } catch (error) {
      console.error(error);
      setError("Error al obtener las categorías.");
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (categoriaId) => {
    try {
      const usuarioId = await AsyncStorage.getItem('usuario_id');
      if (!usuarioId) {
        setError('No se encontró el usuario.');
        return;
      }
      const result = await gestionarCategoria(3, parseInt(usuarioId, 10), categoriaId);
      setCategorias(categorias.filter((cat) => cat.idCategoria !== categoriaId));
      setError(null); // Limpiar error si la eliminación es exitosa
    } catch (error) {
      setError('Error al eliminar la categoría');
      console.log(error);
    }
  };

  const handleEditar = (categoriaId) => {
    // Lógica para editar (puedes abrir el modal aquí con el idCategoria)
    console.log(`Editar categoría con ID: ${categoriaId}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = async () => {
    setRefreshingActive(true);
    await fetchData();
    setRefreshingActive(false);
  };

  return (
    <ScrollView
      className="flex-1 p-4"
      refreshControl={<RefreshControl refreshing={refreshingActive} onRefresh={handleRefresh} />}
    >
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text className="text-red-500 text-center mt-4">{`Error: ${error}`}</Text>
      ) : (
        <View>
          <Text className="text-lg text-center mb-4">Categorías Disponibles</Text>
          <ListCategorias
            categorias={categorias}
            handleEliminar={handleEliminar}
            handleEditar={handleEditar}
          />
        </View>
      )}
      <ModalCat />
    </ScrollView>
  );
};

export default Categorías;