//import express from 'express'
//import connDB from '../connection'
import { Router } from 'express';

import { registrarEstudiante,
            getText,
            getEstudiantes,
            loginEstudiante
       } from '../controllers/CregistrarEst.js';

const router = Router();

router.post('/registro',registrarEstudiante);
router.get('/tasks',getText);
router.get('/estudiantes',getEstudiantes);
router.get('/inicioSession', loginEstudiante)

export default router;