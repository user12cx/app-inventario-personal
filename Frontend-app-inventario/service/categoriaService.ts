import { instance } from "./api";

// Obtener todas las categorías
export const getCategorias = async (usuario_id) => {
  try {
    const response = await instance.get("/categorias/getCategoria", {
      params: { usuario_id }, // Enviar usuario_id como parámetro
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    throw error;
  }
};

// Gestionar Categorías: Agregar, Editar o Eliminar
export const gestionarCategoria = async (accion, usuario_id, categoria_id, nombre, tipo ) => {
  try {
    // Definir los datos a enviar en el cuerpo de la solicitud
    const response = await instance.post("/gestionarCategorias/gestionarCategorias", {
      accion,          // 1 = Agregar, 2 = Editar, 3 = Eliminar
      usuario_id,
      categoria_id,
      nombre,
      tipo
    });

    // Verificar el éxito de la operación
    if (response.data.success) {
      console.log(response.data.message);  // Mostrar el mensaje de éxito
      return response.data.message; // Devuelve el mensaje si la operación fue exitosa
    } else {
      console.error(response.data.error);  // Mostrar el error si la operación no fue exitosa
      return response.data.error; // Devuelve el mensaje de error si algo salió mal
    }
  } catch (error) {
    console.error("Error al gestionar categoría:", error);
    throw error;
  }
};



