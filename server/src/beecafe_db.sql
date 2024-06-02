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
	VALUES ('Osvaldo','Martinez','Gonzalez','o.martinezgonzalez@ugto.mx','omg123');    
INSERT INTO estudiantes(est_nombre,est_apePat,est_apeMat,est_correo,est_contrasena)
	VALUES ('Oscar','Rosas','zavala','or.rosaszavala@ugto.mx','123456');    

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

INSERT INTO personal(per_nombre,per_apePat,per_apeMat,per_correo,per_contrasena)
	VALUES ('Amanda','Perez','Costa','cafeteria@ugto.mx','1234');


CREATE TABLE IF NOT EXISTS menu (
    men_id INT NOT NULL AUTO_INCREMENT,
    men_platillo VARCHAR(255) NOT NULL,
    men_descripcion VARCHAR(255),
    men_tipo ENUM('Desayuno', 'Comida', 'Platillo', 'Bebida') NOT NULL,
    men_categoria VARCHAR(50),
    men_precio DECIMAL(10,2) NOT NULL,
    men_disponible BOOLEAN NOT NULL DEFAULT TRUE,
    men_ingredientes TEXT,
    men_tiempo_preparacion INT,
    men_img VARCHAR(255),
    PRIMARY KEY (men_id)
);


CREATE TABLE IF NOT EXISTS carrito(
    car_id INT NOT NULL AUTO_INCREMENT,
    car_est_id INT NOT NULL, 
    car_men_id INT NOT NULL,
    car_descripcion TEXT,
    car_cantidadFinal DECIMAL(10,2) NOT NULL,
    
    PRIMARY KEY (car_id),
    CONSTRAINT fk_carrito_estudiantes
        FOREIGN KEY (car_est_id)
        REFERENCES estudiantes(est_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
        
        
	    CONSTRAINT fk_carrito_menu
        FOREIGN KEY (car_men_id)
        REFERENCES menu(men_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


#INSERT INTO carrito(car_est_id,car_men_id,car_cantidadFinal,car_descripcion)
#	VALUES('1','1','123.43','no colocar x cosa');

CREATE TABLE IF NOT EXISTS pedido (
    ped_id INT NOT NULL AUTO_INCREMENT,
    ped_car_id INT NOT NULL, 
    ped_per_id INT NOT NULL,
    ped_estado ENUM('pendiente', 'en proceso', 'completado') NOT NULL DEFAULT 'pendiente',
    ped_fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (ped_id),
    CONSTRAINT fk_pedido_estudiantes
        FOREIGN KEY (ped_car_id)
        REFERENCES estudiantes(est_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_pedido_personal
        FOREIGN KEY (ped_per_id)
        REFERENCES personal(per_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

#INSERT INTO pedido(ped_car_id,ped_per_id, ped_estado)
#	VALUES ('1','1','en proceso');


--     men_platillo
--     men_descripcion
--     men_tipo ENUM('Desayuno', 'Comida', 'Platillo', 'Bebida') NOT NULL,
--     men_categoria VARCHAR(50),
--     men_precio DECIMAL(10, 2)
--     men_disponible BOOLEAN NOT NULL DEFAULT TRUE,
--     men_ingredientes TEXT,
--     men_tiempo_preparacion INT

INSERT INTO menu(men_platillo, men_descripcion, men_tipo, men_categoria, men_precio, men_disponible, men_ingredientes, men_tiempo_preparacion, men_img)
	VALUES('Pozole con Salchicha', 'pozole con salchicha', 'Comida', 'Sopas', 85.00, 1, 'Salchicha, maíz, chile, cebolla, ajo', 45, '../assets/images/comidas/1.jpg'),
            ('Guiso', 'Frijoles, pan, café o agua de frutas', 'Desayuno', 'Desayunos', 65.00, 1, 'Frijoles y pan, Café o agua de frutas', 20, '../assets/images/comidas/2.jpg'),
            ('Yoghurt preparado', 'Un yoghurt preparado con frutas, cereales y granola', 'Desayuno', 'Cocteles', 35.00, 1, 'frutas, cereales y granola', 20, '../assets/images/comidas/3.jpg'),
            ('Coctel de frutas', 'Delicioso coctel de frutas preparado', 'Desayuno', 'Cocteles', 30.00, 1, 'frutas, miel y granola', 20, '../assets/images/comidas/4.jpg'),
            ('Flan', 'Delicioso flan', 'Desayuno', 'Cocteles', 17.00, 1, 'Flan', 20, './assets/images/comidas/5.jpg'),
            ('Gelatina', 'Una gelatina lista para desayunar', 'Desayuno', 'Cocteles', 20.00, 1, 'Gelatina', 20, '../assets/images/comidas/6.jpg'),
            ('Arroz con leche', 'Una gran combinación para quitar el hambre', 'Desayuno', 'Cocteles', 20.00, 1, 'Leche y arroz', 20, '../assets/images/comidas/7.jpg'),
            ('Sopa del día', 'Plato fuerte más arroz o espagueti, verdura o frijoles, tortilla y agua de frutas', 'Comida', 'Comida corrida', 80.00, 1, 'Arroz o spaghetti, verduras o frijoles, Tortillas de maíz con un agua de frutas', 20, '../assets/images/comidas/8.jpg'),
            ('Torta de huevo', 'Una torta de huevo', 'Comida', 'Comida rápida', 30.00, 1, 'Pan, huevo', 15, '../assets/images/comidas/9.jpg'),
            ('Torta de jamón', 'Deliciosa torta de jamón', 'Comida', 'Comida rápida', 35.00, 1, 'Pan, jamón, verdura', 15, '../assets/images/comidas/10.jpg'),
            ('Torta de chorizo', 'Deliciosa torta de chorizo', 'Comida', 'Comida rápida', 45.00, 1, 'Pan y chorizo', 20, '../assets/images/comidas/11.jpg'),
            ('Torta de carnitas', 'Deliciosa torta de carnitas', 'Comida', 'Comida rápida', 50.00, 1, 'Pan, carnitas', 25, '../assets/images/comidas/12.jpg'),
            ('Torta cubana', 'Deliciosa torta cubana con pierna, queso asadero y amarillo, salchicha y jamón', 'Comida', 'Comida rápida', 60.00, 1, 'Pan, jamón, verdura', 30, '../assets/images/comidas/13.jpg'),
            ('Jugo de naranja (Vaso)', 'Un vaso de jugo de naranja para la sed', 'Bebida', 'Bebidas', 25.00, 1, 'Naranja, agua', 15, '../assets/images/comidas/14.jpg'),
            ('Jugo de naranja (Litro)', 'Un litro de jugo de naranja para la sed', 'Bebida', 'Bebidas', 40.00, 1, 'Naranja, agua', 15, '../assets/images/comidas/15.jpg'),
            ('Agua fresca de frutas (Vaso)', 'Un vaso de agua de frutas para la sed', 'Bebida', 'Bebidas', 17.00, 1, 'Fruta, agua', 20, '../assets/images/comidas/16.jpg'),
            ('Agua fresca de frutas (Litro)', 'Un litro de agua de frutas para la sed', 'Bebida', 'Bebidas', 27.00, 1, 'Fruta, agua', 20, '../assets/images/comidas/17.jpg'),
            ('Café de olla', 'Café preparado en olla', 'Bebida', 'Bebidas', 15.00, 1, 'Café', 20, '../assets/images/comidas/18.jpg'),
            ('Café con leche', 'Café preparado con leche', 'Bebida', 'Bebidas', 20.00, 1, 'Café y leche', 20, '../assets/images/comidas/19.jpg'),
            ('Té', 'Un delicioso té preparado', 'Bebida', 'Bebidas', 12.00, 1, 'Té, agua', 20, '../assets/images/comidas/20.jpg'),
            ('Nescafé', 'Un nescafé preparado', 'Bebida', 'Bebidas', 15.00, 1, 'Nescafé', 20, '../assets/images/comidas/21.jpg'),
            ('Sandwich de Jamón', 'Delicioso sandwich de jamón', 'Platillo', 'Sandwich', 30.00, 1, 'Pan para sandwich y jamón', 10, '../assets/images/comidas/22.jpg'),
            ('Club del Sandwich', 'Delicioso sándwich de 3 pisos', 'Platillo', 'Sandwich', 70.00, 1, 'Pan para sandwich tostado con jamón, pierna, queso', 20, '../assets/images/comidas/23.jpg'),
            ('Hamburguesa', 'Deliciosa Hamburguesa', 'Platillo', 'Sandwich', 50.00, 1, 'Pan hamburguesa, queso amarillo, carne para hamburguesa, verdura', 20, '../assets/images/comidas/24.jpg'),
            ('Hamburguesa con papas', 'Deliciosa Hamburguesa con papas', 'Platillo', 'Sandwich', 65.00, 1, 'Pan hamburguesa, queso amarillo, carne para hamburguesa, verdura y papas aparte', 20, '../assets/images/comidas/25.jpg'),
            ('Hot Dog', 'Delicioso Hot dog', 'Platillo', 'Sandwich', 20.00, 1, 'Pan para hot dog, salchicha y verdura', 20, '../assets/images/comidas/26.jpg'),
            ('Hot Dog con papas', 'Delicioso Hot dog con papas', 'Platillo', 'Sandwich', 40.00, 1, 'Pan para hot dog, salchicha y verdura y papas aparte', 20, '../assets/images/comidas/27.jpg'),
            ('Quesadilla sencilla', 'Deliciosa quesadilla', 'Platillo', 'Sandwich', 20.00, 1, 'Tortilla de harina con queso a elegir el ingrediente', 20, '../assets/images/comidas/28.jpg'),
            ('Quesadilla de guisado, bistec o chorizo', 'Deliciosa quesadilla de guisado, bistec o chorizo', 'Platillo', 'Sandwich', 30.00, 1, 'Tortilla, queso e ingrediente elegido', 20, '../assets/images/comidas/29.jpg'),
            ('Sincronizada', 'Una deliciosa sincronizada', 'Platillo', 'Sandwich', 45.00, 1, 'Tortilla de harina, pierna, queso', 20, '../assets/images/comidas/30.jpg'),
            ('Burritos', 'Burritos caseros', 'Platillo', 'Sandwich', 20.00, 1, 'Tortilla de harina', 20, '../assets/images/comidas/31.jpg'),
            ('Tacos de chorizo', 'Deliciosos tacos de chorizo', 'Platillo', 'Tacos', 12.00, 1, 'Tortilla de maiz con chorizo', 15, '../assets/images/comidas/32.jpg'),
            ('Tacos de bistec', 'Deliciosos tacos de bistec', 'Platillo', 'Tacos', 12.00, 1, 'Tortilla de maiz con bistec', 15, '../assets/images/comidas/33.jpg'),
            ('Tacos dorados de pollo', 'Lleva tu orden de 6 tacos dorados de pollo', 'Platillo', 'Tacos', 45.00, 1, 'Tortilla dorada con pollo', 15, '../assets/images/comidas/34.jpg'),
            ('Tacos dorados de papa', 'Lleva tu orden de 6 tacos dorados de papa', 'Platillo', 'Tacos', 45.00, 1, 'Tortilla dorada con papa', 15, '../assets/images/comidas/35.jpg'),
            ('Orden de nuggets', 'Llévate tus nuggets con papas o pasta', 'Platillo', 'Tacos', 45.00, 1, 'Pollo, papas o pasta', 15, '../assets/images/comidas/36.jpg');


-- SELECT * FROM menu;
-- SELECT * FROM menu WHERE men_tipo = 'Platillo';
-- SELECT * FROM menu WHERE men_tipo = 'Comida';
-- SELECT * FROM menu WHERE men_tipo = 'Bebida';
-- SELECT * FROM menu WHERE men_tipo = 'Desayuno';
    

