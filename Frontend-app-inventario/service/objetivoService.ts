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
  result:any;
  error?: string;
}
export const getObjetivosAhorro = async (): Promise<GetObjetivosAhorroResponse> => {
  try {
    const response = await instance.get<GetObjetivosAhorroResponse>('objetivos/getObjetivo');
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
      cuenta_id, // Pasamos la cuenta vinculada
    };

    const response = await instance.post<GestionarMetaResponse>(
      '/gestionarMetasFuturo/gestionarMetasFuturo', // La ruta de tu backend
      payload
    );
    
    return response.data;
  } catch (error) {
    console.error('Error al gestionar meta:', error);
    throw error;
  }
};

