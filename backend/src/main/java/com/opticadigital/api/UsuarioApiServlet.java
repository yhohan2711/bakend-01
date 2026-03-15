package com.opticadigital.api;

import com.google.gson.Gson;
import com.opticadigital.dao.UsuarioDAO;
import com.opticadigital.model.Usuario;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

import java.util.List;

public class UsuarioApiServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private UsuarioDAO usuarioDAO;
    private Gson gson;

    public void init() {
        usuarioDAO = new UsuarioDAO();
        gson = new Gson();
    }

    // Configurar respuesta JSON y Encoding
    private void setAccessControlHeaders(HttpServletResponse response) {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        setAccessControlHeaders(response);
        try {
            List<Usuario> listUsuarios = usuarioDAO.selectAllUsuarios();
            String json = gson.toJson(listUsuarios);
            PrintWriter out = response.getWriter();
            out.print(json);
            out.flush();
        } catch (Exception ex) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().print("{\"error\": \"" + ex.getMessage() + "\"}");
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        setAccessControlHeaders(response);
        try {
            StringBuilder sb = new StringBuilder();
            BufferedReader reader = request.getReader();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
            String jsonBody = sb.toString();

            Usuario newUsuario = gson.fromJson(jsonBody, Usuario.class);

            if (newUsuario == null) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().print("{\"error\": \"El cuerpo de la solicitud no puede estar vacio o es invalido.\"}");
                return;
            }

            // Asignar valores por defecto para campos obligatorios
            if (newUsuario.getPassword() == null || newUsuario.getPassword().isEmpty()) {
                newUsuario.setPassword("123456"); // Default password
            }
            if (newUsuario.getRol() == null || newUsuario.getRol().isEmpty()) {
                newUsuario.setRol("cliente"); // Default role
            }

            usuarioDAO.insertUsuario(newUsuario);

            response.setStatus(HttpServletResponse.SC_CREATED);
            PrintWriter out = response.getWriter();
            out.print(gson.toJson(newUsuario));
            out.flush();
        } catch (Exception ex) {
            handleException(ex, response);
        }
    }

    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        setAccessControlHeaders(response);
        try {
            BufferedReader reader = request.getReader();
            Usuario usuario = gson.fromJson(reader, Usuario.class);

            String pathInfo = request.getPathInfo();
            if (pathInfo != null && pathInfo.length() > 1) {
                int id = Integer.parseInt(pathInfo.substring(1));
                usuario.setId(id);
            }

            usuarioDAO.updateUsuario(usuario);

            PrintWriter out = response.getWriter();
            out.print(gson.toJson(usuario));
            out.flush();
        } catch (Exception ex) {
            handleException(ex, response);
        }
    }

    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        setAccessControlHeaders(response);
        try {
            String pathInfo = request.getPathInfo();
            if (pathInfo != null && pathInfo.length() > 1) {
                int id = Integer.parseInt(pathInfo.substring(1));
                boolean ok = usuarioDAO.deleteUsuario(id);
                if (ok) {
                    response.setStatus(HttpServletResponse.SC_OK);
                    PrintWriter out = response.getWriter();
                    out.print("{\"mensaje\": \"Usuario eliminado correctamente\", \"deleted\": true}");
                } else {
                    response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                    PrintWriter out = response.getWriter();
                    out.print("{\"error\": \"Usuario no encontrado con el ID: " + id + "\"}");
                }
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                PrintWriter out = response.getWriter();
                out.print("{\"error\": \"Debe proporcionar un ID en la URL. Ejemplo: /api/usuarios/1\"}");
            }
        } catch (Exception ex) {
            handleException(ex, response);
        }
    }

    private void handleException(Exception ex, HttpServletResponse response) throws IOException {
        ex.printStackTrace(); // Mantener traza en servidor por si acaso

        if (ex instanceof NumberFormatException) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            PrintWriter out = response.getWriter();
            out.print("{\"error\": \"El ID proporcionado no es un numero valido. Revisa la URL (Ejemplo: .../usuarios/1).\"}");
            return;
        }

        boolean isDuplicate = false;
        Throwable cause = ex;
        while (cause != null) {
            if (cause.getMessage() != null && cause.getMessage().contains("Duplicate entry")) {
                isDuplicate = true;
                break;
            }
            cause = cause.getCause();
        }

        if (isDuplicate) {
            response.setStatus(HttpServletResponse.SC_CONFLICT);
            PrintWriter out = response.getWriter();
            out.print("{\"error\": \"El email ya esta registrado.\"}");
        } else {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            PrintWriter out = response.getWriter();
            out.print("{\"error\": \"" + ex.getMessage().replace("\"", "'") + "\"}");
        }
    }
}
