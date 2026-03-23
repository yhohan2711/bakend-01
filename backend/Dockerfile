# Paso 1: Compilación con Maven
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
# Compilar el WAR ignorando tests para ir más rápido
RUN mvn clean package -DskipTests

# Paso 2: Servidor Tomcat para ejecutar el WAR
FROM tomcat:9.0-jdk17-slim
WORKDIR /usr/local/tomcat/webapps/

# Eliminar aplicaciones por defecto de Tomcat para evitar basura
RUN rm -rf ./ROOT ./examples ./docs ./manager ./host-manager

# Copiar el WAR generado desde el paso anterior y renombrarlo a ROOT.war 
# para que responda directamente en la URL principal
COPY --from=build /app/target/*.war ./ROOT.war

EXPOSE 8080
CMD ["catalina.sh", "run"]
