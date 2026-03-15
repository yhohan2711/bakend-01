package com.opticadigital.dao;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;
import com.opticadigital.model.Usuario;
import com.opticadigital.util.MongoDBUtil;
import org.bson.conversions.Bson;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * DAO para la entidad Usuario utilizando MongoDB.
 * Reemplaza la implementación de Hibernate (JPA).
 */
public class UsuarioDAO {
    private final MongoCollection<Usuario> collection;

    public UsuarioDAO() {
        // Obtenemos la colección "usuarios" mapeada a la clase Usuario
        this.collection = MongoDBUtil.getDatabase().getCollection("usuarios", Usuario.class);
    }

    /**
     * Autentica un usuario por email y contraseña.
     */
    public Usuario login(String email, String password) throws SQLException {
        try {
            Bson filter = Filters.and(
                    Filters.eq("email", email),
                    Filters.eq("password", password));
            return collection.find(filter).first();
        } catch (Exception e) {
            e.printStackTrace();
            throw new SQLException("Error al autenticar usuario con MongoDB: " + e.getMessage(), e);
        }
    }

    /**
     * Inserta un nuevo usuario en la base de datos.
     */
    public void insertUsuario(Usuario usuario) throws SQLException {
        try {
            // En MongoDB, si usamos un POJO con un campo 'id', este se mapea a '_id' por defecto.
            // Para encontrar el ID máximo, ordenamos por '_id' de forma descendente.
            if (usuario.getId() <= 0) {
                Usuario ultimo = collection.find().sort(com.mongodb.client.model.Sorts.descending("_id")).first();
                int nuevoId = (ultimo != null) ? ultimo.getId() + 1 : 1;
                usuario.setId(nuevoId);
            }
            collection.insertOne(usuario);
        } catch (Exception e) {
            e.printStackTrace();
            throw new SQLException("Error al insertar usuario con MongoDB: " + e.getMessage(), e);
        } finally {
            // No es necesario cerrar nada aquí ya que MongoDB maneja el pool de conexiones
        }
    }

    /**
     * Busca un usuario por su ID.
     */
    public Usuario selectUsuario(int id) throws SQLException {
        try {
            return collection.find(Filters.eq("_id", id)).first();
        } catch (Exception e) {
            e.printStackTrace();
            throw new SQLException("Error al buscar usuario por ID con MongoDB: " + e.getMessage(), e);
        }
    }

    /**
     * Obtiene todos los usuarios.
     */
    public List<Usuario> selectAllUsuarios() throws SQLException {
        try {
            List<Usuario> usuarios = new ArrayList<>();
            collection.find().into(usuarios);
            return usuarios;
        } catch (Exception e) {
            e.printStackTrace();
            throw new SQLException("Error al listar usuarios con MongoDB: " + e.getMessage(), e);
        }
    }

    /**
     * Elimina un usuario por su ID.
     */
    public boolean deleteUsuario(int id) throws SQLException {
        try {
            return collection.deleteOne(Filters.eq("_id", id)).getDeletedCount() > 0;
        } catch (Exception e) {
            e.printStackTrace();
            throw new SQLException("Error al eliminar usuario con MongoDB: " + e.getMessage(), e);
        }
    }

    /**
     * Actualiza los datos de un usuario existente.
     */
    public boolean updateUsuario(Usuario usuario) throws SQLException {
        try {
            Bson filter = Filters.eq("_id", usuario.getId());
            Bson updates = Updates.combine(
                    Updates.set("nombre", usuario.getNombre()),
                    Updates.set("email", usuario.getEmail()),
                    Updates.set("password", usuario.getPassword()),
                    Updates.set("rol", usuario.getRol()));
            return collection.updateOne(filter, updates).getModifiedCount() > 0;
        } catch (Exception e) {
            e.printStackTrace();
            throw new SQLException("Error al actualizar usuario con MongoDB: " + e.getMessage(), e);
        }
    }
}
