import express from "express";
import {
  getUser,
  getDashboardStats,
  createUser,
} from "../controllers/general.js"; // Import the createUser controller

const router = express.Router();

router.get("/user/:id", getUser);
router.get("/dashboard", getDashboardStats);
router.post("/user", createUser); // Add the POST route for creating users

export default router;
