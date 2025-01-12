// src/routes/userRoutes.js
import { Router } from "express";
import { createReview, getReviews } from "../controllers/reviewController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();

// Rutas para obtener y modificar los datos de los usuarios
router.get("/", authenticateToken(["user"]), getReviews);
router.post("/", authenticateToken(["user"]), createReview);

export default router;
