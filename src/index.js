import "dotenv/config";
import express from "express";
import session from "express-session";
import usersRoutes from "./routes/users.routes.js";
import patientsRoutes from "./routes/patients.routes.js";

import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let PORT = 3000;

if (process.env.ENV == "production") {
  PORT = process.env.PORT || 3000;
}
app.use(
  session({
    secret: "d226c933-c2b2-45e2-95cf-178f6d657bea",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(patientsRoutes);
app.use(usersRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`------Web url -------`);
  console.log("\x1b[34m%s\x1b[0m", `http://localhost:${PORT}`);
});
