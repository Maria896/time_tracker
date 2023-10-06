import express from "express";
import { createNewOrganization, joinAsTeamMember, loginUser, registerUser, verifyEmail,inviteNewTeamMember } from "../controllers/auth.controller.js";
import { adminHandler } from "../middleware/admin.middleware.js";
import {authHandler} from "../middleware/auth.middleware.js"


const router = express.Router();

router.post("/register", registerUser);
router.get("/verify-email/:token", verifyEmail);
router.post("/login", loginUser);
router.put("/ask-for-invitation", joinAsTeamMember);
router.put("/create-organization",authHandler, createNewOrganization)
router.put("/invite-new-member",authHandler,adminHandler, inviteNewTeamMember)




export default router;