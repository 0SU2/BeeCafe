import { Router } from "express";
import { getAllMenuComida, getAllMenuPlatillos, getAllMenyBebidas, getAllMenuDesayunos, postmenu, agregarCarrito } from "../controllers/MenuEst.js";

import { getCarUser, deleteCarMenu } from "../controllers/contVerPedido.js"
const router = Router();

router.get("/menuComida", getAllMenuComida);
router.get("/menuPlatillos", getAllMenuPlatillos);
router.get("/menuBebidas", getAllMenyBebidas);
router.get("/menuDesayunos", getAllMenuDesayunos);

router.post("/regcarrito",postmenu); 
router.get("/carrito:est_id",getCarUser);
router.delete("/eliminarmenu",deleteCarMenu);
router.post("/agregarCarrito", agregarCarrito);

export default router;