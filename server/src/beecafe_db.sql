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
	VALUES('Pozole con Salchicha', 'pozole con salchicha', 'Comida', 'Sopas', 85.00, 1, 'Salchicha, maíz, chile, cebolla, ajo', 45, 'https://aderezo.mx/wp-content/uploads/2023/09/FtdNaNVXgAQsx7e.jpeg'),
            ('Guiso', 'Frijoles, pan, café o agua de frutas', 'Desayuno', 'Desayunos', 65.00, 1, 'Frijoles y pan, Café o agua de frutas', 20, 'https://media.ambito.com/p/1b3988a1cf0283e96b2b179e92631596/adjuntos/239/imagenes/040/874/0040874568/receta-del-guiso-carrerojpg.jpg'),
            ('Yoghurt preparado', 'Un yoghurt preparado con frutas, cereales y granola', 'Desayuno', 'Cocteles', 35.00, 1, 'frutas, cereales y granola', 20, 'https://www.dairydiscoveryzone.com/sites/default/files/ParfaitsMain.jpg'),
            ('Coctel de frutas', 'Delicioso coctel de frutas preparado', 'Desayuno', 'Cocteles', 30.00, 1, 'frutas, miel y granola', 20, 'https://peopleenespanol.com/thmb/nKNCbtZACj0CWsvOSBEdfu4LDHM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/coctel-de-frutas-facil-2000-7dd72cf51d2d4c9d8e876b85255111e6.jpg'),
            ('Flan', 'Delicioso flan', 'Desayuno', 'Cocteles', 17.00, 1, 'Flan', 20, 'https://www.lactaidenespanol.com/sites/lactaid_us/files/recipe-images/easy_flan2_0.jpg'),
            ('Gelatina', 'Una gelatina lista para desayunar', 'Desayuno', 'Cocteles', 20.00, 1, 'Gelatina', 20, 'https://www.eluniversal.com.mx/resizer/w9My9ie3sZ-si7DAvOjapZXdKp4=/1100x666/cloudfront-us-east-1.images.arcpublishing.com/eluniversal/WK5O5PRORFDCPAFAIPLQIFHLBQ.jpg'),
            ('Arroz con leche', 'Una gran combinación para quitar el hambre', 'Desayuno', 'Cocteles', 20.00, 1, 'Leche y arroz', 20, 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/A4F055C9-D340-4F2A-9015-6A2659851E84/Derivates/5b9a24d1-7748-4bfe-ba63-fb3e5f722db0.jpg'),
            ('Sopa del día', 'Plato fuerte más arroz o espagueti, verdura o frijoles, tortilla y agua de frutas', 'Comida', 'Comida corrida', 80.00, 1, 'Arroz o spaghetti, verduras o frijoles, Tortillas de maíz con un agua de frutas', 20, 'https://www.supermaxi.com/wp-content/uploads/2020/06/sopas.jpg'),
            ('Torta de huevo', 'Una torta de huevo', 'Comida', 'Comida rápida', 30.00, 1, 'Pan, huevo', 15, 'https://lh3.googleusercontent.com/proxy/0ruBOLshMCxOmCTilrIzGGwl8N2ichPyIVnwSBr0cQsUL5gILGvhhSY9yiH4-mGrzWXDxyPIFe3ojNghIlQhs08WPjJyKahFLQlrXKOVfstc0InhNtTfOo9XHhYOjE4'),
            ('Torta de jamón', 'Deliciosa torta de jamón', 'Comida', 'Comida rápida', 35.00, 1, 'Pan, jamón, verdura', 15, 'https://storage.googleapis.com/fitia-api-bucket/media/images/recipe_images/1003393.jpg'),
            ('Torta de chorizo', 'Deliciosa torta de chorizo', 'Comida', 'Comida rápida', 45.00, 1, 'Pan y chorizo', 20, 'https://lh3.googleusercontent.com/proxy/HSlFeG3GUrfLEd0OlcdQfqwCBVtEL8ljz7gpK1oG6l11FKj4Y4f8yBlw7yIzEgBsGszj_VRtuoKGurnfkzCTEB0YOVg9wfETLVVYWKIEEZuxFdLYcBx7qdDg8brm7V9zWsVjmsXiG1g'),
            ('Torta de carnitas', 'Deliciosa torta de carnitas', 'Comida', 'Comida rápida', 50.00, 1, 'Pan, carnitas', 25, 'https://tangolunda.com.mx/wp-content/uploads/2022/10/torta-carnitas.jpg'),
            ('Torta cubana', 'Deliciosa torta cubana con pierna, queso asadero y amarillo, salchicha y jamón', 'Comida', 'Comida rápida', 60.00, 1, 'Pan, jamón, verdura', 30, 'https://www.paulinacocina.net/wp-content/uploads/2023/06/que-lleva-una-torta-cubana.jpg'),
            ('Jugo de naranja (Vaso)', 'Un vaso de jugo de naranja para la sed', 'Bebida', 'Bebidas', 25.00, 1, 'Naranja, agua', 15, 'https://img77.uenicdn.com/image/upload/v1569641123/business/jugos-el-confee/46a720c9-400d-460d-854d-dfb9d924d832.jpg'),
            ('Jugo de naranja (Litro)', 'Un litro de jugo de naranja para la sed', 'Bebida', 'Bebidas', 40.00, 1, 'Naranja, agua', 15, 'https://www.gastrolabweb.com/u/fotografias/m/2020/10/11/f850x638-4179_81668_5050.jpg'),
            ('Agua fresca de frutas (Vaso)', 'Un vaso de agua de frutas para la sed', 'Bebida', 'Bebidas', 17.00, 1, 'Fruta, agua', 20, 'https://editorialtelevisa.brightspotcdn.com/wp-content/uploads/2019/08/agua-de-frutas.jpg'),
            ('Agua fresca de frutas (Litro)', 'Un litro de agua de frutas para la sed', 'Bebida', 'Bebidas', 27.00, 1, 'Fruta, agua', 20, 'https://editorialtelevisa.brightspotcdn.com/wp-content/uploads/2019/08/agua-de-frutas.jpg'),
            ('Café de olla', 'Café preparado en olla', 'Bebida', 'Bebidas', 15.00, 1, 'Café', 20, 'https://cdn2.cocinadelirante.com/sites/default/files/images/2023/11/como-preparar-cafe-de-olla-con-cafe-instantaneo.jpg'),
            ('Café con leche', 'Café preparado con leche', 'Bebida', 'Bebidas', 20.00, 1, 'Café y leche', 20, 'https://i.blogs.es/421374/cafe-con-leche2/450_1000.jpg'),
            ('Té', 'Un delicioso té preparado', 'Bebida', 'Bebidas', 12.00, 1, 'Té, agua', 20, 'https://s1.elespanol.com/2015/02/27/cocinillas/cocinillas_14258711_116097529_1706x960.jpg'),
            ('Nescafé', 'Un nescafé preparado', 'Bebida', 'Bebidas', 15.00, 1, 'Nescafé', 20, 'https://images.aws.nestle.recipes/original/c201eea5ca5dcfb889f40166a56abda6_nescafe_tres_leches_latte.png'),
            ('Sandwich de Jamón', 'Delicioso sandwich de jamón', 'Platillo', 'Sandwich', 30.00, 1, 'Pan para sandwich y jamón', 10, 'https://storage.googleapis.com/fitia-api-bucket/media/images/recipe_images/1001256.jpg'),
            ('Club del Sandwich', 'Delicioso sándwich de 3 pisos', 'Platillo', 'Sandwich', 70.00, 1, 'Pan para sandwich tostado con jamón, pierna, queso', 20, 'https://www.unileverfoodsolutions.com.mx/dam/global-ufs/mcos/NOLA/calcmenu/recipes/MX-recipes/general/club-sandwich/main-header.jpg'),
            ('Hamburguesa', 'Deliciosa Hamburguesa', 'Platillo', 'Sandwich', 50.00, 1, 'Pan hamburguesa, queso amarillo, carne para hamburguesa, verdura', 20, 'https://www.recetasnestle.com.ec/sites/default/files/srh_recipes/4e4293857c03d819e4ae51de1e86d66a.jpg'),
            ('Hamburguesa con papas', 'Deliciosa Hamburguesa con papas', 'Platillo', 'Sandwich', 65.00, 1, 'Pan hamburguesa, queso amarillo, carne para hamburguesa, verdura y papas aparte', 20, 'https://media.istockphoto.com/id/495204032/photo/fresh-tasty-burger.jpg?s=612x612&w=0&k=20&c=k6X_gSHlo-WdKsqTnfBjoEbjdhrlz6RNhUs23ivpIxk='),
            ('Hot Dog', 'Delicioso Hot dog', 'Platillo', 'Sandwich', 20.00, 1, 'Pan para hot dog, salchicha y verdura', 20, 'https://img-global.cpcdn.com/recipes/18aa41b0550d6ad5/1200x630cq70/photo.jpg'),
            ('Hot Dog con papas', 'Delicioso Hot dog con papas', 'Platillo', 'Sandwich', 40.00, 1, 'Pan para hot dog, salchicha y verdura y papas aparte', 20, 'https://img.freepik.com/foto-gratis/papas-fritas-delicioso-hot-dog-alto-angulo_23-2149235977.jpg'),
            ('Quesadilla sencilla', 'Deliciosa quesadilla', 'Platillo', 'Sandwich', 20.00, 1, 'Tortilla de harina con queso a elegir el ingrediente', 20, 'https://www.vvsupremo.com/wp-content/uploads/2015/11/900X570_Two-Cheese-Quesadillas.jpg'),
            ('Quesadilla de guisado, bistec o chorizo', 'Deliciosa quesadilla de guisado, bistec o chorizo', 'Platillo', 'Sandwich', 30.00, 1, 'Tortilla, queso e ingrediente elegido', 20, 'https://www.vvsupremo.com/wp-content/uploads/2015/11/Quesadillas-con-Chorizo-y-Rajas.jpg'),
            ('Sincronizada', 'Una deliciosa sincronizada', 'Platillo', 'Sandwich', 45.00, 1, 'Tortilla de harina, pierna, queso', 20, 'https://www.vvsupremo.com/wp-content/uploads/2016/07/N-Bacon-Chicken-Quesadillas-900x570.jpg'),
            ('Burritos', 'Burritos caseros', 'Platillo', 'Sandwich', 20.00, 1, 'Tortilla de harina', 20, 'https://upload.wikimedia.org/wikipedia/commons/4/44/Burrito_chihuahuense_de_chile_verde.jpg'),
            ('Tacos de chorizo', 'Deliciosos tacos de chorizo', 'Platillo', 'Tacos', 12.00, 1, 'Tortilla de maiz con chorizo', 15, 'https://www.vvsupremo.com/foodservice/wp-content/uploads/2017/03/Chorizo-Tacodilla-FS2-716x483-sRGB.jpg'),
            ('Tacos de bistec', 'Deliciosos tacos de bistec', 'Platillo', 'Tacos', 12.00, 1, 'Tortilla de maiz con bistec', 15, 'https://storage.googleapis.com/avena-recipes/2019/10/1571780969333.jpeg'),
            ('Tacos dorados de pollo', 'Lleva tu orden de 6 tacos dorados de pollo', 'Platillo', 'Tacos', 45.00, 1, 'Tortilla dorada con pollo', 15, 'https://www.casademexico.es/wp-content/uploads/2022/08/DMC00074-pagina.jpg'),
            ('Tacos dorados de papa', 'Lleva tu orden de 6 tacos dorados de papa', 'Platillo', 'Tacos', 45.00, 1, 'Tortilla dorada con papa', 15, 'https://www.recetasnestle.com.mx/sites/default/files/styles/recipe_detail_desktop/public/srh_recipes/1eaebadfb077e6a739ad5e6494ad75be.png?itok=t_QIvTKb'),
            ('Orden de nuggets', 'Llévate tus nuggets con papas o pasta', 'Platillo', 'Tacos', 45.00, 1, 'Pollo, papas o pasta', 15, 'https://i.ytimg.com/vi/wVXxj5h6fmc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBLyfTy7NUkXoDZmfMy5BZ3P3kMiA');


-- SELECT * FROM menu;
-- SELECT * FROM menu WHERE men_tipo = 'Platillo';
-- SELECT * FROM menu WHERE men_tipo = 'Comida';
-- SELECT * FROM menu WHERE men_tipo = 'Bebida';
-- SELECT * FROM menu WHERE men_tipo = 'Desayuno';
    

