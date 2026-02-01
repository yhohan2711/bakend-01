import axios from 'axios';

// URL base del backend
const API_URL = 'http://localhost:8080/opticadigital/api/usuarios';

export const ClienteService = {
    /**
     * Obtener todos los clientes (usuarios con rol 'cliente')
     */
    getClientes: async () => {
        try {
            const response = await axios.get(API_URL);
            // Filtrar solo los usuarios con rol 'cliente'
            const clientes = response.data.filter(user => user.rol === 'cliente');
            return clientes;
        } catch (error) {
            console.error("Error al obtener clientes:", error);
            throw error;
        }
    },

    /**
     * Obtener un cliente por ID
     */
    getClienteById: async (id) => {
        try {
            const response = await axios.get(API_URL);
            const cliente = response.data.find(user => user.id === parseInt(id) && user.rol === 'cliente');
            return cliente;
        } catch (error) {
            console.error("Error al obtener cliente:", error);
            throw error;
        }
    },

    /**
     * Crear un nuevo cliente
     */
    createCliente: async (clienteData) => {
        try {
            // Asegurar que el rol sea 'cliente'
            const cliente = {
                nombre: clienteData.nombre,
                email: clienteData.email,
                telefono: clienteData.telefono || '',
                direccion: clienteData.direccion || '',
                password: clienteData.password || '123456', // Password por defecto
                rol: 'cliente'
            };
            const response = await axios.post(API_URL, cliente);
            return response.data;
        } catch (error) {
            console.error("Error al crear cliente:", error);
            if (error.response && error.response.status === 409) {
                throw new Error("El email ya está registrado");
            }
            throw error;
        }
    },

    /**
     * Actualizar un cliente existente
     */
    updateCliente: async (id, clienteData) => {
        try {
            const cliente = {
                id: id,
                nombre: clienteData.nombre,
                email: clienteData.email,
                telefono: clienteData.telefono || '',
                direccion: clienteData.direccion || '',
                password: clienteData.password || '123456',
                rol: 'cliente'
            };
            const response = await axios.put(`${API_URL}/${id}`, cliente);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar cliente:", error);
            throw error;
        }
    },

    /**
     * Eliminar un cliente
     */
    deleteCliente: async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error("Error al eliminar cliente:", error);
            throw error;
        }
    }
};
