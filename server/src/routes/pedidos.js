import express from 'express';
import {
  crearPedido,
  obtenerPedidos,
  cambiarPlatilloPedido,
  obtenerDetallesPedidoEstudiante
} from '../controllers/contVerPedido.js';

const pedidos = express.Router();

pedidos.post('/crear', crearPedido);
pedidos.get('/obtener', obtenerPedidos);
pedidos.put('/cambiar-platillo', cambiarPlatilloPedido);
pedidos.get('/detalles/:ped_id', obtenerDetallesPedidoEstudiante);

export default pedidos;
