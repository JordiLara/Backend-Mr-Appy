// src/routes/userRoutes.js
import { Router } from "express";
import { createReview, getReviews, getTeamReviews } from "../controllers/reviewController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();

// Rutas para obtener y modificar los datos de los usuarios
router.get("/", authenticateToken(["user"]), getReviews);
router.get("/team", authenticateToken(["manager"]), getTeamReviews);
router.post("/", authenticateToken(["user"]), createReview);

export default router;
