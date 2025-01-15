import { Router } from "express";
import {getMoodEntries} from "../controllers/calendarController.js"
import { authenticateToken } from "../middlewares/authenticateToken";

const router = Router();

router.get("/moods", authenticateToken(["user"]), getMoodEntries);

export default router;