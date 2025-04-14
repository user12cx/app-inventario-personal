import { showMessage } from "react-native-flash-message";

const mostrarMensaje = (
  message: string,
  type: "success" | "danger" | "info" = "info", // Tipo de mensaje (success, danger, info)
  backgroundColor: string = 'rgba(255, 186, 186, 1)', // Fondo con opacidad
  color: string = '#D8000C', // Color del texto
  duration: number = 500 // Duración del mensaje
) => {
  showMessage({
    message,
    type,
    icon: type === "danger" ? "info" : "success", // Icono según el tipo
    duration,
    floating: true,
    position: 'top',
    backgroundColor, // Fondo con opacidad ajustable
    color, // Texto del mensaje
    style: {
      borderRadius: 8,
      marginHorizontal: 25,
      paddingVertical: 15,
      paddingHorizontal: 15,
      borderLeftWidth: 7,
      borderLeftColor: color, // Usamos el color del texto para la línea izquierda
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    titleStyle: {
      fontSize: 14,
      fontWeight: 'bold',
    },
  });
};

export default mostrarMensaje;
