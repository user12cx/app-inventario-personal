import { useEffect, useMemo, useState } from "react";

import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Dimensions,
  useColorScheme,
} from "react-native";

import CustomCardHome from "@/components/shared/CutsomCardHome";
import { LineChart } from "react-native-chart-kit";
import CartItem from "../../../components/shared/CartsHome";
import OrdenList from "@/components/shared/OrdenList";
import { ActivityIndicator } from "react-native-paper";
import HistorialModal from "../../../components/shared/HistorialModal";
import { usehookCuentas } from "@/hook/usehookCuentas";
import { usehookTransacciones } from "@/hook/usehookTransacciones";
import { usehookGastos } from "@/hook/usehookgrafica";
import useExitApp from "@/hook/useExitApp";

const screenWidth = Dimensions.get("window").width;


// Aquí es donde va el array de dependencias


const HomeScreen = () => {
  const isDarkMode = useColorScheme() === "dark";
  const chartConfig = useMemo(() => ({
    backgroundColor: isDarkMode ? "#0f172a" : "#F4F4F4",
    backgroundGradientFrom: isDarkMode ? "#0f172a" : "#F4F4F4",
    backgroundGradientTo: isDarkMode ? "#0f172a" : "#F4F4F4",
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
  }), [isDarkMode]); 

  useExitApp();


  const [refreshingActive, setRefreshingActive] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const { loading, datos, error } = usehookCuentas();
  const { datosTop, loadingTop, errorTop } = usehookTransacciones();

  // Usamos el hook de gastos, pasando el usuario_id
  const { loading: loadingGastos, chartData, error: errorGastos } = usehookGastos('usuario_id');

  const handleHistory = () => {
    setModalVisible(true);
    setRefreshingActive(true);
    setTimeout(() => setRefreshingActive(false), 3000);
  };

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshingActive} />}
      className="flex-1 dark:bg-slate-900"
    >
      <View className="gap-4 flex-1">
        <Text className="text-stone-400 text-center text-2xl mt-2 font-serif dark:text-stone-200">
          Navegate Dashboard
        </Text>

        {/* Accesos rápidos */}
        <View className="flex-row py-2 px-2 justify-evenly">
          <CustomCardHome fondo="buy" title="Gastos" icons="shoppingcart" iconSize={25} iconColor="#008000" ruta="gastos" />
          <CustomCardHome fondo="infoBold" title="Cuentas" icons="creditcard" iconSize={25} iconColor="#ff9c2a" ruta="targetas" />
          <CustomCardHome fondo="succes" title="Categorias" icons="appstore1" iconSize={25} iconColor="#9E9E9E" ruta="categorias" />
          <CustomCardHome fondo="violet" title="Metas" icons="rocket1" iconSize={25} iconColor="#efc7ea" ruta="objetivoAhorro" />
          <CustomCardHome fondo="primary" title="Ajustes" icons="solution1" iconSize={25} iconColor="#747bfa" ruta="ajustes" />
          <CustomCardHome fondo="infoRigth" title="App" icons="info" iconSize={25} iconColor="#5A8FCA" ruta="acercade" />

        </View>

        {/* Gráfico */}
        <View className="p-2">
          <Text className="text-[20px] font-bold mb-2 text-neutral-600 dark:text-white">Gastos Mensuales</Text>
          {loadingGastos ? (
            <ActivityIndicator size="large" color="#5A8FCA" />
          ) : errorGastos ? (
            <Text className="text-red-500">{errorGastos}</Text>
          ) : (
            <LineChart
              data={chartData}
              width={screenWidth - 20}
              height={200}
              yAxisLabel="$ "
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
          <Text className="text-[20px] ml-3 mb-3 text-neutral-600 dark:text-white">Cuentas Disponibles</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          >
            <View className="flex-row gap-3">
              {loading ? (
                <ActivityIndicator size="large" color="#5A8FCA" />
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
          <Text className="text-[20px] ml-3 mb-3 text-neutral-600 dark:text-white">Últimas Acciones</Text>
          {loadingTop ? (
            <ActivityIndicator size="large" color="#5A8FCA" />
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
