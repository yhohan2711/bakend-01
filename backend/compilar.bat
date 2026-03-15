@echo off
REM ============================================
REM Script de Compilacion - OpticaDigital
REM ============================================

echo ============================================
echo   Compilando OpticaDigital
echo ============================================
echo.

REM Crear directorio de salida
if not exist "target\classes" mkdir target\classes
if not exist "lib" mkdir lib

REM ============================================
REM 1. DESCARGA DE DEPENDENCIAS
REM ============================================

REM Funcion helper para descargar (simulada con bloques por simplicidad)

if not exist "lib\mysql-connector-j-8.0.33.jar" (
    echo Descargando MySQL Connector...
    powershell -Command "Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/com/mysql/mysql-connector-j/8.0.33/mysql-connector-j-8.0.33.jar' -OutFile 'lib\mysql-connector-j-8.0.33.jar'"
)

if not exist "lib\javax.servlet-api-3.1.0.jar" (
    echo Descargando Servlet API...
    powershell -Command "Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/javax/servlet/javax.servlet-api/3.1.0/javax.servlet-api-3.1.0.jar' -OutFile 'lib\javax.servlet-api-3.1.0.jar'"
)

if not exist "lib\jstl-1.2.jar" (
    echo Descargando JSTL...
    powershell -Command "Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/javax/servlet/jstl/1.2/jstl-1.2.jar' -OutFile 'lib\jstl-1.2.jar'"
)

REM --- HIBERNATE Y JPA (NECESARIOS PARA EL ERROR 500) ---

if not exist "lib\javax.persistence-api-2.2.jar" (
    echo Descargando JPA API...
    powershell -Command "Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/javax/persistence/javax.persistence-api/2.2/javax.persistence-api-2.2.jar' -OutFile 'lib\javax.persistence-api-2.2.jar'"
)

if not exist "lib\hibernate-core-5.6.15.Final.jar" (
    echo Descargando Hibernate Core...
    powershell -Command "Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/org/hibernate/hibernate-core/5.6.15.Final/hibernate-core-5.6.15.Final.jar' -OutFile 'lib\hibernate-core-5.6.15.Final.jar'"
)

REM --- DEPENDENCIAS DE HIBERNATE ---

if not exist "lib\jboss-logging-3.4.3.Final.jar" (
    echo Descargando JBoss Logging...
    powershell -Command "Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/org/jboss/logging/jboss-logging/3.4.3.Final/jboss-logging-3.4.3.Final.jar' -OutFile 'lib\jboss-logging-3.4.3.Final.jar'"
)

if not exist "lib\byte-buddy-1.12.18.jar" (
    echo Descargando Byte Buddy - Hibernate Proxy...
    powershell -Command "Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/net/bytebuddy/byte-buddy/1.12.18/byte-buddy-1.12.18.jar' -OutFile 'lib\byte-buddy-1.12.18.jar'"
)

if not exist "lib\antlr-2.7.7.jar" (
    echo Descargando Antlr...
    powershell -Command "Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/antlr/antlr/2.7.7/antlr-2.7.7.jar' -OutFile 'lib\antlr-2.7.7.jar'"
)

if not exist "lib\jandex-2.4.2.Final.jar" (
    echo Descargando Jandex...
    powershell -Command "Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/org/jboss/jandex/2.4.2.Final/jandex-2.4.2.Final.jar' -OutFile 'lib\jandex-2.4.2.Final.jar'"
)

if not exist "lib\classmate-1.5.1.jar" (
    echo Descargando Classmate...
    powershell -Command "Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/com/fasterxml/classmate/1.5.1/classmate-1.5.1.jar' -OutFile 'lib\classmate-1.5.1.jar'"
)

if not exist "lib\hibernate-commons-annotations-5.1.2.Final.jar" (
    echo Descargando Hibernate Commons Annotations...
    powershell -Command "Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/org/hibernate/common/hibernate-commons-annotations/5.1.2.Final/hibernate-commons-annotations-5.1.2.Final.jar' -OutFile 'lib\hibernate-commons-annotations-5.1.2.Final.jar'"
)

if not exist "lib\dom4j-2.1.3.jar" (
    echo Descargando DOM4J...
    powershell -Command "Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/org/dom4j/dom4j/2.1.3/dom4j-2.1.3.jar' -OutFile 'lib\dom4j-2.1.3.jar'"
)

if not exist "lib\jboss-transaction-api_1.2_spec-1.1.1.Final.jar" (
    echo Descargando JBoss Transaction API...
    powershell -Command "Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/org/jboss/spec/javax/transaction/jboss-transaction-api_1.2_spec/1.1.1.Final/jboss-transaction-api_1.2_spec-1.1.1.Final.jar' -OutFile 'lib\jboss-transaction-api_1.2_spec-1.1.1.Final.jar'"
)

