import { pool } from "../config/db.js";
import bcrypt from "bcrypt";

export const getPatients = async (req, res) => {
  try {
    let patients = await pool.query(
      "SELECT patients.*, locations.name AS location_name FROM patients JOIN locations ON patients.location_id = locations.id"
    );
    console.log(patients);
    return res.render("index", {
      view: "patients/list-patients",
      data: { patients: patients[0] },
    });
  } catch (error) {
    console.error("Error fetching patients:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const store = (req, res) => {
    return res.render("index", {
        view: 'patients/create-patient.ejs',
    })
}

// export const createUser = async (req, res) => {
//   const { username, email, password, active, create_at, update_at } = req.body;

//   bcrypt.hash(password, 4, async (err, hash) => {
//     if (err) {
//       console.error("Error al hashear la contraseña:", err);
//       return res.status(500).send("Error al hashear la contraseña");
//     }
//     try {
//       const [rows] = await pool.query(
//         "INSERT INTO users (username, email, password, active, created_at, updated_at) VALUES (?,?,?,?,?,?)",
//         [username, email, hash, active, create_at, update_at]
//       );
//       res.send({ id: rows.insertId, username: username, email: email });
//     } catch (error) {
//       console.error("Error al insertar usuario:", error);
//       res.status(500).send("Error al insertar usuario");
//     }
//   });
// };
