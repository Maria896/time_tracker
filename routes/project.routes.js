import express from "express";
import { assignProjectToNewEmployee, createNewProject,  deleteProjectById, getAllProjects, getProjectById, getProjectByStatus } from "../controllers/project.controller.js";
import { adminHandler } from "../middleware/admin.middleware.js";
import { authHandler } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/create-project",authHandler, adminHandler, createNewProject);
router.get("/",authHandler, adminHandler, getAllProjects);
router.get("/:projectId",authHandler, adminHandler, getProjectById);
router.get("/get-projects-by-status/:projectStatus",authHandler, adminHandler, getProjectByStatus);
router.get("/get-projects-by-date-range/:range",authHandler, adminHandler, getProjectByStatus);
router.put("/assign-project/:projectId",authHandler, adminHandler, assignProjectToNewEmployee);
router.delete("/delete-project/:projectId",authHandler, adminHandler, deleteProjectById);
// router.put("/delete-member/:projectId",authHandler, adminHandler, deleteMember);  pending









export default router;