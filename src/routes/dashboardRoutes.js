import { Router } from "express";
import {
  getMoodStatistics,
  getRecentReviews,
  getTeamActivity,
} from "../controllers/dasboardController.js";
import { authenticateToken } from "../middlewares/authenticateToken";

const router = Router();

router.get("/moods", authenticateToken(["manager"]), getMoodStatistics);
router.get("/reviews", authenticateToken(["manager"]), getRecentReviews);
router.get("/activity", authenticateToken(["manager"]), getTeamActivity);

export default router;