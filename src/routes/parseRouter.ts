import { Router } from "express";
import { parseHandler } from "../controllers/parseController.js";

const router = Router();

router.get("/parse", parseHandler);

export default router;
