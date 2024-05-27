import { Router } from "express";
import { getAllMenuComida, getAllMenuPlatillos, getAllMenyBebidas } from "../controllers/MenuEst.js";

const router = Router();

router.get("/menuComida", getAllMenuComida);
router.get("/menuPlatillos", getAllMenuPlatillos);
router.get("/menuBebidas", getAllMenyBebidas);

export default router;