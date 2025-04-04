import { View, Text, ActivityIndicator, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import ModalCat from '../../../components/shared/ModalCat'
import ListCategorias from '../../../components/shared/Table'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getCategorias } from '@/service/categoriaService'

const Categorías = () => {
  const [categorias, setCategorias] = useState<any[]>([]); // Usar tipo adecuado en lugar de 'any'
  const [loading, setLoading] = useState<boolean>(true); // Estado para controlar la carga
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const [refreshingActive, setRefreshingActive] = useState(false)

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

  useEffect(() => {
    fetchData(); // Llamar a fetchData solo una vez al montar el componente
  }, []);

  const handleRefresh = async () => {
    setRefreshingActive(true); // Activar el indicador de refresco
    await fetchData(); // Refrescar los datos
    setRefreshingActive(false); // Desactivar el indicador de refresco
  };

  return (
    <ScrollView
      className="flex-1 p-4"
      refreshControl={
        <RefreshControl refreshing={refreshingActive} onRefresh={handleRefresh} />
      }
    >
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text className="text-red-500 text-center mt-4">{`Error: ${error}`}</Text>
      ) : (
        <View>
          <Text className="text-lg text-center mb-4">Categorías Disponibles</Text>
          <ListCategorias categorias={categorias} />
        </View>
      )}
      <ModalCat />
    </ScrollView>
  )
}

export default Categorías;
