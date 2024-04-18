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

