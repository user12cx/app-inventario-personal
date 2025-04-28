import 'react-native-reanimated';
import FlashMessage from 'react-native-flash-message';
import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '@/components/shared/CustomDrawerContent'; // Importa tu componente personalizado
import { Ionicons } from '@expo/vector-icons';
import { StatusBar, useColorScheme } from 'react-native'; // Importamos StatusBar
import "../../i18n";
import { t } from 'i18next';

export default function Layout() {
  const isDark = useColorScheme() === 'dark';
  return (

    <>
      {/* Cambia el color de la barra de estado */}

      <StatusBar
        backgroundColor={isDark ? "#0f172a" : "#5A8FCA"}
        barStyle={isDark ? "light-content" : "dark-content"}
      />

      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          drawerLabelStyle: {
            fontSize: 16,
            color: isDark ? "#fff" : "#000",
            fontWeight: "bold",
          },
          headerStyle: {
            backgroundColor: isDark ? "#0f172a" : "#5A8FCA",
          },
          drawerStyle: {
            backgroundColor: isDark ? "#0f172a" : "#fff", // <-- AQUÍ CAMBIA EL FONDO DEL DRAWER
          },
          headerTintColor: isDark ? "#fff" : "#fff", // Puedes ajustar si quieres un cambio
          headerShadowVisible: false,
          headerShown: true,
          drawerPosition: 'left',
          drawerType: "front",
        }}
      >
        <Drawer.Screen
          name="Home/index"
          options={{
            drawerLabel: t("language.title"),
            title: t("language.panel"),
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            )
          }}
        />

        <Drawer.Screen
          name="categorias/index"
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="grid-outline" size={size} color={color} />
            ),
            title: t("language.categorie"),
          }}
        />
        <Drawer.Screen
          name="gastos/index"
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="wallet-outline" size={size} color={color} />
            ),
            title: t("language.buy"),
          }}
        />


        <Drawer.Screen
          name="objetivoAhorro/index"
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="rocket-outline" size={size} color={color} />
            ),
            title: t("language.met"),
          }}
        />
        <Drawer.Screen
          name="targetas/index"
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="logo-dropbox" size={size} color={color} />
            ),
            title: t("language.cuenta"),
          }}
        />
        <Drawer.Screen
          name="ajustes/index"
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="accessibility-outline" size={size} color={color} />
            ),
            title: t("language.settings"),
          }}
        />
        <Drawer.Screen
          name="acercade/index"
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="apps-outline" size={size} color={color} />
            ),
            title: t("language.app"),
          }}

        />
        <FlashMessage position="top" />

      </Drawer>
    </>
  );
}
