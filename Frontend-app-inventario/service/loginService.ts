import { instance } from "./api";

interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    idUser: number;
    email: string;
    usuario: string;
    name: string;
    apellidos: string;
    telefono: string;
    ocupacion: string;
  };
}

export const loginUser = async (input: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await instance.post<LoginResponse>("/login/login", { input, password });
    return response.data;
  } catch (error: any) {
    throw Error(error.response?.data?.message || "Error al iniciar sesión");
  }
};


// ----------------------------------------



interface RegisterResponse {
  success: boolean;
  message: string;
}

export const registerUser = async (usuario: string, email: string, password: string): Promise<RegisterResponse> => {
  try {
    const response = await instance.post<RegisterResponse>("/register/register", {
      usuario,
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error al registrar usuario:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error al registrar usuario");
  }
};
