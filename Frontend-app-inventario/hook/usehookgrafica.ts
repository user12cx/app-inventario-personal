import { Gasto, getGastosPorMes } from "@/service/graficaService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ChartData } from "react-native-chart-kit/dist/HelperTypes";

export const usehookGastos = (usuario_id: string) => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [{ data: [] }],
  });
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchGastos = async () => {
    try {
      setLoading(true);

      const usuario_id = await AsyncStorage.getItem("usuario_id");
      if (!usuario_id) {
        console.error("Error: usuario_id no encontrado en AsyncStorage.");
        setError("No se encontró usuario_id.");
        return;
      }

      const parsedUsuarioId = parseInt(usuario_id, 10);
      if (isNaN(parsedUsuarioId)) {
        console.error("Error: usuario_id no es un número válido.");
        setError("usuario_id no es un número válido.");
        return;
      }
      
      const response = await getGastosPorMes(usuario_id);
      const data: Gasto[] = response.result;

      const labels = data.map(item => item.mes);
      const gastos = data.map(item => item.total_gasto);

      setChartData({
        labels,
        datasets: [{ data: gastos }],
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error al obtener los gastos:", error.message);
        setError(`Error: ${error.message}`);
      } else {
        console.error("Error desconocido", error);
        setError("Error desconocido al obtener los gastos");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (usuario_id) {
      fetchGastos();
    }
  }, [usuario_id]);

  return { loading, chartData, error, refetch: fetchGastos };
};
