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

export interface NuevaTransaccion {
  descripcion: string;
  categoria_id: number;
  monto: number;
  tipo_id: number;
  cuenta_id: number;
  fecha: string; // formato ISO, por ejemplo: "2025-04-16T09:00:00"
  usuario_id: number;
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
export const getPaginatedTransactions = async (usuario_id: number,): Promise<OrdenItem[]> => {
  try {
    const response = await instance.get("getTransaccionesPaginadas/getTransaccionesPaginadas", {
      params: { usuario_id },
    });
    return response.data.result;
  } catch (error) {
    console.error("Error al obtener transacciones paginadas:", error);
    throw error;
  }
};

export const addTransaccion = async (transaccion: NuevaTransaccion): Promise<string> => {
  try {
    const response = await instance.post("addTransaccion/addTransaccion", transaccion);
    return response.data.message; // Puedes retornar también el objeto completo si deseas
  } catch (error: any) {
    console.error("Error al agregar transacción:", error);
    throw new Error(error.response?.data?.error || "Error desconocido al agregar transacción");
  }
};