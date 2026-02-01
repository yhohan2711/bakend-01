-- ============================================
-- Script de Creación de Base de Datos
-- Proyecto: OpticaDigital
-- Versión: 1.0
-- ============================================

-- Eliminar base de datos si existe (CUIDADO: Esto borra todos los datos)
-- Comenta la siguiente línea si ya tienes datos que quieres conservar
DROP DATABASE IF EXISTS opticadigital_db;

-- Crear la base de datos con charset UTF8MB4
CREATE DATABASE IF NOT EXISTS opticadigital_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_general_ci;

-- Seleccionar la base de datos
USE opticadigital_db;

-- ============================================
-- TABLA: usuarios
-- Descripción: Almacena información de usuarios del sistema
-- ============================================
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL COMMENT 'En producción usar hash (BCrypt recomendado)',
    rol ENUM('admin', 'empleado', 'cliente') DEFAULT 'empleado',
    activo BOOLEAN DEFAULT TRUE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_rol (rol)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ============================================
-- TABLA: productos
-- Descripción: Catálogo de productos de la óptica
-- ============================================
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    categoria ENUM('lentes', 'monturas', 'accesorios', 'soluciones', 'otros') DEFAULT 'otros',
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_categoria (categoria),
    INDEX idx_precio (precio),
    CHECK (precio >= 0),
    CHECK (stock >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ============================================
-- DATOS INICIALES
-- ============================================

-- Insertar usuario administrador por defecto
-- IMPORTANTE: Cambiar la contraseña en producción
INSERT INTO usuarios (nombre, email, password, rol) 
VALUES ('Administrador', 'admin@optica.com', 'admin123', 'admin')
ON DUPLICATE KEY UPDATE nombre = nombre;

-- Insertar productos de ejemplo
INSERT INTO productos (nombre, descripcion, precio, stock, categoria) VALUES
('Lentes Transitions', 'Lentes fotocromáticos que se adaptan a la luz', 150.00, 25, 'lentes'),
('Montura Ray-Ban Aviator', 'Montura clásica estilo aviador', 89.99, 15, 'monturas'),
('Solución Limpiadora 250ml', 'Solución para limpieza de lentes', 12.50, 50, 'soluciones'),
('Estuche Rígido', 'Estuche protector para lentes', 8.99, 30, 'accesorios')
ON DUPLICATE KEY UPDATE nombre = nombre;

-- ============================================
-- VERIFICACIÓN
-- ============================================
-- Mostrar las tablas creadas
SHOW TABLES;

-- Mostrar estructura de usuarios
DESCRIBE usuarios;

-- Mostrar estructura de productos
DESCRIBE productos;

-- Contar registros
SELECT 'Usuarios registrados:' AS Info, COUNT(*) AS Total FROM usuarios
UNION ALL
SELECT 'Productos en catálogo:' AS Info, COUNT(*) AS Total FROM productos;
