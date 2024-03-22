import "dotenv/config";
import express from "express";
import usersRoutes from "./routes/users.routes.js";
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

app.use(express.json());
app.get("/", (req, res) => {
  res.render("index");
});
app.use(usersRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`------Web url -------`);
  console.log("\x1b[34m%s\x1b[0m", `http://localhost:${PORT}`);
});
