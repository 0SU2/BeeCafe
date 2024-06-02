import { conn } from "../connection.js";
import { connDB } from "../database.js";

// Crear un nuevo pedido
export const crearPedido = async (req, res) => {
  try {
    const { car_id, ped_per_id } = req.body;
    const conn = await connDB();

    // Crear el pedido
    const [result] = await conn.execute(
      "INSERT INTO pedido (ped_car_id, ped_per_id, ped_estado) VALUES (?, ?, 'pendiente')",
      [car_id, ped_per_id]
    );

    const newPedido = {
      ped_id: result.insertId,
      ped_car_id: car_id,
      ped_per_id,
      ped_estado: 'pendiente'
    };

    res.json(newPedido);
  } catch(err){
    console.error(err);
    res.json({"success" : false , "msg": err.sqlMessage })
    }
};

// Obtener todos los pedidos registrados
export const obtenerPedidos = async (req, res) => {
  try {
    const conn = await connDB();

    const [rows] = await conn.execute(
      "SELECT * FROM pedido"
    );

    res.json(rows);
  } catch(err){
    console.error(err);
    res.json({"success" : false , "msg": err.sqlMessage })
    }
};

// Cambiar el platillo de un pedido
export const cambiarPlatilloPedido = async (req, res) => {
  try {
    const { ped_id, nuevo_men_id } = req.body;
    const conn = await connDB();

    // Verificar si el pedido existe
    const [pedido] = await conn.execute(
      "SELECT * FROM pedido WHERE ped_id = ?",
      [ped_id]
    );

    if (pedido.length === 0) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    // Actualizar el platillo del pedido
    await conn.execute(
      "UPDATE carrito SET car_men_id = ? WHERE car_id = ?",
      [nuevo_men_id, pedido[0].ped_car_id]
    );

    res.json({ message: 'Platillo del pedido actualizado exitosamente' });
  } catch(err){
    console.error(err);
    res.json({"success" : false , "msg": err.sqlMessage })
    }
};

// Obtener detalles del pedido para un estudiante
export const obtenerDetallesPedidoEstudiante = async (req, res) => {
  try {
    const { ped_id } = req.params;
    const conn = await connDB();

    // Obtener detalles del pedido
    const [pedido] = await conn.execute(
      `SELECT p.ped_id, p.ped_estado, p.ped_fecha, m.men_platillo, m.men_precio, m.men_ingredientes
      FROM pedido p
      INNER JOIN carrito c ON p.ped_car_id = c.car_id
      INNER JOIN menu m ON c.car_men_id = m.men_id
      WHERE p.ped_id = ?`,
      [ped_id]
    );

    if (pedido.length === 0) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    // Calcular precio total del pedido
    const precioTotal = pedido.reduce((total, item) => total + item.men_precio, 0);

    // Devolver detalles del pedido junto con el precio total
    res.json({ pedido: pedido[0], precioTotal });
  } catch(err){
    console.error(err);
    res.json({"success" : false , "msg": err.sqlMessage })
    }
};

export const getCarUser = async (req,res) => {
  try{
    const est_id = req.params
    const conn = await connDB();

    const [carrito] = await conn.execute(`
      SELECT * FROM carrito WHERE car_est_id = ?`, 
      [est_id]);

    if (carrito.length === 0) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    res.json({carrito:carrito[0]});    
  }catch(err){
    console.log(err)
    res.json({"success" : false , "msg": err.sqlMessage })
  }
};


export const deleteCarMenu = async (req,res) =>{
  try{
      const { car_est_id, car_men_id} = req.body
      const conn = await connDB();

      const [eliminar] = await conn.execute(` 
        DELETE FROM carrito WHERE car_est_id = ? AND car_men_id = ?
      `, [car_est_id,car_men_id]);

      res.json({"success": true, "msg": "Platillo eliminado"});
  }catch(err){
    console.log(err)
    res.json({"success" : false , "msg": err.sqlMessage })
  }

}