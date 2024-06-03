import { Router } from "express";
import { getAllMenuComida, getAllMenuPlatillos, getAllMenyBebidas, getAllMenuDesayunos, postmenu } from "../controllers/MenuEst.js";

import { getCarUser, deleteCarMenu } from "../controllers/contVerPedido.js"
const router = Router();

router.get("/menuComida", getAllMenuComida);
router.get("/menuPlatillos", getAllMenuPlatillos);
router.get("/menuBebidas", getAllMenyBebidas);
router.get("/menuDesayunos", getAllMenuDesayunos);

router.post("/regcarrito",postmenu); 
router.get("/carrito:est_id",getCarUser);
router.delete("/eliminarmenu",deleteCarMenu);
export default router;