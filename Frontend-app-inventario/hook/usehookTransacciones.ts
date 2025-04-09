import { View, Text } from 'react-native'
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get_top_acc, OrdenItem } from '@/service/transaccionesService';

 export const usehookTransacciones = () => {
      const [loadingTop, setLoadingTop] = useState(false);
      const [datosTop, setDatosTop] = useState<OrdenItem[]>([]);// Cambia 'any[]' por el tipo adecuado
      const [errorTop, setErrorTop] = useState<string | undefined>('');

        useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingTop(true);

        // Obtener usuario_id de AsyncStorage
        const usuario_id = await AsyncStorage.getItem("usuario_id");

        if (!usuario_id) {
          throw new Error("No se encontró usuario_id en AsyncStorage.");
        }

        // Llamar a la API con usuario_id convertido a número
        const response = await get_top_acc(parseInt(usuario_id, 10));

        // console.log("Respuesta de la API:", response);

        // Validar que la respuesta es un array antes de asignarlo
        if (!Array.isArray(response)) {
          throw new Error("Los datos recibidos no son válidos.");
        }
        setDatosTop(response);

      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error al obtener datos:", error.message);
          setErrorTop(error.message);
        } else {
          console.error("Error desconocido al obtener datos");
          setErrorTop("Error desconocido.");
        }
      } finally {
        setLoadingTop(false);
      }
    };

    fetchData();
  }, []);
  
  return { loadingTop, datosTop, errorTop };
}

