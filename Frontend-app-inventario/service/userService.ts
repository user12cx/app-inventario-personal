import {instance} from "./api"


export interface Usuario {
  idUser: number;
  usuario: string;
  name: string;
  apellidos: string;
  email: string;
  password: string;
  telefono: number;
  ocupacion: string;
}

export interface GestionarUsuarioResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface ListarUsuariosResponse {
  success: boolean;
  data: Usuario[];
}




// Agregar, Editar o Eliminar usuario
export const gestionarUsuario = async (
  tipo: "agregar" | "editar" | "eliminar",
  {
    idUser,
    usuario,
    name,
    apellidos,
    email,
    password,
    telefono,
    ocupacion,
  }: {
    idUser?: number;
    usuario?: string;
    name?: string;
    apellidos?: string;
    email?: string;
    password?: string;
    telefono?: number;
    ocupacion?: string;
  }
): Promise<GestionarUsuarioResponse> => {
  try {
    const payload = {
      tipo,
      idUser,
      usuario,
      name,
      apellidos,
      email,
      password,
      telefono,
      ocupacion,
    };

    const response = await instance.post<GestionarUsuarioResponse>(
      "/gestionarUsuarios/gestionarUsuarios",
      payload
    );

    return response.data;
  } catch (error) {
    console.error("Error al gestionar usuario:", error);
    throw error;
  }
};

// Listar usuarios
export const listarUsuarios = async (): Promise<ListarUsuariosResponse> => {
  try {
    const response = await instance.post<ListarUsuariosResponse>(
      "/gestionarUsuarios/gestionarUsuarios",
      { tipo: "listar" }
    );
    return response.data;
  } catch (error) {
    console.error("Error al listar usuarios:", error);
    throw error;
  }
};
