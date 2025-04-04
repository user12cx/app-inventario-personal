import { instance } from "./api"; // Asegúrate de que tu instancia de Axios esté importada

// Definir la interfaz de la respuesta del backend
export interface OrdenItem {
  idTransaccion: number;
  usuario_id: number;
  descripcion: string;
  categoria: string;
  monto: number;
  tipo: string;
  cuenta: string
  fecha: string;
}

// Función para obtener los gastos del usuario
export const get_top_acc = async (usuario_id?: number | undefined): Promise<OrdenItem[]> => {
  try {
    const response = await instance.get("/getTopGastos/getTopGastos", {
      params: { usuario_id },

    });
    return response.data.result; // Asegúrate de que `result` contiene los datos correctos
  } catch (error) {
    console.error("Error al obtener últimos gastos:", error);
    throw error;
  }
};

// 2️⃣ Obtener gastos con paginación (para scroll infinito)
export const getPaginatedTransactions = async (
  usuario_id: number,
  pageNumber: number = 1,
  pageSize: number = 5
): Promise<OrdenItem[]> => {
  try {
    const response = await instance.get("getTransaccionesPaginadas/getTransaccionesPaginadas", {
      params: { usuario_id, pageNumber, pageSize },
    });
    return response.data.result;
  } catch (error) {
    console.error("Error al obtener transacciones paginadas:", error);
    throw error;
  }
};
