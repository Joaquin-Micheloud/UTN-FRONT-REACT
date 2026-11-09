import api from './api';

const AUTH_URL = '/login';

export const login = async (email, password) => {
  const respuesta = await api.post(`${AUTH_URL}/login`, { email, password });
  localStorage.setItem('token', respuesta.data.token);
  return respuesta.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const estaAutenticado = () => Boolean(localStorage.getItem('token'));
