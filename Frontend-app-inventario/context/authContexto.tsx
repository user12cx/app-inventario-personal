import { useEffect, createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserInfo = {
  idUser: number;
  email: string;
  usuario: string;
  password?: string; // opcional, porque no es necesario guardarla en el frontend
  name: string;
  apellidos: string;
  telefono: string;
  ocupacion: string;
};

type AuthContextType = {
  userInfo: UserInfo;
  setuserInfo: Dispatch<SetStateAction<UserInfo>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setuserInfo] = useState<UserInfo>({
    idUser: 0,
    email: "",
    usuario: "",
    name: "",
    apellidos: "",
    telefono: "",
    ocupacion: "",
  });

  useEffect(() => {
    // Recuperamos los datos del usuario desde AsyncStorage al iniciar la app
    const loadUserData = async () => {
      try {
        const storedUserInfo = await AsyncStorage.getItem("user_info");
        if (storedUserInfo) {
          // Si los datos existen, actualizamos el estado del usuario
          setuserInfo(JSON.parse(storedUserInfo));
        }
      } catch (error) {
        console.error("Error al recuperar los datos de AsyncStorage:", error);
      }
    };

    loadUserData(); // Cargamos los datos del usuario al iniciar la app
  }, []);

  return (
    <AuthContext.Provider value={{ userInfo, setuserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export default AuthProvider;
