package com.opticadigital.util;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

/**
 * Clase utilitaria para manejar la EntityManagerFactory de JPA.
 * Implementa el patrón Singleton para la fábrica.
 */
public class JPAUtil {
    private static final String PERSISTENCE_UNIT_NAME = "OpticaDigitalPU";
    private static EntityManagerFactory factory;

    public static EntityManagerFactory getEntityManagerFactory() {
        if (factory == null) {
            try {
                factory = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME);
            } catch (Exception e) {
                System.err.println("Error al iniciar EntityManagerFactory: " + e.getMessage());
                throw new ExceptionInInitializerError(e);
            }
        }
        return factory;
    }

    public static EntityManager getEntityManager() {
        return getEntityManagerFactory().createEntityManager();
    }

    public static void shutdown() {
        if (factory != null) {
            factory.close();
        }
    }
}
