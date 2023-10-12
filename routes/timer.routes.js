import express from "express";
import { startYourTimer } from "../controllers/timer.controller.js";
import { authHandler } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/start-timer/:userId/:projectId", authHandler, startYourTimer);

export default router;