import { Router } from "express";
import { getTeam } from "../controllers/teamController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();

// Rutas para obtener y modificar los datos de los equipos
router.get("/", authenticateToken(["user"]), getTeam);

export default router;
