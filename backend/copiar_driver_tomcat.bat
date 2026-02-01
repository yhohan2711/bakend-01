@echo off
REM ============================================
REM Script para Copiar Driver MySQL a Tomcat
REM ============================================

echo.
echo ============================================
echo  COPIAR DRIVER MYSQL A TOMCAT
echo ============================================
echo.

REM Ruta del driver MySQL en el proyecto
set DRIVER_SOURCE=lib\mysql-connector-j-8.0.33.jar

REM Verificar que el driver existe
if not exist "%DRIVER_SOURCE%" (
    echo [ERROR] No se encontro el driver MySQL en: %DRIVER_SOURCE%
    echo.
    echo Por favor verifica que el archivo existe.
    pause
    exit /b 1
)

echo Driver encontrado: %DRIVER_SOURCE%
echo.

REM Pedir ruta de Tomcat
echo Por favor ingresa la ruta donde esta instalado Tomcat
echo Ejemplo: C:\apache-tomcat-10.1.20
echo          C:\Program Files\Apache Software Foundation\Tomcat 10.1
echo.
set /p TOMCAT_HOME="Ruta de Tomcat: "

REM Verificar que la ruta existe
if not exist "%TOMCAT_HOME%" (
    echo.
    echo [ERROR] La ruta no existe: %TOMCAT_HOME%
    pause
    exit /b 1
)

REM Verificar que existe la carpeta lib
if not exist "%TOMCAT_HOME%\lib" (
    echo.
    echo [ERROR] No se encontro la carpeta lib en Tomcat
    echo Verifica que la ruta sea correcta
    pause
    exit /b 1
)

REM Ruta destino
set DRIVER_DEST=%TOMCAT_HOME%\lib\mysql-connector-j-8.0.33.jar

REM Verificar si ya existe
if exist "%DRIVER_DEST%" (
    echo.
    echo [ADVERTENCIA] El driver ya existe en Tomcat:
    echo %DRIVER_DEST%
    echo.
    choice /C SN /M "¿Deseas reemplazarlo?"
    if errorlevel 2 (
        echo.
        echo Operacion cancelada.
        pause
        exit /b 0
    )
)

echo.
echo Copiando driver a Tomcat...
copy /Y "%DRIVER_SOURCE%" "%DRIVER_DEST%"

if errorlevel 1 (
    echo.
    echo [ERROR] No se pudo copiar el driver.
    echo Verifica que tienes permisos de escritura en la carpeta de Tomcat.
    echo.
    echo Si Tomcat esta en Program Files, ejecuta este script como Administrador:
    echo - Haz clic derecho en el archivo
    echo - Selecciona "Ejecutar como administrador"
    pause
    exit /b 1
)

echo.
echo ============================================
echo  DRIVER COPIADO EXITOSAMENTE
echo ============================================
echo.
echo Origen:  %DRIVER_SOURCE%
echo Destino: %DRIVER_DEST%
echo.
echo IMPORTANTE:
echo 1. Si Tomcat esta corriendo, REINICIALO para que tome el driver
echo 2. Usa: %TOMCAT_HOME%\bin\shutdown.bat
echo 3. Luego: %TOMCAT_HOME%\bin\startup.bat
echo.
pause
