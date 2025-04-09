import React from 'react'
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

const AjuesteScrenn = () => {

  const validationSchema = yup.object().shape({
    email: yup.string().email("Correo inválido").required("El email es obligatorio"),
    password: yup.string().min(6, "Mínimo 6 caracteres").required("La contraseña es obligatoria"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), ""], "Las contraseñas no coinciden")
      .required("Confirma tu contraseña"),
    firstName: yup.string().required("El nombre es obligatorio"),
    lastName: yup.string().required("El apellido es obligatorio"),
    phone: yup
      .string()
      .matches(/^\d{3}-\d{3}-\d{4}$/, "Formato: 123-456-7890")
      .required("El teléfono es obligatorio"),
    company: yup.string().notRequired(),
  });

  return (
 <Formik
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        phone: "",
        company: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        Alert.alert("Registro Exitoso", JSON.stringify(values, null, 2));
      }}
    >
      {({ handleChange, handleBlur, values, errors, touched }) => (
        <View className="flex-1 bg-white p-5 justify-center">
          <Text className="text-2xl font-bold text-center mb-5">Registro</Text>

          {/* Email */}
          <TextInput
            className="border-b border-gray-300 py-2 text-lg mb-2"
            placeholder="Correo electrónico"
            keyboardType="email-address"
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
          />
          {touched.email && errors.email && <Text className="text-red-500 text-xs">{errors.email}</Text>}

          {/* Contraseña */}
          <TextInput
            className="border-b border-gray-300 py-2 text-lg mb-2"
            placeholder="Contraseña"
            secureTextEntry
            value={values.password}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
          />
          {touched.password && errors.password && <Text className="text-red-500 text-xs">{errors.password}</Text>}

          {/* Confirmar contraseña */}
          <TextInput
            className="border-b border-gray-300 py-2 text-lg mb-2"
            placeholder="Confirmar contraseña"
            secureTextEntry
            value={values.confirmPassword}
            onChangeText={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <Text className="text-red-500 text-xs">{errors.confirmPassword}</Text>
          )}

          {/* Nombre */}
          <TextInput
            className="border-b border-gray-300 py-2 text-lg mb-2"
            placeholder="Nombre"
            value={values.firstName}
            onChangeText={handleChange("firstName")}
            onBlur={handleBlur("firstName")}
          />
          {touched.firstName && errors.firstName && <Text className="text-red-500 text-xs">{errors.firstName}</Text>}

          {/* Apellido */}
          <TextInput
            className="border-b border-gray-300 py-2 text-lg mb-2"
            placeholder="Apellidos"
            value={values.lastName}
            onChangeText={handleChange("lastName")}
            onBlur={handleBlur("lastName")}
          />
          {touched.lastName && errors.lastName && <Text className="text-red-500 text-xs">{errors.lastName}</Text>}

          {/* Teléfono */}
          <TextInput
            className="border-b border-gray-300 py-2 text-lg mb-2"
            placeholder="Teléfono"
            keyboardType="phone-pad"
            value={values.phone}
            onChangeText={handleChange("phone")}
            onBlur={handleBlur("phone")}
          />
          {touched.phone && errors.phone && <Text className="text-red-500 text-xs">{errors.phone}</Text>}

          {/* Empresa */}
          <TextInput
            className="border-b border-gray-300 py-2 text-lg mb-5"
            placeholder="Empresa o lugar de trabajo"
            value={values.company}
            onChangeText={handleChange("company")}
            onBlur={handleBlur("company")}
          />
          <TouchableOpacity
            className="bg-[#5A8FCA] py-3 rounded-lg"
            // onPress={handleSubmit}
          >
            <Text className="text-white text-center font-bold text-lg">Registrarse</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  )
}

export default AjuesteScrenn