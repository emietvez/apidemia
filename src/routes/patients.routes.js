import { Router } from "express";
import { getPatients, store } from "../controllers/patients.controller.js";

const router = Router();

router.get("/", getPatients);
router.get("/", store);


export default router;
