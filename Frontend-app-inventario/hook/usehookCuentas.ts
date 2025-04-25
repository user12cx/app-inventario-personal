import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { gestionarCuenta, getCuentas } from '@/service/cuentaService';// Asegúrate de importar la función getCuentas correctamente

export const usehookCuentas = () => {
  const [loading, setLoading] = useState(false);
  const [datos, setDatos] = useState<any[]>([]); // Cambia 'any[]' por el tipo adecuado
  const [error, setError] = useState<string | undefined>('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const usuario_id = await AsyncStorage.getItem("usuario_id");
      if (!usuario_id) {
        throw new Error("No se encontró usuario_id.");
      }
      const response = await getCuentas(parseInt(usuario_id, 10));
      setDatos(response.result || []);
    } catch (error: any) {
      console.error("Error al obtener cuentas:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Función para agregar cuenta
  const agregarCuenta = async (nombre: string, saldo: number, estado: string) => {
    try {
      const usuario_id = await AsyncStorage.getItem("usuario_id");
      if (!usuario_id) throw new Error("No se encontró usuario_id.");
      const response = await gestionarCuenta("agregar", {
        nombre,
        saldo,
        estado,
        usuario_id: parseInt(usuario_id, 10),
      });
      await fetchData(); // Recargar datos
      return response;
    } catch (error) {
      console.error("Error al agregar cuenta:", error);
      throw error;
    }
  };

  // Función para editar cuenta
  const editarCuenta = async (idCuenta: number, nombre: string, saldo: number, estado: string) => {
    try {
      const usuario_id = await AsyncStorage.getItem("usuario_id");
      if (!usuario_id) throw new Error("No se encontró usuario_id.");
      const response = await gestionarCuenta("editar", {
        idCuenta,
        nombre,
        saldo,
        estado,
        usuario_id: parseInt(usuario_id, 10),
      });
      await fetchData();
      return response;
    } catch (error) {
      console.error("Error al editar cuenta:", error);
      throw error;
    }
  };

  // Función para eliminar cuenta
  const eliminarCuenta = async (idCuenta: number) => {
    try {
      const usuario_id = await AsyncStorage.getItem("usuario_id");
      if (!usuario_id) throw new Error("No se encontró usuario_id.");
      const response = await gestionarCuenta("eliminar", {
        idCuenta,
        usuario_id: parseInt(usuario_id, 10),
      });
      await fetchData();
      return response;
    } catch (error) {
      console.error("Error al eliminar cuenta:", error);
      throw error;
    }
  };

  return {
    loading,
    datos,
    error,
    fetchData,
    agregarCuenta,
    editarCuenta,
    eliminarCuenta,
  };
};