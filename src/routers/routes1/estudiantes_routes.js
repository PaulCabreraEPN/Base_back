import { Router } from "express";
import { verificarAutenticacion } from "../../middlewares/JWT.js";
import { actualizar, buscar, eliminar, listar, registrar } from "../../controllers/controls1/estudantes_controllers.js";

const router = Router();

router.get('/estudiantes', verificarAutenticacion, listar);
router.get('/estudiantes/:cedula', verificarAutenticacion, buscar)
router.post('/estudiantes/registrar', verificarAutenticacion, registrar);
router.put('/estudiantes/actualizar/:id', verificarAutenticacion, actualizar);
router.delete('/estudiantes/eliminar/:id', verificarAutenticacion, eliminar)

export default router;