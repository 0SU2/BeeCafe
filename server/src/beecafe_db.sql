CREATE DATABASE IF NOT EXISTS beecafe_db; 

USE beecafe_db;

CREATE TABLE IF NOT EXISTS estudiantes (
 est_id INT NOT NULL AUTO_INCREMENT,
 est_nombre VARCHAR(50) NOT NULL,
 est_apePat VARCHAR(50) NOT NULL,
 est_apeMat VARCHAR(50) NOT NULL,
 est_correo VARCHAR(50) NOT NULL,
 est_contrasena VARCHAR(1000) NOT NULL,
 PRIMARY KEY (est_id),
 UNIQUE uni_correo(est_correo),
 UNIQUE uni_nombre_apePat_apeMat(est_nombre,est_apePat,est_apeMat)
);

INSERT INTO estudiantes(est_nombre,est_apePat,est_apeMat,est_correo,est_contrasena)
	VALUES ('antonio','castillo','quintanilla','correo','1234');
    
INSERT INTO estudiantes(est_nombre,est_apePat,est_apeMat,est_correo,est_contrasena)
	VALUES ('cas','cas','cas','cas','cas');
    
#DELETE FROM estudiantes WHERE est_id = 3;

CREATE TABLE IF NOT EXISTS personal(
 per_id INT NOT NULL AUTO_INCREMENT,
 per_nombre VARCHAR(50) NOT NULL,
 per_apePat VARCHAR(50) NOT NULL,
 per_apeMat VARCHAR(50) NOT NULL,
 per_correo VARCHAR(50) NOT NULL,
 per_contrasena VARCHAR(1000) NOT NULL,
 PRIMARY KEY (per_id),
 UNIQUE uni_correo(per_correo),
 UNIQUE uni_nombre_apePat_apeMat(per_nombre,per_apePat,per_apeMat)
);


CREATE TABLE IF NOT EXISTS tipoUsuario(
	tpu_id INT NOT NULL AUTO_INCREMENT,
    tpu_est_id INT NOT NULL,
    tpu_per_id INT NOT NULL,
    tpu_tipo ENUM('Usuario','Personal'),
    
    PRIMARY KEY (tpu_id),
    
    INDEX idx_tipo(tpu_tipo),
    
    CONSTRAINT fk_tpu_est_id
		FOREIGN KEY (tpu_est_id)
        REFERENCES estudiantes(est_id)
        
        ON DELETE CASCADE
        ON UPDATE CASCADE,
        
	CONSTRAINT fk_tpu_per_id
		FOREIGN KEY (tpu_per_id)
        REFERENCES personal(per_id)
        
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS menu (
    men_id INT NOT NULL AUTO_INCREMENT,
    men_platillo VARCHAR(255) NOT NULL,
    men_descripcion VARCHAR(255),
    men_tipo ENUM('Desayuno', 'Comida', 'Preparado', 'Bebida') NOT NULL,
    men_categoria VARCHAR(50),
    men_precio DECIMAL(10, 2) NOT NULL,
    men_disponible BOOLEAN NOT NULL DEFAULT TRUE,
    men_ingredientes TEXT,
    men_tiempo_preparacion INT,
    PRIMARY KEY (men_id)
);

INSERT INTO menu(men_platillo, men_descripcion, men_tipo, men_categoria, men_precio, men_disponible, men_ingredientes, men_tiempo_preparacion)
	VALUES('Pozole con Salchicha', 'pozole con salchicha', 'Comida', 'Sopas', 85.00, 1, 'Salchicha, maíz, chile, cebolla, ajo', 45);

CREATE TABLE IF NOT EXISTS pedido (
    ped_id INT NOT NULL AUTO_INCREMENT,
    ped_est_id INT NOT NULL,
    ped_per_id INT NOT NULL,
    ped_descripcion VARCHAR(255) NOT NULL,
    ped_estado ENUM('pendiente', 'en_proceso', 'completado') NOT NULL DEFAULT 'pendiente',
    ped_fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (ped_id),
    CONSTRAINT fk_pedido_estudiantes
        FOREIGN KEY (ped_est_id)
        REFERENCES estudiantes(est_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_pedido_personal
        FOREIGN KEY (ped_per_id)
        REFERENCES personal(per_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS pedido_menu (
    ped_menu_id INT NOT NULL,
    ped_id INT NOT NULL,
    men_id INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    PRIMARY KEY (ped_menu_id),
    FOREIGN KEY (ped_id) REFERENCES pedido(ped_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (men_id) REFERENCES menu(men_id) ON DELETE CASCADE ON UPDATE CASCADE
);
