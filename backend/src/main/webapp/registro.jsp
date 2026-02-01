<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
        <!DOCTYPE html>
        <html>

        <head>
            <title>
                <c:if test="${usuario != null}">Editar Usuario</c:if>
                <c:if test="${usuario == null}">Registrar Usuario</c:if>
            </title>
            <link rel="stylesheet" href="css/styles.css">
        </head>

        <body>
            <div class="container">
                <header>
                    <h1>
                        <c:if test="${usuario != null}">Editar Usuario</c:if>
                        <c:if test="${usuario == null}">Registrar Nuevo Usuario</c:if>
                    </h1>
                </header>

                <c:if test="${usuario != null}">
                    <form action="usuarios?action=update" method="post">
                </c:if>
                <c:if test="${usuario == null}">
                    <form action="usuarios?action=insert" method="post">
                </c:if>

                <c:if test="${usuario != null}">
                    <input type="hidden" name="id" value="<c:out value='${usuario.id}' />" />
                </c:if>

                <div class="form-group">
                    <label>Nombre:</label>
                    <input type="text" name="nombre" value="<c:out value='${usuario.nombre}' />" required="required" />
                </div>

                <div class="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value="<c:out value='${usuario.email}' />" required="required" />
                </div>

                <div class="form-group">
                    <label>Contraseña:</label>
                    <input type="password" name="password" value="<c:out value='${usuario.password}' />"
                        required="required" />
                </div>

                <div class="form-group">
                    <label>Rol:</label>
                    <select name="rol" required="required" style="width: 100%; padding: 8px; margin-top: 5px;">
                        <option value="empleado" <c:if test="${usuario.rol == 'empleado'}">selected</c:if>>Empleado</option>
                        <option value="admin" <c:if test="${usuario.rol == 'admin'}">selected</c:if>>Administrador</option>
                        <option value="cliente" <c:if test="${usuario.rol == 'cliente'}">selected</c:if>>Cliente</option>
                    </select>
                </div>

                <button type="submit">Guardar</button>
                <a href="usuarios" class="btn" style="background-color: #95a5a6; margin-left: 10px;">Cancelar</a>
                </form>
            </div>
        </body>

        </html>