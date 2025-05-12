import axios from 'axios';

// Reemplaza con la URL pública de tu backend en Azure
const API_URL = 'https://192.168.45.212:7000/api'; // ip de la red a la que te conectes

export const instance = axios.create({
    baseURL: API_URL,
    withCredentials: false, // Esto sigue funcionando si tu backend usa autenticación de cookies o sesiones
});
