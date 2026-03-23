import axios from 'axios';

// URL base del backend - Ajustar según la configuración del servidor Tomcat
// Asumiendo que el backend corre en localhost:8080 y el contexto es OpticaDigital
const API_URL = 'https://bakend-optica.onrender.com/api/usuarios';

export const UsuarioService = {
    getUsuarios: async () => {
        try {
            // Nota: Si el backend no tiene CORS configurado, esto fallará desde el navegador.
            // Se puede necesitar configurar un proxy en package.json
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            throw error;
        }
    },

    createUsuario: async (usuario) => {
        try {
            const response = await axios.post(API_URL, usuario);
            return response.data;
        } catch (error) {
            console.error("Error al crear usuario:", error);
            throw error;
        }
    },

    updateUsuario: async (usuario) => {
        try {
            // Asumimos que el endpoint recibe el ID en la URL o en el cuerpo
            // Ajustar según la implementación real del backend Java
            const response = await axios.put(`${API_URL}/${usuario.id}`, usuario);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            throw error;
        }
    },

    deleteUsuario: async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            throw error;
        }
    }
};
