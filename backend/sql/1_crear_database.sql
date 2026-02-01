-- ============================================
-- PASO 1: Crear la Base de Datos
-- ============================================

-- Eliminar base de datos si existe (CUIDADO: Esto borra todos los datos)
DROP DATABASE IF EXISTS opticadigital_db;

-- Crear la base de datos con charset UTF8MB4
CREATE DATABASE opticadigital_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_general_ci;
