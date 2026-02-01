# Implementación del Módulo de Usuarios con Hibernate

He actualizado el módulo de gestión de usuarios para utilizar el framework **Hibernate (JPA)**, cumpliendo con el requerimiento de aplicar un framework de construcción de aplicaciones Java.

## Cambios Realizados

1.  **Modelo (`Usuario.java`)**: Se han añadido anotaciones JPA (`@Entity`, `@Table`, `@Column`, etc.) para mapear la clase a la tabla `usuarios`.
2.  **DAO (`UsuarioDAO.java`)**: Se ha reescrito completamente para usar `EntityManager` en lugar de JDBC puro (`PreparedStatement`, `ResultSet`). Ahora las operaciones son más seguras y orientadas a objetos.
3.  **Configuración (`persistence.xml`)**: Se ha creado el archivo de configuración de JPA en `src/main/resources/META-INF/persistence.xml` con los datos de conexión a la base de datos.
4.  **Utilidad (`JPAUtil.java`)**: Se ha creado una clase helper para manejar la `EntityManagerFactory` (patrón Singleton).
5.  **Dependencias (`pom.xml`)**: Se han agregado las librerías de Hibernate Core y Jakarta Persistence.

## Cómo Ejecutar

Debido a que Hibernate requiere varias librerías adicionales (JARs), el script `compilar.bat` antiguo ya no es suficiente a menos que descargues manualmente todas las dependencias.

**Se recomienda encarecidamente usar Maven:**

1.  Asegúrate de tener Maven instalado y configurado en tu PATH.
2.  Abre una terminal en la carpeta del proyecto.
3.  Ejecuta:
    ```bash
    mvn clean package
    ```
4.  Esto descargará automáticamente Hibernate y todas sus dependencias, y generará el archivo WAR en la carpeta `target/`.

## Verificación

El `UsuarioServlet` sigue funcionando igual que antes, pero internamente ahora delega en Hibernate para todas las operaciones de base de datos.
