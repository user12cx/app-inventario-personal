import { instance } from "./api"
export interface Cuenta {
  idCuenta: number;
  nombre: string;
  saldo: number;
  estado: string;
  usuario_id: number;
}

export interface GestionarCuentaResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface ListarCuentasResponse {
  success: boolean;
  data: Cuenta[];
}

export interface GetCuentasResponse {
  success: boolean;
  data: Cuenta[];
  message?: string;
  error?: string;
}


export const getCuentas =  async(usuario_id:number):Promise<GetCuentasResponse>=>{
  try {
    const response =  await instance.get("cuentas/getCuenta",{
      params:{usuario_id},
    });
    return response.data;
  } catch (error) {
    console.log("error al cargar las cuentas", error);
    throw {message: error};
  }
};

export const gestionarCuenta = async (
  tipo: "agregar" | "editar" | "eliminar",
  {
    idCuenta,
    nombre,
    saldo,
    estado,
    usuario_id,
  }: {
    idCuenta?: number;
    nombre?: string;
    saldo?: number;
    estado?: string;
    usuario_id: number;
  }
): Promise<GestionarCuentaResponse> => {
  try {
    const payload = {
      tipo,
      idCuenta,
      nombre,
      saldo,
      estado,
      usuario_id,
    };

    const response = await instance.post<GestionarCuentaResponse>(
      "/gestionarCuentas/gestionarCuentas",
      payload
    );

    return response.data;
  } catch (error) {
    console.error("Error al gestionar cuenta:", error);
    throw error;
  }
};

