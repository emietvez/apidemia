import { Router } from "express";
import { createPatient, getPatients, store } from "../controllers/patients.controller.js";

const router = Router();

router.get("/", getPatients);
router.get("/create-patient", store);
router.post("/patients/create", createPatient)


export default router;
