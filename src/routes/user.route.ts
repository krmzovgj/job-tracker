import express from "express";
import * as userController from "../controllers/user.controller";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.get("/:id", userController.getUserById);
router.delete("/", verifyToken, userController.deleteAccount)
export default router;
