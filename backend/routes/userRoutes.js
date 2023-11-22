import express from "express";
import {
  allUsersController,
  loginController,
  registerController,
} from "../controllers/userControllers.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/", isLoggedIn, allUsersController);

export default router;
