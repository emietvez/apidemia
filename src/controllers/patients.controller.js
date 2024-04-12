import { pool } from "../config/db.js";
import bcrypt from "bcrypt";

export const getPatients = async (req, res) => {
  try {
    let patients = await pool.query(
      "SELECT patients.*, locations.name AS location_name FROM patients JOIN locations ON patients.location_id = locations.id"
    );
    const alertMessage = req.session.alertMessage;
    delete req.session.alertMessage;

    return res.render("index", {
      view: "patients/list-patients",
      data: { patients: patients[0], alertMessage },
    });
  } catch (error) {
    console.error("Error fetching patients:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const createPatient = async (req, res) => {
  try {
    const locationsQuery = await pool.query("SELECT * FROM locations");
    const locations = locationsQuery[0];

    let patientData = {};
    const alertMessage = req.session.alertMessage;
    delete req.session.alertMessage;

    const patientId = req.query.id;
    if (patientId) {
      const patientQuery = await pool.query(
        "SELECT * FROM patients WHERE id = ?",
        [patientId]
      );
      if (patientQuery[0].length > 0) {
        patientData = patientQuery[0][0];
      }
    }

    return res.render("index", {
      view: "patients/create-patient.ejs",
      data: { locations, alertMessage, patientData, patientId },
    });
  } catch (error) {
    console.error(
      "Error al recuperar las ubicaciones o los datos del paciente:",
      error
    );

    return res.status(500).send("Error interno del servidor");
  }
};

export const storePatient = async (req, res) => {
  const {
    action,
    patient_id,
    name,
    lastname,
    dni,
    type_group,
    address,
    location_id,
  } = req.body;

  try {
    if (action === "create") {
      await pool.query(
        "INSERT INTO patients (name, lastname, dni, type_group, address, location_id) VALUES (?, ?, ?, ?, ?, ?)",
        [name, lastname, dni, type_group, address, location_id]
      );
    } else if (action === "update") {
      await pool.query(
        "UPDATE patients SET name = ?, lastname = ?, dni = ?, type_group = ?, address = ?, location_id = ? WHERE id = ?",
        [name, lastname, dni, type_group, address, location_id, patient_id]
      );
    }

    req.session.alertMessage = {
      message:
        "Paciente " + action == "create"
          ? "creado"
          : "modificado" + " exitosamente",
      type: "success",
    };

    return res.redirect("/");
  } catch (error) {
    console.error("Error al crear el paciente:", error);
    req.session.alertMessage = {
      message:
        "Error al " + action == "create" ? "crear" : "modificar" + " paciente",
      type: "danger",
    };
    return res.redirect("/patients/store");
  }
};

export const deletePatient = async (req, res) => {
  const patientId = req.query.id; 

  try {
    await pool.query("DELETE FROM patients WHERE id = ?", [patientId]);

    req.session.alertMessage = {
      message: "Paciente eliminado exitosamente",
      type: "success",
    };

    res.redirect("/");
  } catch (error) {
    console.error("Error al eliminar el paciente:", error);
    req.session.alertMessage = {
      message: "Error al eliminar el paciente",
      type: "danger",
    };
    res.redirect("/");
  }
};
