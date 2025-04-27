import { useState, useEffect } from "react";
import { getCategorias, gestionarCategoria, Categoria } from "@/service/categoriaService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from 'axios';


export const useHookCategorias = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null); // Mensaje de éxito o error
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Obtener categorías al iniciar
  const fetchCategorias = async () => {
    try {
      setLoading(true);
      const usuarioIdStr = await AsyncStorage.getItem("usuario_id");
      if (!usuarioIdStr) {
        setError("No se encontró el usuario.");
        return;
      }

      const usuario_id = parseInt(usuarioIdStr, 10);
      const response = await getCategorias(usuario_id);

      if (response.success && Array.isArray(response.result)) {
        setCategorias(response.result);
        setError(null);
      } else {
        setError(error);
      }
    } catch (err) {
      console.error(err);
      setError("Error al obtener las categorías.");
    } finally {
      setLoading(false);
    }
  };

  const eliminarCategoria = async (categoriaId: number) => {
    try {
      const usuarioIdStr = await AsyncStorage.getItem("usuario_id");
      if (!usuarioIdStr) {
        return { success: false, message: null, error: "No se encontró el usuario." };
      }
  
      const usuario_id = parseInt(usuarioIdStr, 10);
      const result = await gestionarCategoria(3, usuario_id, categoriaId);
  
      if (result.success) {
        setCategorias((prev) => prev.filter((cat) => cat.idCategoria !== categoriaId));
        return { success: true, message: result.message || "Categoría eliminada con éxito.", error: null };
      } else {
        return { success: false, message: null, error: result.error || "Error al eliminar la categoría." };
      }
    } catch (error) {
      // Tipamos el error como AxiosError
      if (error instanceof AxiosError) {
        // Verificamos si el error es un error 400
        if (error.response && error.response.status === 400) {
          return { success: false, message: null, error: error.response.data.error || "Error al eliminar la categoría." };
        }
      }
      
      // Si no es un AxiosError, logueamos el error general
      console.error("Error inesperado al gestionar categoría:", error);
      
      return { success: false, message: null, error: "Error al eliminar la categoría." };
    }
  };
  
  
  
  // Función para editar categoría
  const editarCategoria = async (categoriaId: number, nombre: string) => {
    try {
      const usuarioIdStr = await AsyncStorage.getItem("usuario_id");
      if (!usuarioIdStr) {
        setError("No se encontró el usuario.");
        return;
      }

      const usuario_id = parseInt(usuarioIdStr, 10);
      const result = await gestionarCategoria(2, usuario_id, categoriaId, nombre);

      if (result.success) {
        setMessage(result.message || "Categoría editada con éxito.");
        fetchCategorias(); // Recargar categorías después de editar
        setError(null);
      } else {
        setMessage(result.error || "Error al editar la categoría.");
        setError(result.error|| "algo fallo");
      }
    } catch (error) {
      console.error("Error al editar categoría:", error);
      setError("Error al editar la categoría.");
    }
  };

  // Función para agregar categoría
  const agregarCategoria = async (nombre: string) => {
    try {
      const usuarioIdStr = await AsyncStorage.getItem("usuario_id");
      if (!usuarioIdStr) {
        setError("No se encontró el usuario.");
        return { success: false, error: "No se encontró el usuario." };
      }
  
      const usuario_id = parseInt(usuarioIdStr, 10);
      const result = await gestionarCategoria(1, usuario_id, undefined, nombre);
  
      if (result.success) {
        setMessage(result.message || "Categoría agregada con éxito.");
        fetchCategorias(); // Recargar categorías después de agregar
        setError(null);
        return { success: true, message: result.message || "Categoría agregada con éxito." };
      } else {
        setMessage(error);
        return { success: false, error: result.error || "Error al agregar la categoría." };
      }
    } catch (error) {
      console.error("Error al agregar categoría:", error);
      setError("Error al agregar la categoría.");
      return { success: false, error: "Error al agregar la categoría." };
    }
  };
  
  
  // Función para refrescar la lista de categorías
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCategorias();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  return {
    categorias,
    loading,
    error,
    message,
    refreshing,
    eliminarCategoria,
    editarCategoria,
    agregarCategoria,
    onRefresh,
  };
};
