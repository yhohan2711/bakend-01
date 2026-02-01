package com.opticadigital;

import com.opticadigital.dao.UsuarioDAO;
import com.opticadigital.model.Usuario;
import com.opticadigital.util.ConexionDB;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Scanner;

public class Main {
    private static Scanner scanner = new Scanner(System.in);
    private static UsuarioDAO usuarioDAO = new UsuarioDAO();

    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════════════════╗");
        System.out.println("║   SISTEMA ÓPTICA DIGITAL - GESTIÓN BD     ║");
        System.out.println("╚════════════════════════════════════════════╝");

        // Prueba de conexión a la base de datos
        try (Connection conn = ConexionDB.conectar()) {
            boolean ok = (conn != null && !conn.isClosed());
            System.out.println("\n[✓] Conexión a la base de datos: " + (ok ? "EXITOSA" : "FALLIDA"));
        } catch (SQLException e) {
            System.err.println("\n[✗] Error al conectar a la base de datos: " + e.getMessage());
            System.err.println("Por favor, verifica que MySQL esté ejecutándose y la configuración sea correcta.");
            return;
        }

        // Menú principal
        boolean salir = false;
        while (!salir) {
            mostrarMenu();
            int opcion = leerOpcion();

            switch (opcion) {
                case 1:
                    listarUsuarios();
                    break;
                case 2:
                    buscarUsuarioPorId();
                    break;
                case 3:
                    agregarUsuario();
                    break;
                case 4:
                    modificarUsuario();
                    break;
                case 5:
                    eliminarUsuario();
                    break;
                case 6:
                    probarLogin();
                    break;
                case 7:
                    salir = true;
                    System.out.println("\n¡Hasta luego! Cerrando sistema...");
                    break;
                default:
                    System.out.println("\n[✗] Opción inválida. Por favor, selecciona una opción del 1 al 7.");
            }
        }

