import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomAhorro from '@/components/shared/CustomAhorro'
import { getObjetivosAhorro } from '@/service/objetivoService'
import { Unlock } from 'lucide-react-native'

interface Objecttype{
  key:number,
  id:number,
  usuario_id:number,
  nombre:string,
  monto_objetivo:number,
  monto_actual:number,
  fecha_limite:string

}
const ObjetivoAhorro = () => {

  const [datos, setdatos] = useState<Objecttype [] | []>([])
  const [error, seterror] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Llamando a la API...");
        const response = await getObjetivosAhorro();
        console.log("Respuesta de la API:", response);
        setdatos(response.result)

      } catch (error) {
        console.log("erro de cuentas", error);
        seterror(error)

      }
    };
    fetchData();
  }, [])

  return (
    <View>
      <Text className="text-xl text-center m-3 font-bold text-gray-500">
        <Text className="text-gray-500">📢 </Text>
        "No importa cuánto ganes, lo clave es "
        <Text className="text-green-500">cuánto guardas</Text>,
        <Text className="text-yellow-500"> cómo lo mueves</Text>
        y <Text className="text-red-500">qué tan inteligente</Text>
        lo haces crecer. 💸🌳
      </Text>
      {datos.map((item) => (
        <CustomAhorro
          key={item.id}
          title={item.nombre}
          montoActual={item.monto_actual}
          meta={item.monto_objetivo}
          fechaLimite={item.fecha_limite ? new Date(item.fecha_limite).toLocaleDateString() : "Sin fecha"} // 👈 Manejo de error
        />
      ))}

    </View>
  )
}

export default ObjetivoAhorro