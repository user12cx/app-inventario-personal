// useFetchCuentas.ts
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCuentas } from '@/service/cuentaService';// Asegúrate de importar la función getCuentas correctamente

export const usehookCuentas = () => {
  const [loading, setLoading] = useState(false);
  const [datos, setDatos] = useState<any[]>([]); // Cambia 'any[]' por el tipo adecuado
  const [error, setError] = useState<string | undefined>('');

  useEffect(() => {
    
    const fetchData = async () => {
      setLoading(true);
      try {
        const usuario_id = await AsyncStorage.getItem("usuario_id");
        if (!usuario_id) {
          console.error("Error: usuario_id no encontrado en AsyncStorage.");
          setError("No se encontró usuario_id.");
        }else{
        const response = await getCuentas(parseInt(usuario_id, 10));
        setDatos(response.result || []);
        }
      } catch (error: any) {
        console.error("Error al obtener cuentas:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, datos, error };
};
