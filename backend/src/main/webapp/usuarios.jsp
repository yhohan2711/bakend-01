<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
        <!DOCTYPE html>
        <html>

        <head>
            <title>Gestión de Usuarios</title>
            <link rel="stylesheet" href="css/styles.css">
        </head>

        <body>
            <div class="container">
                <header>
                    <h1>Lista de Usuarios</h1>
                </header>

                <div style="text-align: left; margin-bottom: 20px;">
                    <a href="usuarios?action=new" class="btn">Agregar Nuevo Usuario</a>
                    <a href="index.jsp" class="btn" style="background-color: #7f8c8d;">Volver al Inicio</a>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <c:forEach var="user" items="${listUsuarios}">
                            <tr>
                                <td>
                                    <c:out value="${user.id}" />
                                </td>
                                <td>
                                    <c:out value="${user.nombre}" />
                                </td>
                                <td>
                                    <c:out value="${user.email}" />
                                </td>
                                <td>
                                    <c:out value="${user.rol}" />
                                </td>
                                <td>
                                    <a href="usuarios?action=edit&id=<c:out value='${user.id}' />">Editar</a>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <a href="usuarios?action=delete&id=<c:out value='${user.id}' />">Eliminar</a>
                                </td>
                            </tr>
                        </c:forEach>
                    </tbody>
                </table>
            </div>
        </body>

        </html>