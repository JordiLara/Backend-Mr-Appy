import { Router } from "express";
import { getReviewEntries } from "../controllers/calendarController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();

router.get("/reviews", authenticateToken(["user"]), getReviewEntries);

export default router;
