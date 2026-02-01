@echo off
REM ============================================
REM SCRIPT DE DESPLIEGUE MAVEN - OpticaDigital
REM ============================================

echo.
echo ============================================
echo   DESPLEGANDO OPTICADIGITAL (MAVEN)
echo ============================================
echo.

REM 1. Pedir ruta de Tomcat
if "%TOMCAT_HOME%"=="" (
    echo Por favor ingresa la ruta de Tomcat.
    echo Ejemplo: C:\xampp\tomcat
    set /p TOMCAT_HOME="Ruta de Tomcat: "
)

if not exist "%TOMCAT_HOME%\bin\catalina.bat" (
    echo [ERROR] Ruta incorrecta. No se encuentra bin\catalina.bat en %TOMCAT_HOME%
    pause
    exit /b 1
)

REM 2. Detener Tomcat
echo.
echo [1/4] Deteniendo Tomcat...
call "%TOMCAT_HOME%\bin\shutdown.bat"
timeout /t 5 >nul
taskkill /F /IM java.exe /FI "WINDOWTITLE eq Tomcat" >nul 2>&1

REM 3. Limpiar versión anterior
echo.
echo [2/4] Limpiando despliegue anterior...
if exist "%TOMCAT_HOME%\webapps\opticadigital" (
    rmdir /S /Q "%TOMCAT_HOME%\webapps\opticadigital"
)
if exist "%TOMCAT_HOME%\webapps\opticadigital.war" (
    del /F /Q "%TOMCAT_HOME%\webapps\opticadigital.war"
)

REM 4. Copiar nuevo WAR
echo.
echo [3/4] Copiando nuevo WAR...
if not exist "target\opticadigital-app-1.0-SNAPSHOT.war" (
    echo [ERROR] No se encuentra el archivo WAR en target\.
    echo Por favor ejecuta 'mvn clean package' primero.
    pause
    exit /b 1
)

copy /y "target\opticadigital-app-1.0-SNAPSHOT.war" "%TOMCAT_HOME%\webapps\opticadigital.war"

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Fallo al copiar el WAR a Tomcat.
    pause
    exit /b 1
)

REM 5. Iniciar Tomcat
echo.
echo [4/4] Iniciando Tomcat...
call "%TOMCAT_HOME%\bin\startup.bat"

echo.
echo ============================================
echo   DESPLIEGUE EXITOSO
echo ============================================
echo.
echo La aplicacion estara disponible en unos momentos en:
echo http://localhost:8080/opticadigital/
echo.
pause
