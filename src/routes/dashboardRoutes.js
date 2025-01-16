import { Router } from "express";
import {
  getMoodStatistics,
  getRecentReviews,
  getTeamActivity,
} from "../controllers/dashboardController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();

router.get("/moods", authenticateToken(["manager"]), getMoodStatistics);
router.get("/reviews", authenticateToken(["manager"]), getRecentReviews);
router.get("/activity", authenticateToken(["manager"]), getTeamActivity);

export default router;