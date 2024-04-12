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

export const store = async (req, res) => {
  try {
    const locationsQuery = await pool.query("SELECT * FROM locations");
    const locations = locationsQuery[0];

    const alertMessage = req.session.alertMessage;
    delete req.session.alertMessage;

    return res.render("index", {
      view: "patients/create-patient.ejs",
      data: { locations, alertMessage },
    });
  } catch (error) {
    console.error("Error al recuperar las ubicaciones:", error);

    return res.status(500).send("Error interno del servidor");
  }
};

export const createPatient = async (req, res) => {

  const { name, lastname, dni, type_group, address, location_id } = req.body;
 
  try {
    await pool.query(
      "INSERT INTO patients (name, lastname, dni, type_group, address, location_id) VALUES (?, ?, ?, ?, ?, ?)",
      [name, lastname, dni, type_group, address, location_id]
    );

    req.session.alertMessage = {
      message: "Paciente creado exitosamente",
      type: "success",
    };

    return res.redirect("/");
  } catch (error) {
    console.error("Error al crear el paciente:", error);
    req.session.alertMessage = {
      message: "Error al crear paciente",
      type: "danger",
    };
    return res.redirect("/create-patient");
  }
};

export const editPatient = async (req, res) => {
  const { name, lastname, type_group, address, location_id } = req.body;
  return res.send({ name, lastname, type_group, address, location_id });
};
