import { Router } from "express";
import {
  getMoodStatistics,
  getRecentReviews,
  getTeamActivity,
  getTeamSize,
} from "../controllers/dashboardController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();

router.get("/moods", authenticateToken(["manager"]), getMoodStatistics);
router.get("/reviews", authenticateToken(["manager"]), getRecentReviews);
router.get("/activity", authenticateToken(["manager"]), getTeamActivity);
router.get("/team-size", authenticateToken(["manager"]), getTeamSize);

export default router;
