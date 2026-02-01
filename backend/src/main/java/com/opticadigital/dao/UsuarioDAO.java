package com.opticadigital.dao;

import com.opticadigital.model.Usuario;
import com.opticadigital.util.JPAUtil;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.TypedQuery;
import java.sql.SQLException;
import java.util.List;

/**
 * DAO para la entidad Usuario utilizando Hibernate (JPA).
 * Reemplaza las consultas JDBC directas por operaciones con EntityManager.
 */
public class UsuarioDAO {

    public UsuarioDAO() {
    }

    /**
     * Autentica un usuario por email y contraseña.
     */
    public Usuario login(String email, String password) throws SQLException {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            String jpql = "SELECT u FROM Usuario u WHERE u.email = :email AND u.password = :password";
            TypedQuery<Usuario> query = em.createQuery(jpql, Usuario.class);
            query.setParameter("email", email);
            query.setParameter("password", password);

            // getSingleResult lanza excepción si no encuentra nada, así que usamos
            // getResultList
            List<Usuario> resultados = query.getResultList();
            return resultados.isEmpty() ? null : resultados.get(0);
        } catch (Exception e) {
            throw new SQLException("Error al autenticar usuario con Hibernate", e);
        } finally {
            em.close();
        }
    }

    /**
     * Inserta un nuevo usuario en la base de datos.
     */
    public void insertUsuario(Usuario usuario) throws SQLException {
        EntityManager em = JPAUtil.getEntityManager();
        EntityTransaction tx = em.getTransaction();
        try {
            tx.begin();
            em.persist(usuario);
            tx.commit();
        } catch (Exception e) {
            if (tx.isActive())
                tx.rollback();
            throw new SQLException("Error al insertar usuario con Hibernate", e);
        } finally {
            em.close();
        }
    }

    /**
     * Busca un usuario por su ID.
     */
    public Usuario selectUsuario(int id) throws SQLException {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            return em.find(Usuario.class, id);
        } catch (Exception e) {
            throw new SQLException("Error al buscar usuario por ID con Hibernate", e);
        } finally {
            em.close();
        }
    }

    /**
     * Obtiene todos los usuarios.
     */
    public List<Usuario> selectAllUsuarios() throws SQLException {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            String jpql = "SELECT u FROM Usuario u";
            TypedQuery<Usuario> query = em.createQuery(jpql, Usuario.class);
            return query.getResultList();
        } catch (Exception e) {
            throw new SQLException("Error al listar usuarios con Hibernate", e);
        } finally {
            em.close();
        }
    }

    /**
     * Elimina un usuario por su ID.
     */
    public boolean deleteUsuario(int id) throws SQLException {
        EntityManager em = JPAUtil.getEntityManager();
        EntityTransaction tx = em.getTransaction();
        try {
            tx.begin();
            Usuario usuario = em.find(Usuario.class, id);
            if (usuario != null) {
                em.remove(usuario);
                tx.commit();
                return true;
            }
            tx.commit();
            return false;
        } catch (Exception e) {
            if (tx.isActive())
                tx.rollback();
            throw new SQLException("Error al eliminar usuario con Hibernate", e);
        } finally {
            em.close();
        }
    }

    /**
     * Actualiza los datos de un usuario existente.
     */
    public boolean updateUsuario(Usuario usuario) throws SQLException {
        EntityManager em = JPAUtil.getEntityManager();
        EntityTransaction tx = em.getTransaction();
        try {
            tx.begin();
            Usuario existingUsuario = em.find(Usuario.class, usuario.getId());
            if (existingUsuario != null) {
                existingUsuario.setNombre(usuario.getNombre());
                existingUsuario.setEmail(usuario.getEmail());
                existingUsuario.setPassword(usuario.getPassword());
                existingUsuario.setRol(usuario.getRol());
                // No actualizamos fechaRegistro
                em.merge(existingUsuario);
                tx.commit();
                return true;
            }
            tx.commit();
            return false;
        } catch (Exception e) {
            if (tx.isActive())
                tx.rollback();
            throw new SQLException("Error al actualizar usuario con Hibernate", e);
        } finally {
            em.close();
        }
    }
}
