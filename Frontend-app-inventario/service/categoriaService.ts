import { instance } from "./api";

// Tipos para las categorías
export interface Categoria {
  idCategoria: number;
  nombre: string;
  tipo: string;
}

export interface GetCategoriasResponse {
  success: boolean;
  result: Categoria[];
  message?: string;
  error?: string;
}

export interface GestionarCategoriaResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// Obtener todas las categorías
export const getCategorias = async (usuario_id: number): Promise<GetCategoriasResponse> => {
  try {
    const response = await instance.get<GetCategoriasResponse>("/categorias/getCategoria", {
      params: { usuario_id },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    throw error;
  }
};

// Gestionar Categorías: Agregar, Editar o Eliminar
export const gestionarCategoria = async (
  accion: 1 | 2 | 3, // 1 = Agregar, 2 = Editar, 3 = Eliminar
  usuario_id: number,
  categoria_id?: number,
  nombre?: string,
  tipo?: string
): Promise<GestionarCategoriaResponse> => {
  try {
    const payload = {
      accion,
      usuario_id,
      categoria_id,
      nombre,
      tipo,
    };

    const response = await instance.post<GestionarCategoriaResponse>(
      "/gestionarCategorias/gestionarCategorias",
      payload
    );

    return response.data;
  } catch (error) {
    console.error("Error al gestionar categoría:", error);
    throw error;
  }
};
