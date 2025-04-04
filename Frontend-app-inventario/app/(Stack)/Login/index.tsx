import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { Check, Eye, EyeOff } from "lucide-react-native";
import { router } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../../service/loginService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TerminosYCondiciones from "../../../components/shared/terminesisCondiciones";

interface LoginValues {
  input: string;
  password: string;
}

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    checkTermsAccepted();
  }, []);

  const checkTermsAccepted = async () => {
    const accepted = await AsyncStorage.getItem("termsAccepte");
    setAcceptedTerms(accepted === "true");
  };

  const handleAcceptTerms = async () => {
    await AsyncStorage.setItem("termsAccepte", "true");
    setAcceptedTerms(true);
    setShowModal(false);
  };

  const validationSchema = Yup.object().shape({
    input: Yup.string().required("Debe ingresar email o usuario"),
    password: Yup.string().min(6, "Mínimo 6 caracteres").required("La contraseña es obligatoria"),
  });

  const handleSubmit = async (values: LoginValues, { setSubmitting, setErrors }: any) => {
    if (!acceptedTerms) {
      Alert.alert("Debes aceptar los términos y condiciones.");
      setSubmitting(false);
      return;
    }

    try {
      const data = await loginUser(values.input, values.password);
      if (data.success && data.user) {
        await AsyncStorage.setItem("usuario_id", data.user.idUser.toString());
        Alert.alert("Inicio de sesión exitoso", `Bienvenido, ${data.user.usuario}`);
        router.push("/(Drawer)/Home");
      } else {
        throw new Error("Error en la autenticación.");
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.message || "Error al iniciar sesión";
      setErrors({ general: errorMessage });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <View className="flex-1 bg-slate-50">
        <Image source={require("../../../assets/images/phan-mem-tang-truong-ban-hang-lazada.png")} className="w-full" resizeMode="contain" />
      </View>

      <View className="w-full p-6 h-[400px] bg-slate-100 rounded-t-[40px] mt-4 relative bottom-5 gap-3">
        <Formik initialValues={{ input: "", password: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
            <>
              <Text className="text-neutral-400 text-lg">Usuario</Text>
              <TextInput placeholder="Email o usuario" className="rounded-xl bg-white p-3 px-4 py-5" onChangeText={handleChange("input")} onBlur={handleBlur("input")} value={values.input} />
              {touched.input && errors.input && <Text className="text-red-500">{errors.input}</Text>}

              <Text className="text-neutral-400 text-lg">Password</Text>
              <View className="rounded-lg bg-gray-100 flex-row items-center">
                <TextInput placeholder="Password" className="flex-1 bg-white px-3 py-5 relative rounded-xl" secureTextEntry={!showPassword} onChangeText={handleChange("password")} onBlur={handleBlur("password")} value={values.password} />
                <TouchableOpacity className="absolute right-4" onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Eye size={24} color="gray" /> : <EyeOff size={24} color="gray" />}
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && <Text className="text-red-500">{errors.password}</Text>}

              {/* Link para abrir términos y condiciones */}
              <TouchableOpacity className="flex-row items-center mt-3" onPress={() => setShowModal(true)}>
              {acceptedTerms && <Check size={20} color="green" className="mr-2" />} 
                <Text className="text-blue-500 text-center">Ver términos y condiciones</Text>
              </TouchableOpacity>

              {/* Botón de inicio de sesión (deshabilitado si no aceptó términos) */}
              <TouchableOpacity className={`py-3 rounded-lg mt-4 ${acceptedTerms ? "bg-blue-500" : "bg-gray-400"}`} onPress={() => handleSubmit()} disabled={!acceptedTerms || isSubmitting}>
                <Text className="text-white text-center text-lg">{isSubmitting ? "Cargando..." : "Iniciar Sesión"}</Text>
              </TouchableOpacity>

              {/* Botón para registrarse */}
              <TouchableOpacity className="mt-4" onPress={() => router.push("/(Stack)/register")}>
                <Text className="text-blue-500 text-center">¿No tienes cuenta? Regístrate</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>

      {/* Modal de Términos y Condiciones */}
      <TerminosYCondiciones visible={showModal} onClose={() => setShowModal(false)} onAccept={handleAcceptTerms} />
    </ScrollView>
  );
};

export default LoginScreen;
