import express from 'express';
import {
  crearPedido,
  obtenerPedidos,
  cambiarPlatilloPedido,
  obtenerDetallesPedidoEstudiante
} from '../controllers/pedidoController.js';

const router = express.Router();

router.post('/crear', crearPedido);
router.get('/obtener', obtenerPedidos);
router.put('/cambiar-platillo', cambiarPlatilloPedido);
router.get('/detalles/:ped_id', obtenerDetallesPedidoEstudiante);

export default router;
