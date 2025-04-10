import axios from 'axios';

const API_URL = 'http://192.168.0.101:7000/api'; // Asegúrate de que la URL sea correcta

export const instance = axios.create({
    baseURL: API_URL,
    withCredentials:true,
    
});

 