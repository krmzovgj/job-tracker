import express from "express";
import { verifyToken } from "../middleware/auth";
import * as noteController from "../controllers/note.controller";

const router = express.Router();

router.post("/", verifyToken, noteController.createNote);
router.get("/", verifyToken, noteController.getNotes);
router.put("/:id", verifyToken, noteController.updateNote);
router.delete("/:id", verifyToken, noteController.deleteNote);

export default router;
