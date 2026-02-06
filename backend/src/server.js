import express from "express";
import noteRouters from "./router/noteRouters.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import showcaseMiddleware from "./middlewares/showcase.js";
import RateLimit from "./middlewares/rateLimit.js";

dotenv.config();
const app = express();

connectDB();
app.use(express.json());
app.use(RateLimit);
app.use("/api/notes", noteRouters);
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is running on port 4000");
});
