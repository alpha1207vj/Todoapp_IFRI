import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // ton Laravel backend
  withCredentials: true, // si tu utilises Sanctum pour auth
});

export default api;


import api from './api';

export const getTaches = async () => (await api.get('/taches')).data;
export const createTache = async text => (await api.post('/taches', { text })).data;
export const updateTache = async (id, completed) => (await api.put(`/taches/${id}`, { completed })).data;
export const deleteTache = async id => (await api.delete(`/taches/${id}`)).data;
