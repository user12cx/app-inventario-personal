import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { router } from 'expo-router';
import { registerUser } from '../../../service/loginService'; 
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import FlashMessage from 'react-native-flash-message';

// ✅ Esquema de validación con Yup
const RegisterSchema = Yup.object().shape({
  nombre: Yup.string()
    .trim()
    .min(3, 'El nombre debe tener al menos 3 caracteres.')
    .required('El nombre es obligatorio.'),
  email: Yup.string()
    .trim()
    .matches(/^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com)$/, 'Solo se permiten correos @gmail.com o @hotmail.com.')
    .required('El correo es obligatorio.'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres.')
    .required('La contraseña es obligatoria.')
});

const RegisterScreen = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={{ nombre: '', email: '', password: '' }}
      validationSchema={RegisterSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const response = await registerUser(values.nombre.trim(), values.email.trim(), values.password);
          router.replace('/(Stack)/Login');
        } catch (error: any) {
          console.error(error.message || "Ocurrió un error en el registro.");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => 
      (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View className="flex-1 bg-[#ECF3FB]zz">
            <Image source={require("../../../assets/images/autentificacionlogin.png")} className="w-full" resizeMode="contain" />
          </View>

          <View className="w-full p-6 h-[500px] bg-[#ECF3FB] mt-4 relative bottom-5 gap-3">
            {/* Campo Nombre */}
            <Text className="text-neutral-400 text-lg">Nombre Usuario</Text>
            <TextInput 
              className="rounded-xl bg-white p-3 px-4 py-5" 
              value={values.nombre} 
              onChangeText={handleChange('nombre')}
              onBlur={handleBlur('nombre')}
            />
            {touched.nombre && errors.nombre && <Text className="text-red-500">{errors.nombre}</Text>}

            {/* Campo Correo */}
            <Text className="text-neutral-400 text-lg">Correo</Text>
            <TextInput 
              className="rounded-xl bg-white p-3 px-4 py-5" 
              value={values.email} 
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              keyboardType="email-address" 
              autoCapitalize="none"
            />
            {touched.email && errors.email && <Text className="text-red-500">{errors.email}</Text>}

            {/* Campo Contraseña */}
            <Text className="text-neutral-400 text-lg">Password</Text>
            <View className="rounded-lg bg-gray-100 flex-row items-center">
              <TextInput
                className="flex-1 bg-white px-3 py-5 rounded-xl"
                secureTextEntry={!showPassword}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
              />
              <TouchableOpacity className="absolute right-4" onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <Eye size={24} color="gray" /> : <EyeOff size={24} color="gray" />}
              </TouchableOpacity>
            </View>
            {touched.password && errors.password && <Text className="text-red-500">{errors.password}</Text>}

            {/* Botón de Registro */}
            <TouchableOpacity 
              className="bg-blue-500 py-3 rounded-lg mt-4" 
              onPress={() => handleSubmit()} 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white text-center text-lg">Registrar</Text>
              )}
            </TouchableOpacity>

            {/* Enlace de retorno */}
            <Text className="text-center mt-4">
              <Text className="text-blue-600 font-bold" onPress={() => router.push('/(Stack)/Login')}>
                Volver al Login
              </Text>
            </Text>
          </View>

          <FlashMessage position="top" />

        </ScrollView>
      )}
    </Formik>
  );
};

export default RegisterScreen;
