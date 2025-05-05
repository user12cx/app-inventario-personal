import { instance } from "./api"


export interface GestionarMetaResponse {
  success: boolean;
  message?: string;
  error?: string;

}
export interface ObjetivoAhorro {
  idObjetivo: number;
  nombre: string;
  monto_objetivo: number;
  monto_actual: number;
  fecha_limite: string | null;  // Puede ser null si no hay una fecha límite
  usuario_id: number;
}
export interface GetObjetivosAhorroResponse {
  success: boolean;
  data: ObjetivoAhorro[];
  message?: string;
  result: any;
  error?: string;
}
export const getObjetivosAhorro = async (usuario_id:number): Promise<GetObjetivosAhorroResponse> => {
  try {
    const response = await instance.get<GetObjetivosAhorroResponse>('getObjetivos/getObjetivos',{
      params:{usuario_id}
    });
    return response.data;
  } catch (error) {
    console.log('Error al cargar los objetivos de ahorro', error);
    throw error;
  }
};

export const gestionarMeta = async (
  tipo: 'agregar' | 'editar' | 'eliminar',
  idObjetivo?: number,
  nombre?: string,
  fecha_limite?: string,
  monto_objetivo?: number,
  monto_actual?: number,
  usuario_id?: number,
  cuenta_id?: number
): Promise<GestionarMetaResponse> => {
  try {
    const payload = {
      tipo,
      idObjetivo,
      nombre,
      fecha_limite,
      monto_objetivo,
      monto_actual,
      usuario_id,
      cuenta_id,
    };

    const response = await instance.post<GestionarMetaResponse>(
      'gestionarMetasFuturo/gestionarMetasFuturo',  // Asegúrate de que esta ruta sea correcta
      payload
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Error desconocido');
    }

    return response.data;
  } catch (error: any) {
    console.error('Error al gestionar meta:', error.message || error);
    throw error; // Re-lanzar error para manejarlo en el componente
  }
};


