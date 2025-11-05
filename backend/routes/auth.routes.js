import express from "express";
import { login, logout, signup } from "../controllers/auth.controllers.js";

const router = express.Router();

// Only define the endpoints, not full URLs
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
// Use ES6 export to match the rest of the project which uses import/export