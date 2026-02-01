package com.opticadigital.servlet;

import com.opticadigital.dao.UsuarioDAO;
import com.opticadigital.model.Usuario;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

public class UsuarioServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private UsuarioDAO usuarioDAO;

    public void init() {
        usuarioDAO = new UsuarioDAO();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String action = request.getParameter("action");
        if (action == null) {
            action = "listar";
        }

        try {
            switch (action) {
                case "new":
                    showNewForm(request, response);
                    break;
                case "insert":
                    insertUsuario(request, response);
                    break;
                case "delete":
                    deleteUsuario(request, response);
                    break;
                case "edit":
                    showEditForm(request, response);
                    break;
                case "update":
                    updateUsuario(request, response);
                    break;
                case "login":
                    loginUsuario(request, response);
                    break;
                default:
                    listUsuarios(request, response);
                    break;
            }
        } catch (SQLException ex) {
            throw new ServletException(ex);
        }
    }

    private void loginUsuario(HttpServletRequest request, HttpServletResponse response)
            throws SQLException, IOException, ServletException {
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        Usuario usuario = usuarioDAO.login(email, password);

        if (usuario != null) {
            // Login exitoso
            request.getSession().setAttribute("usuarioLogueado", usuario);
            response.sendRedirect("usuarios"); // Redirigir al listado de usuarios
        } else {
            // Login fallido
            request.setAttribute("error", "Credenciales inválidas");
            RequestDispatcher dispatcher = request.getRequestDispatcher("index.html");
            dispatcher.forward(request, response);
        }
    }

    private void listUsuarios(HttpServletRequest request, HttpServletResponse response)
            throws SQLException, IOException, ServletException {
        List<Usuario> listUsuarios = usuarioDAO.selectAllUsuarios();
        request.setAttribute("listUsuarios", listUsuarios);
        RequestDispatcher dispatcher = request.getRequestDispatcher("usuarios.jsp");
        dispatcher.forward(request, response);
    }

    private void showNewForm(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        RequestDispatcher dispatcher = request.getRequestDispatcher("registro.jsp");
        dispatcher.forward(request, response);
    }

    private void showEditForm(HttpServletRequest request, HttpServletResponse response)
            throws SQLException, ServletException, IOException {
        int id = Integer.parseInt(request.getParameter("id"));
        Usuario existingUsuario = usuarioDAO.selectUsuario(id);
        RequestDispatcher dispatcher = request.getRequestDispatcher("registro.jsp");
        request.setAttribute("usuario", existingUsuario);
        dispatcher.forward(request, response);
    }

    private void insertUsuario(HttpServletRequest request, HttpServletResponse response)
            throws SQLException, IOException {
        String nombre = request.getParameter("nombre");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String rol = request.getParameter("rol");
        Usuario newUsuario = new Usuario(nombre, email, password, rol);
        usuarioDAO.insertUsuario(newUsuario);
        response.sendRedirect("usuarios");
    }

    private void updateUsuario(HttpServletRequest request, HttpServletResponse response)
            throws SQLException, IOException {
        int id = Integer.parseInt(request.getParameter("id"));
        String nombre = request.getParameter("nombre");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String rol = request.getParameter("rol");

        Usuario book = new Usuario(id, nombre, email, password, rol, null);
        usuarioDAO.updateUsuario(book);
        response.sendRedirect("usuarios");
    }

    private void deleteUsuario(HttpServletRequest request, HttpServletResponse response)
            throws SQLException, IOException {
        int id = Integer.parseInt(request.getParameter("id"));
        usuarioDAO.deleteUsuario(id);
        response.sendRedirect("usuarios");
    }
}
