import {
  View,
  Text,
  ScrollView,
  SectionList,
  RefreshControl,
  Dimensions,
} from "react-native";
import CustomCardHome from "@/components/shared/CutsomCardHome";
import { LineChart } from "react-native-chart-kit";
import CartItem from "../../../components/shared/CartsHome";
import OrdenList from "@/components/shared/OrdenList";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import HistorialModal from "../../../components/shared/HistorialModal";
import { usehookCuentas } from "@/hook/usehookCuentas";
import { usehookTransacciones } from "@/hook/usehookTransacciones";
import { usehookGastos } from "@/hook/usehookgrafica";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundColor: "#ffffff",
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 2,
  color: () => `#5e94c2`,
  labelColor: () => `#5e94c2`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#fff",
  },
  propsForLabels: {
    fontSize: 9,
    fontWeight: "bold",
    fill: "#5e94c2",
  },
};

const HomeScreen = () => {
  const [refreshingActive, setRefreshingActive] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const { loading, datos, error } = usehookCuentas();
  const { datosTop, loadingTop, errorTop } = usehookTransacciones();

  // Usamos el hook de gastos, pasando el usuario_id
  const { loading: loadingGastos, chartData, error: errorGastos } = usehookGastos("usuario_id_aqui");

  const handleHistory = () => {
    setModalVisible(true);
    setRefreshingActive(true);
    setTimeout(() => setRefreshingActive(false), 3000);
  };

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshingActive} />}
      className="flex-1"
    >
      <View className="gap-4 bg-white flex-1">
        <Text className="text-stone-400 text-center text-2xl mt-2 font-serif">
          Navegate Dashboard
        </Text>

        {/* Accesos rápidos */}
        <View className="flex-row py-2 px-2 justify-evenly">
          <CustomCardHome fondo="primary" title="Saldo" icons="table" iconSize={30} iconColor="#747bfc" ruta="saldo" />
          <CustomCardHome fondo="infoBold" title="Cuentas" icons="creditcard" iconSize={30} iconColor="#ff9c2a" ruta="targetas" />
          <CustomCardHome fondo="violet" title="Metas" icons="rocket1" iconSize={30} iconColor="#efc7ea" ruta="objetivoAhorro" />
          <CustomCardHome fondo="succes" title="Categorias" icons="appstore1" iconSize={30} iconColor="#9E9E9E" ruta="categorias" />
          <CustomCardHome fondo="buy" title="Gastos" icons="shoppingcart" iconSize={25} iconColor="#008000" ruta="gastos" />
          <CustomCardHome fondo="perf" title="Perfil" icons="solution1" iconSize={25} iconColor="#5A8FCA" ruta="ajustes" />
        </View>

        {/* Gráfico */}
        <View className="p-2 bg-white">
          <Text className="text-[20px] font-bold mb-2 text-neutral-600">Gastos Mensuales</Text>
          {loadingGastos ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : errorGastos ? (
            <Text className="text-red-500">{errorGastos}</Text>
          ) : (
            <LineChart
              data={chartData}
              width={screenWidth - 30}
              height={200}
              yAxisLabel="$"
              yAxisSuffix="k"
              yAxisInterval={1}
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          )}
        </View>

        {/* Cuentas disponibles */}
        <View>
          <Text className="text-[20px] ml-3 mb-3 text-neutral-600">Cuentas Disponibles</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          >
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

        {/* Últimas acciones */}
        <View>
          <Text className="text-[20px] ml-3 mb-3 text-neutral-600">Últimas Acciones</Text>
          {loadingTop ? (
            <Text className="text-center text-gray-500">Cargando...</Text>
          ) : errorTop ? (
            <Text className="text-center text-red-500">{errorTop}</Text>
          ) : (
            <OrdenList data={datosTop} />
          )}
        </View>

        {/* Ver más */}
        <View className="justify-center items-center pb-4">
          <Text className="text-amber-500 text-xl" onPress={handleHistory}>
            Ver Más +
          </Text>
          <HistorialModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
