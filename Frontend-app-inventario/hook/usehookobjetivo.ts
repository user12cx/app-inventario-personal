import { gestionarMeta, getObjetivosAhorro, ObjetivoAhorro } from '@/service/objetivoService';
import { useEffect, useState } from 'react';

export const usehookobjetivo = () => {
  const [objetivos, setObjetivos] = useState<ObjetivoAhorro[]>([]);
  const [loadingObjetivos, setLoadingObjetivos] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);  // Estado para mensajes de éxito

  // Cargar objetivos desde la API
  const cargarObjetivos = async () => {
    setLoadingObjetivos(true);
    setError(null); // Limpiar errores previos
    setSuccessMessage(null); // Limpiar mensaje de éxito previo
    try {
      const response = await getObjetivosAhorro();
      if (response.success && response.data) {
        setObjetivos(response.data);
      } else {
        setError(response.message || 'Error desconocido al obtener los objetivos');
      }
    } catch (err: any) {
      setError('Error al cargar objetivos');
      console.error(err);
    } finally {
      setLoadingObjetivos(false);
    }
  };

  // Agregar un nuevo objetivo
  const agregarObjetivo = async (data: {
    nombre: string;
    fecha_limite: string;
    monto_objetivo: number;
    monto_actual: number;
    usuario_id: number;
    cuenta_id: number;
  }) => {
    setLoadingObjetivos(true);
    setError(null);
    setSuccessMessage(null);  // Limpiar mensaje de éxito previo
    try {
      const res = await gestionarMeta('agregar', undefined, data.nombre, data.fecha_limite, data.monto_objetivo, data.monto_actual, data.usuario_id, data.cuenta_id);
      if (res.success) {
        setSuccessMessage(res.message || 'Objetivo agregado exitosamente');
        await cargarObjetivos();
      } else {
        setError(res.message || 'Error al agregar el objetivo');
      }
    } catch (err: any) {
      setError('Error al agregar el objetivo');
      console.error(err);
    } finally {
      setLoadingObjetivos(false);
    }
  };

  // Editar un objetivo existente
  const editarObjetivo = async (idObjetivo: number, data: {
    nombre: string;
    fecha_limite: string;
    monto_objetivo: number;
    monto_actual: number;
    usuario_id: number;
    cuenta_id: number;
  }) => {
    if (!idObjetivo) {
      setError("El id del objetivo es necesario para editar.");
      return;
    }

    setLoadingObjetivos(true);
    setError(null);
    setSuccessMessage(null);  // Limpiar mensaje de éxito previo
    try {
      const res = await gestionarMeta('editar', idObjetivo, data.nombre, data.fecha_limite, data.monto_objetivo, data.monto_actual, data.usuario_id, data.cuenta_id);
      if (res.success) {
        setSuccessMessage(res.message || 'Objetivo editado exitosamente');
        await cargarObjetivos();
      } else {
        setError(res.message || 'Error al editar el objetivo');
      }
    } catch (err: any) {
      setError('Error al editar el objetivo');
      console.error(err);
    } finally {
      setLoadingObjetivos(false);
    }
  };

  // Eliminar un objetivo
  const eliminarObjetivo = async (idObjetivo: number): Promise<{ success: boolean; message: string }> => {
    setLoadingObjetivos(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const res = await gestionarMeta('eliminar', idObjetivo);
      if (res.success) {
        setSuccessMessage(res.message || 'Objetivo eliminado exitosamente');
        await cargarObjetivos();
        return { success: true, message: res.message || 'Objetivo eliminado exitosamente' };
      } else {
        setError(res.message || 'Error al eliminar el objetivo');
        return { success: false, message: res.message || 'Error al eliminar el objetivo' };
      }
    } catch (err: any) {
      console.error(err);
      setError('Error al eliminar el objetivo');
      return { success: false, message: 'Error al eliminar el objetivo' };
    } finally {
      setLoadingObjetivos(false);
    }
  };


  // Cargar los objetivos cuando el hook se monta
  useEffect(() => {
    cargarObjetivos();
  }, []);

  return {
    objetivos,
    loadingObjetivos,
    error,
    successMessage,  // Devolvemos el mensaje de éxito
    cargarObjetivos,
    agregarObjetivo,
    editarObjetivo,
    eliminarObjetivo,
  };
};
