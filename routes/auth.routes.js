import express from "express";
import { createNewOrganization, joinAsTeamMember, loginUser, registerUser, verifyEmail } from "../controllers/auth.controller.js";
import {authHandler} from "../middleware/auth.middleware.js"

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify-email/:token", verifyEmail);
router.post("/login", loginUser);
router.get("/askForInvitation", joinAsTeamMember);
router.post("/create-organization",authHandler, createNewOrganization)



export default router;