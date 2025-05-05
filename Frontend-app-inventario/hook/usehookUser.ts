import { gestionarUsuario, GestionarUsuarioResponse, listarUsuarios, Usuario } from "@/service/userService";
import { useEffect, useState, useCallback } from "react";

export const usehookUsuarios = () => {
  
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 📌 Listar usuarios
  const fetchUsuarios = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await listarUsuarios();
      if (response.success) {
        setUsuarios(response.data);
      } else {
        setError("No se ayo el usuario reinicie.");
      }
    } catch (err) {
      setError("Ocurrió un error al listar los usuarios.");
    } finally {
      setLoading(false);
    }
  }, []);

  // 📌 Agregar, Editar o Eliminar usuario
  const manejarUsuario = useCallback(
    async (
      tipo: "editar" | "eliminar",
      datos: Partial<Usuario>
    ): Promise<GestionarUsuarioResponse> => {
      try {
        const response = await gestionarUsuario(tipo, datos);
        if (response.success) {
          fetchUsuarios(); // refrescar la lista si se gestionó correctamente
        }
        return response;
      } catch (error) {
        console.error("Error en manejarUsuario:", error);
        return { success: false, error: "Error en la operación" };
      }
    },
    [fetchUsuarios]
  );

  useEffect(() => {
    fetchUsuarios(); // cargar usuarios al iniciar
  }, [fetchUsuarios]);

  return {
    usuarios,
    loading,
    error,
    fetchUsuarios,
    manejarUsuario,
  };
};
