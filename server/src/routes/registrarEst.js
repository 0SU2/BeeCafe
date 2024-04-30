//import express from 'express'
//import connDB from '../connection'
import { Router } from 'express';

import { registrarEstudiante,
            getText,
            getEstudiantes
       } from '../controllers/CregistrarEst.js';

const router = Router();

router.post('/registro',registrarEstudiante);
router.get('/tasks',getText);
router.get('/estudiantes',getEstudiantes);

export default router;