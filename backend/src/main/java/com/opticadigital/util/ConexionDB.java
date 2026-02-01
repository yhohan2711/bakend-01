package com.opticadigital.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

/**
 * Clase Singleton para manejar la conexión a la base de datos MySQL.
 * 
 * SOPORTA DOS MÉTODOS DE CONEXIÓN:
 * 1. JNDI DataSource (RECOMENDADO para servidor Tomcat en producción)
 * 2. Conexión Directa (Fallback para desarrollo local)
 */
public class ConexionDB {

    // Configuración para conexión JNDI (método recomendado en servidor)
    private static final String JNDI_NAME = "java:comp/env/jdbc/opticadigitalDB";

    // Configuración de la Base de Datos para conexión directa (fallback)
    // Compatible con XAMPP MySQL
    private static final String URL = "jdbc:mysql://localhost:3306/opticadigital_db?" +
            "useSSL=false&" +
            "serverTimezone=UTC&" +
            "allowPublicKeyRetrieval=true&" +
            "characterEncoding=UTF-8&" +
            "useUnicode=true";
    private static final String USER = "root";
    private static final String PASSWORD = "";

    // Variable para cachear el DataSource
    private static DataSource dataSource = null;
    private static boolean useJNDI = true; // Intentar JNDI primero

    // Constructor privado para evitar instanciación
    private ConexionDB() {
    }

    /**
     * Obtiene una nueva conexión a la base de datos.
     * Intenta usar JNDI DataSource primero, si falla usa conexión directa.
     * 
     * @return Connection objeto de conexión a MySQL
     */
    public static Connection conectar() throws SQLException {
        // Método 1: Intentar obtener conexión via JNDI DataSource (recomendado en
        // servidor)
        if (useJNDI) {
            try {
                Connection conn = conectarJNDI();
                if (conn != null) {
                    System.out.println("✅ Conexión establecida via JNDI DataSource");
                    return conn;
                }
            } catch (Exception e) {
                System.out.println("⚠️ JNDI no disponible, usando conexión directa");
                useJNDI = false; // No intentar JNDI en próximas conexiones
            }
        }

        // Método 2: Conexión directa (fallback)
        return conectarDirecto();
    }

    /**
     * Obtiene conexión usando JNDI DataSource (pool de conexiones de Tomcat).
     * Este método se usa en el servidor en producción.
     * 
     * @return Connection desde el pool de Tomcat
     */
    private static Connection conectarJNDI() throws SQLException, NamingException {
        if (dataSource == null) {
            try {
                Context initContext = new InitialContext();
                dataSource = (DataSource) initContext.lookup(JNDI_NAME);
            } catch (NamingException e) {
                System.err.println("Error: No se pudo obtener DataSource JNDI: " + e.getMessage());
                throw e;
            }
        }
        return dataSource.getConnection();
    }

    /**
     * Obtiene conexión directa a MySQL sin pool de conexiones.
     * Este método se usa en desarrollo local o como fallback.
     * 
     * @return Connection directa a MySQL
     */
    private static Connection conectarDirecto() throws SQLException {
        try {
            // Cargar el driver (opcional en versiones nuevas de JDBC pero recomendado)
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
            System.out.println("✅ Conexión directa establecida a MySQL");
            return conn;
        } catch (ClassNotFoundException e) {
            System.err.println("Error: Driver MySQL no encontrado. Agrega la librería al proyecto.");
            throw new SQLException(e);
        } catch (SQLException e) {
            System.err.println("Error al conectar a la Base de Datos: " + e.getMessage());
            throw e;
        }
    }

    /**
     * Método para forzar el uso de JNDI (útil para testing en servidor).
     */
    public static void setUseJNDI(boolean useJndi) {
        useJNDI = useJndi;
        dataSource = null; // Resetear el cache
    }
}
