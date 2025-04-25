import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, ScrollView } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { t } from 'i18next';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usehookUsuarios } from '@/hook/usehookUser';

interface UsuarioFormulario {
  firstName: string;
  lastName: string;
  name: string;
  apellidos: string;
  telefono: number;
  ocupacio:string;
  user: any;
  idUser: number;
  email: string;
  phone: string;
  company: string;
  password?: string;  // Contraseña opcional
  confirmPassword?: string;  // Confirmar contraseña también opcional
}

const AjusteScreen = () => {
  const { usuarios, manejarUsuario } = usehookUsuarios();
  const [usuarioActual, setUsuarioActual] = useState<UsuarioFormulario>();
  const [mostrarPassword, setMostrarPassword] = useState(false);

  useEffect(() => {
    const obtenerUsuario = async () => {
      const id = await AsyncStorage.getItem("usuario_id");
      if (id) {
        const user = usuarios.find(u => u.idUser === parseInt(id));
        if (user) setUsuarioActual(user);
      }
    };
    obtenerUsuario();
  }, [usuarios]);

  const schema = yup.object().shape({
    email: yup.string().email("Correo inválido").required("El email es obligatorio"),
    password: yup.string().min(6, "Mínimo 6 caracteres").notRequired(),  // Contraseña no obligatoria, solo si se cambia
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), ""], "Las contraseñas no coinciden"),
    firstName: yup.string().required("El nombre es obligatorio"),
    lastName: yup.string().required("El apellido es obligatorio"),
    phone: yup.string().required("El teléfono es obligatorio"),
    company: yup.string(),
  });

  const solicitarAutenticacion = async () => {
    const resultado = await LocalAuthentication.authenticateAsync({});
    if (resultado.success) setMostrarPassword(true);  // Si la autenticación es exitosa, mostrar los campos de contraseña
  };

  if (!usuarioActual) return <Text className="text-center mt-10 text-gray-500">Cargando...</Text>;

  return (
    <Formik
      initialValues={{
        email: usuarioActual.email,
        password: "",
        confirmPassword: "",
        firstName: usuarioActual.name,
        lastName: usuarioActual.apellidos,
        phone: usuarioActual.telefono?.toString() || "",
        company: usuarioActual.ocupacion || "",
      }}
      validationSchema={schema}
      onSubmit={async (values) => {
        const payload = {
          idUser: usuarioActual.idUser,
          name: values.firstName,
          apellidos: values.lastName,
          email: values.email,
          telefono: parseInt(values.phone),
          ocupacion: values.company,
          ...(values.password ? { password: values.password } : {})  // Solo incluir la contraseña si está presente
        };

        const response = await manejarUsuario("editar", payload);
        if (response.success) {
          Alert.alert("Perfil actualizado correctamente");
        } else {
          Alert.alert("Error", response.error || "No se pudo actualizar");
        }
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <ScrollView className="flex-1 bg-white dark:bg-slate-800 p-5">
          <Text className="text-2xl font-bold text-center mb-5 text-gray-800 dark:text-white">{t("titles.registro")}</Text>

          {/* Email */}
          <TextInput
            placeholder="Correo electrónico"
            className="border-b border-gray-300 dark:border-gray-400 py-2 mb-2 text-gray-800 dark:text-white"
            keyboardType="email-address"
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
          />
          {touched.email && errors.email && <Text className="text-red-500 text-xs">{errors.email}</Text>}

          {/* Contraseña nueva */}
          {mostrarPassword ? (
            <>
              <TextInput
                placeholder="Nueva contraseña"
                secureTextEntry
                className="border-b border-gray-300 dark:border-gray-400 py-2 mb-2 text-gray-800 dark:text-white"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
              />
              {touched.password && errors.password && <Text className="text-red-500 text-xs">{errors.password}</Text>}

              <TextInput
                placeholder="Confirmar nueva contraseña"
                secureTextEntry
                className="border-b border-gray-300 dark:border-gray-400 py-2 mb-2 text-gray-800 dark:text-white"
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
              />
              {touched.confirmPassword && errors.confirmPassword && <Text className="text-red-500 text-xs">{errors.confirmPassword}</Text>}
            </>
          ) : (
            <TouchableOpacity onPress={solicitarAutenticacion} className="mb-4">
              <Text className="dark:text-white">{t("perfil_atributes.password")}</Text>
            </TouchableOpacity>
          )}

          {/* Nombre */}
          <TextInput
            placeholder="Nombre"
            className="border-b border-gray-300 dark:border-gray-400 py-2 mb-2 text-gray-800 dark:text-white"
            value={values.firstName}
            onChangeText={handleChange("firstName")}
            onBlur={handleBlur("firstName")}
          />
          {touched.firstName && errors.firstName && <Text className="text-red-500 text-xs">{errors.firstName}</Text>}

          {/* Apellido */}
          <TextInput
            placeholder="Apellidos"
            className="border-b border-gray-300 dark:border-gray-400 py-2 mb-2 text-gray-800 dark:text-white"
            value={values.lastName}
            onChangeText={handleChange("lastName")}
            onBlur={handleBlur("lastName")}
          />
          {touched.lastName && errors.lastName && <Text className="text-red-500 text-xs">{errors.lastName}</Text>}

          {/* Teléfono */}
          <TextInput
            placeholder="Teléfono"
            keyboardType="phone-pad"
            className="border-b border-gray-300 dark:border-gray-400 py-2 mb-2 text-gray-800 dark:text-white"
            value={values.phone}
            onChangeText={handleChange("phone")}
            onBlur={handleBlur("phone")}
          />
          {touched.phone && errors.phone && <Text className="text-red-500 text-xs">{errors.phone}</Text>}

          {/* Empresa */}
          <TextInput
            placeholder="Empresa o lugar de trabajo"
            className="border-b border-gray-300 dark:border-gray-400 py-2 mb-5 text-gray-800 dark:text-white"
            value={values.company}
            onChangeText={handleChange("company")}
            onBlur={handleBlur("company")}
          />

          <TouchableOpacity onPress={handleSubmit} className="bg-[#5A8FCA] dark:bg-[#3B82F6] py-3 rounded-lg">
            <Text className="text-white text-center font-bold text-lg">{t("titles.ok")}</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </Formik>
  );
};

export default AjusteScreen;
