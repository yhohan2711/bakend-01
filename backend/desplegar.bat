@echo off
REM ============================================
REM SCRIPT DE REPARACIÓN Y DESPLIEGUE DIRECTO (CARPETA)
REM ============================================

echo.
echo ============================================
echo   REPARANDO INSTALACION DE OPTICADIGITAL
echo   (Modo Despliegue Directo)
echo ============================================
echo.

REM 1. Pedir ruta de Tomcat
if "%TOMCAT_HOME%"=="" (
    echo Por favor ingresa la ruta de Tomcat.
    echo Ejemplo: C:\xampp\tomcat
    set /p TOMCAT_HOME="Ruta de Tomcat: "
)

if not exist "%TOMCAT_HOME%\bin\catalina.bat" (
    echo [ERROR] Ruta incorrecta. No se encuentra bin\catalina.bat
    pause
    exit /b 1
)

REM 2. Detener Tomcat a la fuerza
echo.
echo [1/5] Deteniendo Tomcat...
call "%TOMCAT_HOME%\bin\shutdown.bat"
timeout /t 5 >nul
taskkill /F /IM java.exe /FI "WINDOWTITLE eq Tomcat" >nul 2>&1

REM 3. Limpiar archivos viejos en Tomcat
echo.
echo [2/5] Eliminando version anterior...
if exist "%TOMCAT_HOME%\webapps\opticadigital" (
    rmdir /S /Q "%TOMCAT_HOME%\webapps\opticadigital"
    echo - Carpeta eliminada
)
if exist "%TOMCAT_HOME%\webapps\opticadigital.war" (
    del /F /Q "%TOMCAT_HOME%\webapps\opticadigital.war"
    echo - WAR eliminado
)

REM 4. Recompilar proyecto
echo.
echo [3/5] Recompilando proyecto...
cd /d "%~dp0"
call compilar.bat

REM Preparar estructura en target/webapp (similar a package.bat pero sin zipear)
if exist "target\webapp" rmdir /s /q "target\webapp"
mkdir "target\webapp"
mkdir "target\webapp\WEB-INF"
mkdir "target\webapp\WEB-INF\classes"
mkdir "target\webapp\WEB-INF\lib"

echo Copiando recursos web...
xcopy /s /y "src\main\webapp\*" "target\webapp\" >nul
echo Copiando clases...
xcopy /s /y "target\classes\*" "target\webapp\WEB-INF\classes\" >nul
echo Copiando librerias...
echo Copiando librerias...
copy /y "lib\*.jar" "target\webapp\WEB-INF\lib\" >nul
REM Eliminar servlet-api del despliegue (Tomcat ya lo trae) para evitar conflictos
del "target\webapp\WEB-INF\lib\javax.servlet-api-*.jar" >nul 2>&1


REM 5. Copiar CARPETA directamente a Tomcat
echo.
echo [4/5] Copiando aplicacion a Tomcat...
xcopy /s /y /i "target\webapp" "%TOMCAT_HOME%\webapps\opticadigital"

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Fallo al copiar los archivos a Tomcat.
    pause
    exit /b 1
)

REM 6. Iniciar Tomcat
echo.
echo [5/5] Iniciando Tomcat...
echo.
echo IMPORTANTE: Se abrira una nueva ventana con Tomcat.
echo Espera a que diga "Server startup in [x] ms"
echo.
call "%TOMCAT_HOME%\bin\startup.bat"

echo.
echo ============================================
echo   DESPLIEGUE FINALIZADO
echo ============================================
echo.
echo Por favor espera 10-20 segundos y luego abre:
echo http://localhost:8080/opticadigital/
echo.
echo (Si ves la pagina vieja, presiona CTRL + F5 en el navegador)
echo.
pause
