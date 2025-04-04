import { View, Text, ScrollView, SectionList, RefreshControl } from 'react-native'
import CutsomCardHome from '@/components/shared/CutsomCardHome'
import axios, { } from 'axios'
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import CartItem from '../../../components/shared/CartsHome';
import OrdenList from '@/components/shared/OrdenList';
import { useEffect, useState } from 'react';
import { getCuentas } from '@/service/cuentaService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';
import { get_top_acc, OrdenItem } from '@/service/transaccionesService';
import { FontAwesome } from '@expo/vector-icons';
import HistorialModal from "../../../components/shared/HistorialModal";
const screenWidth = Dimensions.get("window").width;



const data = {
  labels: ["Enero", "Febrero", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ],
  legend: ["Rainy Days"] // optional
};
const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};



interface ObjectCenta {
  idCuenta: number,
  key: number,
  // usuario_id?: string,
  nombre: string,
  saldo: number,
  estado: string,
}

const HomeScreen = () => {

  const [datos, setDatos] = useState<ObjectCenta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [datosTop, setDatosTop] = useState<OrdenItem[]>([]);
  const [refreshingActive, setrefreshingActive] = useState(false)

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Obtener usuario_id de AsyncStorage
        const usuario_id = await AsyncStorage.getItem("usuario_id");
        if (!usuario_id) {
          console.error("Error: usuario_id no encontrado en AsyncStorage.");
          setError("No se encontró usuario_id.");
          return;
        }

        // Convertir usuario_id a número y llamar a la API
        const response = await getCuentas(parseInt(usuario_id, 10));
        setDatos(response.result || []);
      } catch (error: any) {
        console.error("Error al obtener cuentas:", error);
        setError(error.message || "Error desconocido.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Obtener usuario_id de AsyncStorage
        const usuario_id = await AsyncStorage.getItem("usuario_id");

        if (!usuario_id) {
          throw new Error("No se encontró usuario_id en AsyncStorage.");
        }

        // Llamar a la API con usuario_id convertido a número
        const response = await get_top_acc(parseInt(usuario_id, 10));

        // console.log("Respuesta de la API:", response);

        // Validar que la respuesta es un array antes de asignarlo
        if (!Array.isArray(response)) {
          throw new Error("Los datos recibidos no son válidos.");
        }
        setDatosTop(response);


      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error al obtener datos:", error.message);
          setError(error.message);
        } else {
          console.error("Error desconocido al obtener datos");
          setError("Error desconocido.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleHistory = () => {
    setModalVisible(true);
    setrefreshingActive(true)
    setTimeout(() => {
      setrefreshingActive(false)
    }, 3000)
  }
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshingActive} />
      }

      className='flex-1 '
    >
      <View className=' gap-4  bg-white flex-1'>

        <Text className='text-stone-400 text-center text-2xl mt-2 font-serif'>Navegate Dashorad</Text>
        {/* Card customButtom */}
        <View className=' flex-row py-2 px-2 justify-evenly'>

          <CutsomCardHome
            fondo='primary'
            title="Saldo"
            icons="table"
            iconSize={30}
            iconColor='#747bfc'
            ruta='saldo'
          />
          <CutsomCardHome
            fondo='infoBold'
            title="Cuentas"
            icons="creditcard"
            iconSize={30}
            iconColor='#ff9c2a'
            ruta='targetas'
          />
          <CutsomCardHome
            fondo='violet'
            title="Metas"
            icons="rocket1"
            iconSize={30}
            iconColor='#efc7ea'
            ruta='objetivoAhorro'
          />
          <CutsomCardHome
            fondo='succes'
            title="Categorias"
            icons="appstore1"
            iconSize={30}
            iconColor='#9E9E9E'
            ruta='categorias'
          />
          <CutsomCardHome
            fondo='buy'
            title="Gastos"
            icons="shoppingcart"
            iconSize={25}
            iconColor='#008000'
            ruta='gastos'
          />
        </View>

        {/* Estadisticas grafico */}
        <View className='p-2 bg-white'>
          <Text className='text-[20px] font-bold mb-2 text-neutral-600'>Gastos Mensuales</Text>
          <LineChart
            data={{
              labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={Dimensions.get('window').width - 30} // Ajusta el ancho
            height={200}
            yAxisLabel='$'
            yAxisSuffix='k'
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: '#ffffff', // Fondo blanco
              backgroundGradientFrom: '#ffffff', // Sin degradado
              backgroundGradientTo: '#ffffff', // Sin degradado
              decimalPlaces: 2,
              color: (opacity = 1) => `#5e94c2`, // Color de la línea (azul)
              labelColor: (opacity = 1) => `#5e94c2`, // Color de las etiquetas (azul)
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#fff', // Borde blanco para los puntos
              },
              propsForLabels: {
                fontSize: 12,
                fontWeight: 'bold',
                fill: '#5e94c2', // Color de los números y meses (azul)
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>

        {/* cartas reutilizables */}
        <View>
          <Text className="text-[20px] ml-3 mb-3 text-neutral-600">Cuentas Disponibles</Text>

          {/* Scroll horizontal */}
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10 }}>

            <View className="flex-row gap-3">
              {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : datos.length > 0 ? (
                datos.map((item) => (
                  <CartItem
                    key={item.idCuenta}
                    title={item.nombre}
                    subtitle={item.estado}
                    price={`$ ${item.saldo}`}
                  />
                ))
              ) : (
                <Text>No hay cuentas disponibles.</Text>
              )}
            </View>



          </ScrollView>
        </View>

        {/* gastos recientes */}
        <View>
          <Text className="text-[20px] ml-3 mb-3 text-neutral-600">Últimas Acciones</Text>

          {loading ? (
            <Text className="text-center text-gray-500">Cargando...</Text>
          ) : error ? (
            <Text className="text-center text-red-500">{error}</Text>
          ) : (

            <OrdenList data={datosTop} />
            // 
          )}
        </View>

        {/* boton ver mas */}
        <View className="justify-center items-center pb-4">
          <Text className="text-amber-500 text-xl" onPress={handleHistory}> Ver Más + </Text>
          <HistorialModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        </View>

      </View>

    </ScrollView>

  )
}

export default HomeScreen