REM --- JAXB (NECESARIO PARA JAVA 9+ / HIBERNATE 5) ---

if not exist "lib\jaxb-api-2.3.1.jar" (
    echo Descargando JAXB API...
    powershell -Command "Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/javax/xml/bind/jaxb-api/2.3.1/jaxb-api-2.3.1.jar' -OutFile 'lib\jaxb-api-2.3.1.jar'"
)

if not exist "lib\jaxb-runtime-2.3.1.jar" (
    echo Descargando JAXB Runtime...
    powershell -Command "Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/org/glassfish/jaxb/jaxb-runtime/2.3.1/jaxb-runtime-2.3.1.jar' -OutFile 'lib\jaxb-runtime-2.3.1.jar'"
)

if not exist "lib\javax.activation-api-1.2.0.jar" (
    echo Descargando Activation API...
    powershell -Command "Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/javax/activation/javax.activation-api/1.2.0/javax.activation-api-1.2.0.jar' -OutFile 'lib\javax.activation-api-1.2.0.jar'"
)

if not exist "lib\istack-commons-runtime-3.0.7.jar" (
    echo Descargando Istack Commons...
    powershell -Command "Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/com/sun/istack/istack-commons-runtime/3.0.7/istack-commons-runtime-3.0.7.jar' -OutFile 'lib\istack-commons-runtime-3.0.7.jar'"
)

if not exist "lib\stax-ex-1.8.jar" (
    echo Descargando Stax Ex...
    powershell -Command "Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/org/jvnet/staxex/stax-ex/1.8/stax-ex-1.8.jar' -OutFile 'lib\stax-ex-1.8.jar'"
)

if not exist "lib\FastInfoset-1.2.15.jar" (
    echo Descargando FastInfoset...
    powershell -Command "Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/com/sun/xml/fastinfoset/FastInfoset/1.2.15/FastInfoset-1.2.15.jar' -OutFile 'lib\FastInfoset-1.2.15.jar'"
)

if not exist "lib\txw2-2.3.1.jar" (
    echo Descargando TXW2...
    powershell -Command "Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/org/glassfish/jaxb/txw2/2.3.1/txw2-2.3.1.jar' -OutFile 'lib\txw2-2.3.1.jar'"
)

REM --- JSON (GSON) ---

if not exist "lib\gson-2.10.1.jar" (
    echo Descargando Gson...
    powershell -Command "Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/com/google/code/gson/gson/2.10.1/gson-2.10.1.jar' -OutFile 'lib\gson-2.10.1.jar'"
)

REM --- MONGODB ---

if not exist "lib\mongodb-driver-sync-4.11.1.jar" (
    echo Descargando MongoDB Driver Sync...
    powershell -Command "Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/org/mongodb/mongodb-driver-sync/4.11.1/mongodb-driver-sync-4.11.1.jar' -OutFile 'lib\mongodb-driver-sync-4.11.1.jar'"
)

if not exist "lib\mongodb-driver-core-4.11.1.jar" (
    echo Descargando MongoDB Driver Core...
    powershell -Command "Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/org/mongodb/mongodb-driver-core/4.11.1/mongodb-driver-core-4.11.1.jar' -OutFile 'lib\mongodb-driver-core-4.11.1.jar'"
)

if not exist "lib\bson-4.11.1.jar" (
    echo Descargando BSON...
    powershell -Command "Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/org/mongodb/bson/4.11.1/bson-4.11.1.jar' -OutFile 'lib\bson-4.11.1.jar'"
)

REM ============================================
REM 2. COMPILACION
REM ============================================

echo.
echo Compilando archivos Java...

REM Usar dir /s /b para encontrar todos los .java es mas facil en un loop, 
REM pero aqui mantendremos una lista simplificada o un wildcrad si javac lo soporta en Windows (usando @sources.txt)

dir /s /B src\main\java\*.java > sources.txt

REM Construir Classpath con todos los JARs en lib
setlocal enabledelayedexpansion
set "CLASSPATH="
for %%i in (lib\*.jar) do (
    set "CLASSPATH=!CLASSPATH!;%%i"
)

javac --release 8 -d target\classes -cp "!CLASSPATH!" @sources.txt

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ============================================
    echo   Compilacion exitosa!
    echo ============================================
    echo.
    del sources.txt
) else (
    echo.
    echo ============================================
    echo   Error en la compilacion
    echo ============================================
    echo.
    del sources.txt
    exit /b 1
)
