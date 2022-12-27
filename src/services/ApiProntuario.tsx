import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8765',
    timeout: 2000
  });

export const ApiRegistro = () => ({
    
})