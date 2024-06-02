import { Router } from "express";
import { getAllMenuComida, getAllMenuPlatillos, getAllMenyBebidas, getAllMenuDesayunos } from "../controllers/MenuEst.js";

const router = Router();

router.get("/menuComida", getAllMenuComida);
router.get("/menuPlatillos", getAllMenuPlatillos);
router.get("/menuBebidas", getAllMenyBebidas);
router.get("/menuDesayunos", getAllMenuDesayunos);

export default router;