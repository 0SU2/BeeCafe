CREATE DATABASE IF NOT EXISTS beecafe_db; 

USE beecafe_db;

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

