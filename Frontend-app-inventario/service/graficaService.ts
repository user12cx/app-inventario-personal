import { instance } from "./api"; // Asegúrate de que "instance" esté bien configurado.

export interface Gasto {
  mes: string;
  total_gasto: number;
}

interface ResponseGastos {
  result: Gasto[];
}

export const getGastosPorMes = async (usuario_id: string): Promise<ResponseGastos> => {
  try {
    const response = await instance.get("getGastosPorMes/getGastosPorMes", {
      params: { usuario_id },
    });

    return response.data; // Debería cumplir con el tipo ResponseGastos
  } catch (error: unknown) {
    // Comprobación para verificar que error tiene una propiedad message
    if (error instanceof Error) {
      console.log("Error al cargar los datos", error.message);
      throw { message: error.message }; // Mejor descripción del error
    } else {
      // Si el error no es una instancia de Error, manejamos el caso de forma genérica
      console.log("Error desconocido", error);
      throw { message: "Error desconocido" };
    }
  }
};
