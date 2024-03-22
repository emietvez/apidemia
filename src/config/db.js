import { createPool } from "mysql2/promise";
import "dotenv/config";

export const pool = createPool({
  host: process.env.HOST_DATABASE,
  user: process.env.USER_DATABASE,
  password: process.env.PASSWORD_DATABASE,
  port: process.env.PORT_DATABASE,
  database: process.env.NAME_DATABASE,
});
