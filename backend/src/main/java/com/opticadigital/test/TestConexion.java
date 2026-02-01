package com.opticadigital.test;

import com.opticadigital.util.ConexionDB;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

/**
 * Clase de prueba para verificar la conexión a la base de datos.
 * 
 * Ejecuta esta clase para verificar que la conexión funciona correctamente.
 */
public class TestConexion {

    public static void main(String[] args) {
        System.out.println("============================================");
        System.out.println("  PRUEBA DE CONEXIÓN A BASE DE DATOS");
        System.out.println("============================================");
        System.out.println();

        Connection conn = null;

        try {
            System.out.println("1. Intentando conectar a MySQL...");
            conn = ConexionDB.conectar();

            if (conn != null && !conn.isClosed()) {
                System.out.println("   ✅ CONEXIÓN EXITOSA");
                System.out.println();

                // Obtener información de la base de datos
                System.out.println("2. Información de la conexión:");
                System.out.println("   - URL: " + conn.getMetaData().getURL());
                System.out.println("   - Usuario: " + conn.getMetaData().getUserName());
                System.out.println("   - Driver: " + conn.getMetaData().getDriverName());
                System.out.println("   - Versión: " + conn.getMetaData().getDriverVersion());
                System.out.println();

                // Probar una consulta simple
                System.out.println("3. Probando consulta a la base de datos...");
                Statement stmt = conn.createStatement();

                // Verificar tablas
                ResultSet rs = stmt.executeQuery("SHOW TABLES");
                System.out.println("   Tablas encontradas:");
                while (rs.next()) {
                    System.out.println("   - " + rs.getString(1));
                }
                rs.close();
                System.out.println();

                // Contar usuarios
                rs = stmt.executeQuery("SELECT COUNT(*) as total FROM usuarios");
                if (rs.next()) {
                    System.out.println("   Total de usuarios: " + rs.getInt("total"));
                }
                rs.close();

                // Contar productos
                rs = stmt.executeQuery("SELECT COUNT(*) as total FROM productos");
                if (rs.next()) {
                    System.out.println("   Total de productos: " + rs.getInt("total"));
                }
                rs.close();

                stmt.close();
                System.out.println();

                System.out.println("============================================");
                System.out.println("  ✅ TODAS LAS PRUEBAS EXITOSAS");
                System.out.println("============================================");
                System.out.println();
                System.out.println("La aplicación puede conectarse correctamente a MySQL.");

            } else {
                System.out.println("   ❌ ERROR: La conexión es nula o está cerrada");
            }

        } catch (Exception e) {
            System.out.println();
            System.out.println("============================================");
            System.out.println("  ❌ ERROR EN LA CONEXIÓN");
            System.out.println("============================================");
            System.out.println();
            System.out.println("Tipo de error: " + e.getClass().getSimpleName());
            System.out.println("Mensaje: " + e.getMessage());
            System.out.println();
            System.out.println("POSIBLES CAUSAS:");
            System.out.println("1. MySQL no está corriendo");
            System.out.println("   Solución: Inicia MySQL (XAMPP o servicio MySQL)");
            System.out.println();
            System.out.println("2. La base de datos 'opticadigital_db' no existe");
            System.out.println("   Solución: Ejecuta el script sql/database.sql");
            System.out.println();
            System.out.println("3. Credenciales incorrectas");
            System.out.println("   Solución: Verifica usuario/password en ConexionDB.java");
            System.out.println();
            System.out.println("4. Driver MySQL no encontrado");
            System.out.println("   Solución: Agrega mysql-connector-j-8.0.33.jar al classpath");
            System.out.println();

            // Mostrar stack trace para debugging
            System.out.println("Stack Trace:");
            e.printStackTrace();

        } finally {
            // Cerrar conexión
            if (conn != null) {
                try {
                    conn.close();
                    System.out.println("Conexión cerrada correctamente.");
                } catch (Exception e) {
                    System.out.println("Error al cerrar conexión: " + e.getMessage());
                }
            }
        }
    }
}
