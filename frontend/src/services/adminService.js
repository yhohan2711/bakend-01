import axios from 'axios';

// URL base del backend
const API_URL = 'https://bakend-optica.onrender.com/api/usuarios';

export const AdminService = {
    /**
     * Obtener todos los administradores (usuarios con rol 'admin' o 'empleado')
     */
    getAdministradores: async () => {
        try {
            const response = await axios.get(API_URL);
            // Filtrar usuarios con rol 'admin' o 'empleado'
            const admins = response.data.filter(user => user.rol === 'admin' || user.rol === 'empleado');
            return admins;
        } catch (error) {
            console.error("Error al obtener administradores:", error);
            throw error;
        }
    },

    /**
     * Crear un nuevo administrador
     */
    createAdministrador: async (adminData) => {
        try {
            const admin = {
                nombre: adminData.usuario,
                email: adminData.email || `${adminData.usuario}@opticadigital.com`,
                password: adminData.password,
                rol: adminData.rol || 'empleado' // Por defecto 'empleado'
            };
            const response = await axios.post(API_URL, admin);
            return response.data;
        } catch (error) {
            console.error("Error al crear administrador:", error);
            if (error.response && error.response.status === 409) {
                throw new Error("El usuario ya está registrado");
            }
            throw error;
        }
    },

    /**
     * Actualizar un administrador existente
     */
    updateAdministrador: async (id, adminData) => {
        try {
            const admin = {
                id: id,
                nombre: adminData.usuario,
                email: adminData.email,
                password: adminData.password,
                rol: adminData.rol
            };
            const response = await axios.put(`${API_URL}/${id}`, admin);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar administrador:", error);
            throw error;
        }
    },

    /**
     * Eliminar un administrador
     */
    deleteAdministrador: async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error("Error al eliminar administrador:", error);
            throw error;
        }
    },

    /**
     * Login de administrador
     */
    login: async (username, password) => {
        try {
            const response = await axios.get(API_URL);
            const user = response.data.find(u =>
                (u.nombre === username || u.email === username) &&
                u.password === password &&
                (u.rol === 'admin' || u.rol === 'empleado')
            );

            if (user) {
                // Guardar sesión en localStorage
                localStorage.setItem('currentUser', JSON.stringify(user));
                return user;
            } else {
                throw new Error("Credenciales inválidas");
            }
        } catch (error) {
            console.error("Error en login:", error);
            throw error;
        }
    },

    /**
     * Logout
     */
    logout: () => {
        localStorage.removeItem('currentUser');
    },

    /**
     * Obtener usuario actual
     */
    getCurrentUser: () => {
        const userStr = localStorage.getItem('currentUser');
        return userStr ? JSON.parse(userStr) : null;
    }
};
