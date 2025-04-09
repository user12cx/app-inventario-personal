import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Gasto, getGastosPorMes } from "@/service/graficaService"; // Asegúrate de que esta función esté bien importada


interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
  }[];
}

export const usehookGastos = (usuario_id: string): { loading: boolean; chartData: ChartData; error: string | undefined } => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchGastos = async () => {
      try {
        setLoading(true);

        const usuario_id = await AsyncStorage.getItem("usuario_id");

        if (!usuario_id) {
          console.error("Error: usuario_id no encontrado en AsyncStorage.");
          setError("No se encontró usuario_id.");
          return;
        }
    
        // Si el valor es un string y el backend espera un número, convertirlo
        const parsedUsuarioId = parseInt(usuario_id, 10);
    
        // Verifica si la conversión fue exitosa
        if (isNaN(parsedUsuarioId)) {
          console.error("Error: usuario_id no es un número válido.");
          setError("usuario_id no es un número válido.");
          return;
        }
        
        const response = await getGastosPorMes(usuario_id);
        const data: Gasto[] = response.result;

        // Transformar los datos para el gráfico
        const labels = data.map(item => item.mes); // Meses (Ej. "Enero 2025")
        const gastos = data.map(item => item.total_gasto); // Gastos de cada mes

        setChartData({
          labels: labels,
          datasets: [
            {
              data: gastos,
            },
          ],
        });
      } catch (error: unknown) {
        // Manejamos el error de manera segura con `unknown`
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

    if (usuario_id) {
      fetchGastos();
    }
  }, [usuario_id]);

  return { loading, chartData, error };
};
