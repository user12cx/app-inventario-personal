import { instance } from "./api"

export const getCuentas =  async(usuario_id)=>{
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