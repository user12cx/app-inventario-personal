import 'react-native-reanimated';

import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '@/components/shared/CustomDrawerContent'; // Importa tu componente personalizado
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'react-native'; // Importamos StatusBar
import "../../i18n";

export default function Layout() {

  return (

    <>
      {/* Cambia el color de la barra de estado */}

      <StatusBar backgroundColor="#5A8FCA" barStyle="default" />

      <Drawer

        drawerContent={CustomDrawerContent} // Personaliza el contenido del Drawer
        screenOptions={{
          drawerLabelStyle: {
            fontSize: 16, // Aumenta el tamaño del texto
            color: "#000", // Texto en negro
            fontWeight: "bold", // Opcional para que resalte más
          },

          headerStyle: {
            backgroundColor: "#5A8FCA", // Color de los encabezados
          },
          headerTintColor: "#fff", // Color del texto del encabezado
          headerShadowVisible: false,
          headerShown: true, // Muestra el encabezado
          drawerPosition: 'left', // Posición del Drawer (izquierda o derecha)
          drawerType: "front", // Hace que el Drawer cubra toda la pantalla sin margen
        }}
      >
        <Drawer.Screen
          name="Home/index"
          options={{
            drawerLabel: 'Home',
            title: 'Panel de Control',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            )
          }}
        />
        <Drawer.Screen
          name="saldo/index"
          options={{
            drawerLabel: 'Saldo',
            title: 'Saldo del Mes',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="cash-outline" size={size} color={color} />
            )
          }}
        />

        <Drawer.Screen
          name="categorias/index"
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="grid-outline" size={size} color={color} />
            ),
            title: 'Categorias',
          }}
        />
        <Drawer.Screen
          name="gastos/index"
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="wallet-outline" size={size} color={color} />
            ),
            drawerLabel: 'Gastos',
            title: 'Resumen  de Gastos',
          }}
        />


        <Drawer.Screen
          name="objetivoAhorro/index"
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="rocket-outline" size={size} color={color} />
            ),
            drawerLabel: 'Metas a Futuro',
            title: 'Pendientes ',
          }}
        />
        <Drawer.Screen
          name="targetas/index"
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="logo-dropbox" size={size} color={color} />
            ),
            drawerLabel: 'Targetas',
            title: 'Disponibles',
          }}
        />
        <Drawer.Screen
          name="ajustes/index"
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="accessibility-outline" size={size} color={color} />
            ),
            drawerLabel: 'Ajustes',
            title: 'Ajustar Perfil',
          }}
        />
        <Drawer.Screen
          name="acercade/index"
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="apps-outline" size={size} color={color} />
            ),
            drawerLabel: 'Acerca De  ?',
            title: 'App',
          }}
        />

      </Drawer>
    </>
  );
}