        scanner.close();
        // ConexionDB.closeConnection(); // Ya no es necesario, se cierra
        // automáticamente con try-with-resources
    }

    private static void mostrarMenu() {
        System.out.println("\n╔════════════════════════════════════════════╗");
        System.out.println("║            MENÚ PRINCIPAL                  ║");
        System.out.println("╠════════════════════════════════════════════╣");
        System.out.println("║  1. Listar todos los usuarios              ║");
        System.out.println("║  2. Buscar usuario por ID                  ║");
        System.out.println("║  3. Agregar nuevo usuario                  ║");
        System.out.println("║  4. Modificar usuario                      ║");
        System.out.println("║  5. Eliminar usuario                       ║");
        System.out.println("║  6. Probar Login                           ║");
        System.out.println("║  7. Salir                                  ║");
        System.out.println("╚════════════════════════════════════════════╝");
        System.out.print("Selecciona una opción: ");
    }

    private static int leerOpcion() {
        try {
            return Integer.parseInt(scanner.nextLine());
        } catch (NumberFormatException e) {
            return -1;
        }
    }

    // 1. LISTAR TODOS LOS USUARIOS
    private static void listarUsuarios() {
        System.out.println("\n═══════════════════════════════════════════════");
        System.out.println("           LISTA DE USUARIOS");
        System.out.println("═══════════════════════════════════════════════");

        try {
            List<Usuario> usuarios = usuarioDAO.selectAllUsuarios();
            if (usuarios.isEmpty()) {
                System.out.println("No hay usuarios registrados en la base de datos.");
            } else {
                System.out.printf("%-5s %-25s %-30s %-15s%n", "ID", "NOMBRE", "EMAIL", "ROL");
                System.out.println("───────────────────────────────────────────────────────────────────────────");
                for (Usuario u : usuarios) {
                    System.out.printf("%-5d %-25s %-30s %-15s%n",
                            u.getId(), u.getNombre(), u.getEmail(), u.getRol());
                }
                System.out.println("───────────────────────────────────────────────────────────────────────────");
                System.out.println("Total de usuarios: " + usuarios.size());
            }
        } catch (SQLException e) {
            System.out.println("\n[✗] Error al listar usuarios: " + e.getMessage());
        }
    }

    // 2. BUSCAR USUARIO POR ID
    private static void buscarUsuarioPorId() {
        System.out.println("\n═══════════════════════════════════════════════");
        System.out.println("         BUSCAR USUARIO POR ID");
        System.out.println("═══════════════════════════════════════════════");
        System.out.print("Ingresa el ID del usuario: ");

        try {
            int id = Integer.parseInt(scanner.nextLine());
            Usuario usuario = usuarioDAO.selectUsuario(id);

            if (usuario != null) {
                System.out.println("\n[✓] Usuario encontrado:");
                System.out.println("───────────────────────────────────────────────");
                System.out.println("ID:              " + usuario.getId());
                System.out.println("Nombre:          " + usuario.getNombre());
                System.out.println("Email:           " + usuario.getEmail());
                System.out.println("Rol:             " + usuario.getRol());
                System.out.println("Fecha Registro:  " + usuario.getFechaRegistro());
                System.out.println("───────────────────────────────────────────────");
            } else {
                System.out.println("\n[✗] No se encontró ningún usuario con ID: " + id);
            }
        } catch (NumberFormatException e) {
            System.out.println("\n[✗] Error: Debes ingresar un número válido.");
        } catch (SQLException e) {
            System.out.println("\n[✗] Error SQL al buscar usuario: " + e.getMessage());
        }
    }

    // 3. AGREGAR NUEVO USUARIO
    private static void agregarUsuario() {
        System.out.println("\n═══════════════════════════════════════════════");
        System.out.println("         AGREGAR NUEVO USUARIO");
        System.out.println("═══════════════════════════════════════════════");

        System.out.print("Nombre completo: ");
        String nombre = scanner.nextLine();

        System.out.print("Email: ");
        String email = scanner.nextLine();

        System.out.print("Password: ");
        String password = scanner.nextLine();

        System.out.print("Rol (admin/empleado/cliente): ");
        String rol = scanner.nextLine();

        // Validación básica
        if (nombre.trim().isEmpty() || email.trim().isEmpty() || password.trim().isEmpty() || rol.trim().isEmpty()) {
            System.out.println("\n[✗] Error: Todos los campos son obligatorios.");
            return;
        }

        Usuario nuevoUsuario = new Usuario(nombre, email, password, rol);
        try {
            usuarioDAO.insertUsuario(nuevoUsuario);
            System.out.println("\n[✓] Usuario agregado correctamente.");
        } catch (SQLException e) {
            System.out.println("\n[✗] Error al agregar el usuario: " + e.getMessage());
        }
    }

    // 4. MODIFICAR USUARIO
    private static void modificarUsuario() {
        System.out.println("\n═══════════════════════════════════════════════");
        System.out.println("         MODIFICAR USUARIO");
        System.out.println("═══════════════════════════════════════════════");
        System.out.print("Ingresa el ID del usuario a modificar: ");

        try {
            int id = Integer.parseInt(scanner.nextLine());
            Usuario usuario = null;
            try {
                usuario = usuarioDAO.selectUsuario(id);
            } catch (SQLException e) {
                System.out.println("\n[✗] Error SQL al buscar usuario: " + e.getMessage());
                return;
            }

            if (usuario == null) {
                System.out.println("\n[✗] No se encontró ningún usuario con ID: " + id);
                return;
            }

            System.out.println("\n[✓] Usuario encontrado: " + usuario.getNombre());
            System.out.println("Deja en blanco para mantener el valor actual.\n");

            System.out.print("Nuevo nombre [" + usuario.getNombre() + "]: ");
            String nombre = scanner.nextLine();
            if (!nombre.trim().isEmpty()) {
                usuario.setNombre(nombre);
            }

            System.out.print("Nuevo email [" + usuario.getEmail() + "]: ");
            String email = scanner.nextLine();
            if (!email.trim().isEmpty()) {
                usuario.setEmail(email);
            }

            System.out.print("Nuevo rol [" + usuario.getRol() + "]: ");
            String rol = scanner.nextLine();
            if (!rol.trim().isEmpty()) {
                usuario.setRol(rol);
            }

            try {
                if (usuarioDAO.updateUsuario(usuario)) {
                    System.out.println("\n[✓] Usuario modificado correctamente.");
                } else {
                    System.out.println("\n[✗] Error al modificar el usuario.");
                }
            } catch (SQLException e) {
                System.out.println("\n[✗] Error SQL: " + e.getMessage());
            }

        } catch (NumberFormatException e) {
            System.out.println("\n[✗] Error: Debes ingresar un número válido.");
        }
    }

    // 5. ELIMINAR USUARIO
    private static void eliminarUsuario() {
        System.out.println("\n═══════════════════════════════════════════════");
        System.out.println("         ELIMINAR USUARIO");
        System.out.println("═══════════════════════════════════════════════");
        System.out.print("Ingresa el ID del usuario a eliminar: ");

        try {
            int id = Integer.parseInt(scanner.nextLine());
            Usuario usuario = null;
            try {
                usuario = usuarioDAO.selectUsuario(id);
            } catch (SQLException e) {
                System.out.println("\n[✗] Error SQL al buscar usuario: " + e.getMessage());
                return;
            }

            if (usuario == null) {
                System.out.println("\n[✗] No se encontró ningún usuario con ID: " + id);
                return;
            }

            System.out.println("\n[!] ¿Estás seguro de eliminar al usuario: " + usuario.getNombre() + "?");
            System.out.print("Escribe 'SI' para confirmar: ");
            String confirmacion = scanner.nextLine();

            if (confirmacion.equalsIgnoreCase("SI")) {
                try {
                    if (usuarioDAO.deleteUsuario(id)) {
                        System.out.println("\n[✓] Usuario eliminado correctamente.");
                    } else {
                        System.out.println("\n[✗] Error al eliminar el usuario.");
                    }
                } catch (SQLException e) {
                    System.out.println("\n[✗] Error SQL: " + e.getMessage());
                }
            } else {
                System.out.println("\n[!] Operación cancelada.");
            }

        } catch (NumberFormatException e) {
            System.out.println("\n[✗] Error: Debes ingresar un número válido.");
        }
    }

    // 6. PROBAR LOGIN
    private static void probarLogin() {
        System.out.println("\n═══════════════════════════════════════════════");
        System.out.println("         PROBAR LOGIN");
        System.out.println("═══════════════════════════════════════════════");

        System.out.print("Email: ");
        String email = scanner.nextLine();

        System.out.print("Password: ");
        String password = scanner.nextLine();

        try {
            Usuario usuario = usuarioDAO.login(email, password);

            if (usuario != null) {
                System.out.println("\n[✓] Login exitoso!");
                System.out.println("───────────────────────────────────────────────");
                System.out.println("Bienvenido: " + usuario.getNombre());
                System.out.println("Rol:        " + usuario.getRol());
                System.out.println("───────────────────────────────────────────────");
            } else {
                System.out.println("\n[✗] Login fallido. Email o contraseña incorrectos.");
            }
        } catch (SQLException e) {
            System.out.println("\n[✗] Error SQL al intentar login: " + e.getMessage());
        }
    }
}
