import api from './api';

const PROVEEDORES_URL = '/proveedores';

// GET /api/proveedores (opcionalmente filtrado por ciudad)
export const obtenerProveedores = async (ciudad) => {
  const params = ciudad ? { ciudad } : {};
  const respuesta = await api.get(PROVEEDORES_URL, { params });
  return respuesta.data;
};

// POST /api/proveedores (requiere rol ADMIN)
export const crearProveedor = async (datosProveedor) => {
  const respuesta = await api.post(PROVEEDORES_URL, datosProveedor);
  return respuesta.data;
};

// PATCH /api/proveedores/:id/calificacion
export const calificarProveedor = async (id, calificacion) => {
  const respuesta = await api.patch(`${PROVEEDORES_URL}/${id}/calificacion`, { calificacion });
  return respuesta.data;
};
