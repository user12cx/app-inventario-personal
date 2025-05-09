import { instance } from "./api";

// Tipos para las categorías
export interface Categoria {
  idCategoria: number;
  nombre: string;
}

export interface GetCategoriasResponse {
  success: boolean;
  result: Categoria[];
  message?: string;
  error?: unknown;
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
  nombre?: string
): Promise<GestionarCategoriaResponse> => {
  try {
    // Validación de parámetros antes de enviar la solicitud
    if (accion === 1 && !nombre) {
      throw new Error("El nombre es requerido para agregar una categoría.");
    }

    if ((accion === 2 || accion === 3) && !categoria_id) {
      throw new Error("El idCategoria es requerido para editar o eliminar una categoría.");
    }

    // Construir el payload según la acción
    const payload = {
      accion,
      usuario_id,
      categoria_id,
      nombre,
    };

    const response = await instance.post<GestionarCategoriaResponse>(
      "/gestionarCategorias/gestionarCategorias",
      payload
    );

    return response.data;
  } catch (error) {
    // console.error("Error al gestionar categoría:", error);
    throw error;
  }
};
