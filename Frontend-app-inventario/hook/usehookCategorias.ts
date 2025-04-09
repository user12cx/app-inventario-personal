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

      if (response && Array.isArray(response.result)) {
        setCategorias(response.result);
        setError(null);
      } else {
        setError("No se encontraron categorías.");
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
        return;
      }

      const usuario_id = parseInt(usuarioIdStr, 10);
      await gestionarCategoria(3, usuario_id, categoriaId);
      setCategorias((prev) => prev.filter((cat) => cat.idCategoria !== categoriaId));
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error al eliminar la categoría.");
    }
  };

  const editarCategoria = (categoriaId: number) => {
    // Aquí iría la lógica para abrir un modal o manejar el estado para editar
    console.log(`Editar categoría con ID: ${categoriaId}`);
  };

  const agregarCategoria = async (nombre: string, tipo: string) => {
    try {
      const usuarioIdStr = await AsyncStorage.getItem("usuario_id");
      if (!usuarioIdStr) {
        setError("No se encontró el usuario.");
        return;
      }

      const usuario_id = parseInt(usuarioIdStr, 10);
      const result = await gestionarCategoria(1, usuario_id, null, nombre, tipo);

      if (result.success) {
        setMessage("Categoría agregada con éxito.");
        // Recargamos las categorías para mostrar la nueva
        fetchCategorias();
      } else {
        setMessage(result.error || "Error al agregar la categoría");
      }
    } catch (error) {
      setMessage("Categoria Agregada");
      console.error(error);
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
