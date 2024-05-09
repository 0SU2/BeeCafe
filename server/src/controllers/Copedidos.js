import { connDB } from "../database.js";

// Crear un nuevo pedido
export const crearPedido = async (req, res) => {
  try {
    const conn = await connDB();
    const { est_id, menu } = req.body;

    // Crear el pedido
    const [result] = await conn.execute(
      "INSERT INTO pedido (est_id, estado) VALUES (?, 'pendiente')",
      [est_id]
    );

    const ped_id = result.insertId;

    // Agregar comidas al detalle del pedido
    if (menu && menu.length > 0) {
      for (const menu_id of menu) {
        await conn.execute(
          "INSERT INTO pedido_menu (ped_id, men_id) VALUES (?, ?)",
          [ped_id, menu_id]
        );
      }
    }

    const newPedido = {
      ped_id,
      est_id,
      estado: 'pendiente',
      menu: menu || [] // devolver las comidas asociadas al pedido
    };

    res.json(newPedido);
  } catch (error) {
    console.error('Error al crear pedido:', error);
  }
};

// Obtener todos los pedidos registrados
export const obtenerPedidos = async (req, res) => {
  try {
    const conn = await connDB();

    const [rows] = await conn.execute(
      "SELECT p.ped_id, p.est_id, p.estado, pm.men_id, m.men_platillo AS nombre_menu, pm.cantidad FROM pedido p JOIN pedido_menu pm ON p.ped_id = pm.ped_id JOIN menu m ON pm.men_id = m.men_id"
    );

    // Procesar los resultados para organizarlos por pedido
    const pedidos = {};
    rows.forEach(row => {
      const { ped_id, est_id, estado, men_id, men_platillo, cantidad } = row;
      if (!pedidos[ped_id]) {
        pedidos[ped_id] = {
          ped_id,
          est_id,
          estado,
          items: []
        };
      }
      pedidos[ped_id].items.push({ men_id, men_platillo, cantidad });
    });

    // Convertir el objeto de pedidos en un array antes de devolverlo
    const pedidosArray = Object.values(pedidos);

    res.json(pedidosArray);
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
  }
};
