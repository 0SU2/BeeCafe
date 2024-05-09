import { Router } from 'express';
import { crearPedido, obtenerPedidos } from '../controllers/Cpedidos.js';

const router = Router();

router.post('/pedido', crearPedido); // Endpoint para que el usuario realice un pedido
router.get('/pedidos', obtenerPedidos); // Endpoint para que el personal vea todos los pedidos

export default router;