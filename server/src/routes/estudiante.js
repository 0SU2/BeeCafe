//import express from 'express'
//import connDB from '../connection'
import { Router } from 'express';

import { registrarEstudiante,
            getText,
            getEstudiantes,
            loginEstudiante
       } from '../controllers/Estudiante.js';

const router = Router();

router.post('/estudiante/registro',registrarEstudiante);

router.get('/tasks',getText);
router.get('/estudiantes/:id',getEstudiantes);
router.get('/inicioSession', loginEstudiante);

export default router;