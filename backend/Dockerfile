# Paso 1: Compilación con Maven
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Paso 2: Servidor Tomcat 9 (Para compatibilidad con javax.servlet)
FROM tomcat:9.0-jdk17
WORKDIR /usr/local/tomcat/webapps/

# Ajustar puerto a 10000 (Estándar de Render) para evitar reinicios por re-mapeo
RUN sed -i 's/port="8080"/port="10000"/g' /usr/local/tomcat/conf/server.xml

# Limpieza inicial de apps por defecto
RUN rm -rf ./ROOT ./examples ./docs ./manager ./host-manager

# Copiar el WAR ya compilado directamente como ROOT.war
COPY --from=build /app/target/ROOT.war ./ROOT.war

# Ajuste de memoria agresivo para Render (Free Tier)
ENV JAVA_OPTS="-Xms200m -Xmx320m -XX:+UseSerialGC -Djava.security.egd=file:/dev/./urandom"

EXPOSE 10000
CMD ["catalina.sh", "run"]
