import { instance } from "./api"

export const getObjetivosAhorro =  async()=>{
  try {
    const response =  await instance.get("objetivos/getObjetivo");
    return response.data;
  } catch (error) {
    console.log("error al cargar las cuentas", error);
    throw error;
  }
}