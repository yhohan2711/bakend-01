-- ============================================
-- PASO 3: Insertar Datos Iniciales
-- IMPORTANTE: Selecciona la base de datos 'opticadigital_db' 
-- en phpMyAdmin antes de ejecutar este script
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

-- Verificar datos insertados
SELECT 'Usuarios registrados:' AS Info, COUNT(*) AS Total FROM usuarios
UNION ALL
SELECT 'Productos en catálogo:' AS Info, COUNT(*) AS Total FROM productos;
