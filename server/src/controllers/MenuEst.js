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