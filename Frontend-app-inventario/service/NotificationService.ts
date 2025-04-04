import Toast from "react-native-toast-message";

/**
 * ✅ Mostrar un mensaje de éxito
 * @param message Mensaje a mostrar
 */
export const showSuccessToast = (message: string) => {
  Toast.show({
    type: "success",
    text1: "Éxito",
    text2: message,
    position: "top",
    visibilityTime: 3000,
  });
};

/**
 * ❌ Mostrar un mensaje de error
 * @param message Mensaje a mostrar
 */
export const showErrorToast = (message: string) => {
  Toast.show({
    type: "error",
    text1: "Error",
    text2: message,
    position: "top",
    visibilityTime: 3000,
  });
};

/**
 * ⚠️ Mostrar una advertencia
 * @param message Mensaje a mostrar
 */
export const showWarningToast = (message: string) => {
  Toast.show({
    type: "info",
    text1: "Advertencia",
    text2: message,
    position: "top",
    visibilityTime: 3000,
  });
};

/**
 * ℹ️ Mostrar un mensaje informativo
 * @param message Mensaje a mostrar
 */
export const showInfoToast = (message: string) => {
  Toast.show({
    type: "info",
    text1: "Información",
    text2: message,
    position: "top",
    visibilityTime: 3000,
  });
};

/**
 * ✅ Alerta de inicio de sesión exitoso
 * @param username Nombre del usuario
 */
export const showLoginSuccessToast = (username: string) => {
  Toast.show({
    type: "success",
    text1: "Inicio de sesión exitoso",
    text2: `Bienvenido, ${username}`,
    position: "top",
    visibilityTime: 3000,
  });
};

/**
 * ❌ Error al iniciar sesión
 */
export const showLoginErrorToast = () => {
  Toast.show({
    type: "error",
    text1: "Error",
    text2: "Correo o contraseña incorrectos.",
    position: "top",
    visibilityTime: 3000,
  });
};

/**
 * ⚠️ Error de conexión con el backend
 */
export const showConnectionErrorToast = () => {
  Toast.show({
    type: "error",
    text1: "Error de conexión",
    text2: "No se pudo conectar con el servidor. Verifica tu conexión a internet.",
    position: "top",
    visibilityTime: 3000,
  });
};
