import {
    View, Text, Modal, TextInput, TouchableOpacity, Animated, TouchableWithoutFeedback
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { gestionarCategoria } from "@/service/categoriaService";  // Asegúrate de importar correctamente tu función de servicio

const ModalCat = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const scaleAnim = useRef(new Animated.Value(0.5)).current; // Inicializa en escala pequeña
    const opacityAnim = useRef(new Animated.Value(0)).current; // Inicializa invisible

    const [nombre, setNombre] = useState("");
    const [usuarioId, setUsuarioId] = useState(2); // Suponiendo que ya tienes el ID del usuario
    const [tipo, setTipo] = useState("Ingreso"); // El tipo de acción: "Ingreso" o "Gasto"
    const [message, setMessage] = useState(""); // Mensaje para mostrar si hubo éxito o error

    // Función para agregar categoría
    const handleAddCategory = async () => {
        try {
          // Enviamos los datos al backend
          const result = await gestionarCategoria(1, usuarioId, null, nombre, tipo); // 1 = Agregar
          
          // Si la respuesta es exitosa, mostramos el mensaje
          if (result.success) {
            setMessage("Categoría agregada con éxito.");
            setTimeout(() => {
                closeModal();  // Cerramos el modal después de 2 segundos
            }, 2000);
          } else {
            setMessage(result.error || "Error al agregar la categoría");
          }
        } catch (error) {
          setMessage("Error al agregar la categoría");
        }
      };

    // Función para abrir el modal con animaciones
    const openModal = () => {
        setModalVisible(true);
        Animated.parallel([
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 300, // Duración de la animación
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
            }),
        ]).start();
    };

    // Función para cerrar el modal con animaciones
    const closeModal = () => {
        Animated.parallel([
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 200, // Desvanece el modal
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 0.5,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => setModalVisible(false));
    };

    return (
        <View className="items-end mr-10">

            {/* Botón para abrir el modal */}
            <TouchableOpacity
                className=" bg-blue-500 w-14 h-14 rounded-full flex items-center justify-center absolute "
                onPress={openModal}
            >
                <Text className="text-white text-4xl">+</Text>
            </TouchableOpacity>


            {/* Modal */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="none" // Desactivamos animación predeterminada
                onRequestClose={closeModal}
            >
                {/* Cierra el modal al tocar afuera */}
                <TouchableWithoutFeedback onPress={closeModal}>
                    <Animated.View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "rgba(0,0,0,0.5)",
                            opacity: opacityAnim, // Opacidad animada
                        }}
                    >
                        <Animated.View
                            style={{
                                transform: [{ scale: scaleAnim }], // Escala animada
                                backgroundColor: "white",
                                padding: 24,
                                borderRadius: 10,
                                width: 300,
                            }}
                        >
                            <Text className="text-lg font-bold mb-2 text-gray-500">Agregar Categoría</Text>

                            {/* Input de categoría */}
                            <TextInput
                                className="border-b mb-4  text-xl"
                                value={nombre}
                                onChangeText={setNombre}
                                placeholder="Nombre de la categoría"
                            />

                            <Text className="text-lg font-bold mb-2 text-gray-500">Tipo</Text>

                            {/* Input de tipo (Ingreso o Gasto) */}
                            <TextInput
                                className="border-b mb-4  text-xl"
                                value={tipo}
                                onChangeText={setTipo}
                                placeholder="Tipo (Ingreso o Gasto)"
                            />

                            {/* Botón Guardar */}
                            <TouchableOpacity
                                className="bg-cyan-500 px-4 py-3 rounded"
                                onPress={handleAddCategory}
                            >
                                <Text className="text-white text-center">Guardar</Text>
                            </TouchableOpacity>

                            {/* Mostrar mensaje de éxito o error */}
                            {message && (
                                <Text className="text-center mt-4 text-lg">{message}</Text>
                            )}
                        </Animated.View>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

export default ModalCat;
