import express from "express";
import { Router } from "express";
import { getUserById, updateUser } from "../controllers/userController";
import { authenticate } from "../utils/auth";

const router = Router();

// Update user details (protected route)
router.put("/update", authenticate, updateUser);

router.get("/:userId",getUserById)

export default router;