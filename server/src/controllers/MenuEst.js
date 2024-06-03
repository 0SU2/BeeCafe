import { connDB } from "../database.js"

export const getAllMenuComida = async(req, res) => {
  const conn = await connDB();
  const [rows] = await conn.execute("SELECT * FROM menu WHERE men_tipo = 'Comida'");
  res.json(rows);
}

export const getAllMenuPlatillos = async(req, res) => {
  const con = await connDB();
  const [rows] = await con.execute("SELECT * FROM menu WHERE men_tipo = 'Platillo' ");
  res.json(rows)
}

export const getAllMenyBebidas = async(req, res) => {
  const con = await connDB();
  const [rows] = await con.execute("SELECT * FROM menu WHERE men_tipo = 'Bebida' ");
  res.json(rows)
}

export const getAllMenuDesayunos = async(req, res) => {
  const con = await connDB();
  const [rows] = await con.execute("SELECT * FROM menu WHERE men_tipo = 'Desayuno' ");
  res.json(rows)
}

export const postmenu = async(req,res) =>{

  try{
    const conn = await connDB();
    const body = req.body.data;
    const [result] = await conn.execute(
      "INSERT INTO carrito(car_est_id,car_men_id) VALUES(?,?)",
      [body.car_est_id,body.car_men_id]
      
    );
    
    const newCar ={
        car_id:result.insertId,
        ...req.body
    };
    console.log(newCar);
    res.json({"success": true, "msg": newCar});


  }catch(err){
    console.error(err);
    res.json({"success" : false , "msg": err.sqlMessage })
  }
}

export const agregarCarrito = async(req,res) => {
  try {
    const conn = await connDB();
    const body = req.body.userId;
    // se  borran sus pedidos para volver a crearlos
    const [firstDelete] = await conn.execute(
      "DELETE FROM pedido WHERE ped_car_id IN (SELECT car_id FROM carrito WHERE car_est_id = ?)",
      [body]
    )
    const [result] = await conn.execute(
      "INSERT INTO pedido (ped_car_id, ped_cantidadTotal, car_fecha) SELECT carrito.car_id, menu.men_precio, carrito.car_fecha FROM carrito, menu WHERE carrito.car_est_id = ? AND menu.men_id = carrito.car_men_id; ",
      [body]
    );
    console.log(result);
    res.json({"success": true})
  } catch (error) {
    console.log(error);
    res.json({"success": false, "msg": err})
  }
}