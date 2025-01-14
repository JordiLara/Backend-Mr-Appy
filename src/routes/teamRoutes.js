import { Router } from "express";
import { getTeam, getTeamMembers } from "../controllers/teamController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();

// Rutas para obtener y modificar los datos de los equipos
router.get("/", authenticateToken(["user"]), getTeam);
router.get("/users", authenticateToken(["user"]), getTeamMembers);
router.get("/:id_team", getTeam);

export default router;
