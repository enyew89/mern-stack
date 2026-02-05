import express from "express";
import noteRouters from "./router/noteRouters.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();

connectDB();
app.use(express.json());
app.use("/api/notes", noteRouters);
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is running on port 4000");
});
