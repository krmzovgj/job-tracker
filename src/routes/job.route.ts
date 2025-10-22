import express from "express";
import * as jobController from "../controllers/job.controller";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.post("/", verifyToken, jobController.createJob);
router.put("/:id", verifyToken, jobController.updateJob);
router.get("/", verifyToken, jobController.getAllJobs);
router.delete("/:id", verifyToken, jobController.deleteJob)

export default router;
