import { Router } from "express";
import { getUserStats } from "../controllers/statsController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();

router.get("/stats", authenticateToken(["user"]), getUserStats);

export default router;
