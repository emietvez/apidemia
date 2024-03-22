import { pool } from "../config/db.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  const result = await pool.query("SELECT * FROM users");
  return res.send(result);
};

export const createUser = async (req, res) => {
  const { username, email, password, active, create_at, update_at } = req.body;

  bcrypt.hash(password, 4, async (err, hash) => {
    if (err) {
      console.error("Error al hashear la contraseña:", err);
      return res.status(500).send("Error al hashear la contraseña");
    }
    try {
      const [rows] = await pool.query(
        "INSERT INTO users (username, email, password, active, created_at, updated_at) VALUES (?,?,?,?,?,?)",
        [username, email, hash, active, create_at, update_at]
      );
      res.send({ id: rows.insertId, username: username, email: email });
    } catch (error) {
      console.error("Error al insertar usuario:", error);
      res.status(500).send("Error al insertar usuario");
    }
  });
};
