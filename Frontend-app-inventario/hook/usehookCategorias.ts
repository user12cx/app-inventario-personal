// useHookCategorias.ts
import { useState, useEffect } from "react";
import { getCategorias, gestionarCategoria, Categoria } from "@/service/categoriaService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useHookCategorias = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null); // Mensaje de éxito o error

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
        setError(response.error || "No se encontraron categorías.");
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
        setError("No se encontró el usuario.");
        return { success: false, error: "No se encontró el usuario." };
      }
  
      const usuario_id = parseInt(usuarioIdStr, 10);
      const result = await gestionarCategoria(3, usuario_id, categoriaId);
  
      // Verificamos si result existe y tiene la propiedad success
      if (result && result.success) {
        setCategorias((prev) => prev.filter((cat) => cat.idCategoria !== categoriaId));
        setMessage(result.message || "Categoría eliminada con éxito.");
        setError(null);
        return { success: true, message: result.message || "Categoría eliminada con éxito." };
      } else {
        // Si result es undefined o no tiene success, devolvemos un error
        const errorMessage = result?.error || "Error al eliminar la categoría.";
        setMessage(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      console.error("Error al gestionar categoría:", err);
  
      // Capturamos el error de Axios de manera más detallada
      const errorMessage = err.response?.data?.message || "Error al eliminar la categoría.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };
  
  const editarCategoria = (categoriaId: number) => {
    // Aquí iría la lógica para abrir un modal o manejar el estado para editar
    console.log(`Editar categoría con ID: ${categoriaId}`);
  };

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
        // Recargamos las categorías para mostrar la nueva
        fetchCategorias();
        return { success: true, message: result.message || "Categoría agregada con éxito." };
      } else {
        setMessage(result.error || "Error al agregar la categoría");
        return { success: false, error: result.error || "Error al agregar la categoría" };
      }
    } catch (error) {
      console.error(error);
      setMessage("Error al agregar la categoría.");
      return { success: false, error: "Error al agregar la categoría." };
    }
  };

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
    refreshing,
    message, // mensaje de éxito/error
    eliminarCategoria,
    editarCategoria,
    agregarCategoria, // agregamos la función para agregar categorías
    onRefresh,
  };
};
