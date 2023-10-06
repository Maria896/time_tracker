import express from "express";
import { createNewProject } from "../controllers/project.controller.js";
import { adminHandler } from "../middleware/admin.middleware.js";
import { authHandler } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/create-project",authHandler, adminHandler, createNewProject);

export default router;