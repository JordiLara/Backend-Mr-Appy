// src/routes/userRoutes.js
import { Router } from "express";
import { createReview, getReviews, getTeamReviews } from "../controllers/reviewController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import { createReviewValidator } from "../validations/review.Validation.js";
import { validationResult } from "express-validator";

const router = Router();

// Rutas para obtener y modificar los datos de los usuarios
router.get("/", authenticateToken(["user"]), getReviews);
router.get("/team", authenticateToken(["manager"]), getTeamReviews);
router.post(
  "/",
  authenticateToken(["user"]),
  createReviewValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ code: -10, errors: errors.array() });
    }
    next();
  },
  createReview
);

export default router;
