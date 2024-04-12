import { Router } from "express";
import { createPatient, deletePatient, getPatients, storePatient } from "../controllers/patients.controller.js";

const router = Router();

router.get("/", getPatients);
router.get("/patients/store", createPatient);
router.post("/patients/store", storePatient)
router.post("/patient/delete", deletePatient)

export default router;
