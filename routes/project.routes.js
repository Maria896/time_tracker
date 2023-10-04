import express from "express";
import { createNewProject } from "../controllers/project.controller.js";

const router = express.Router();

router.post("/create-project", createNewProject);

export default router;