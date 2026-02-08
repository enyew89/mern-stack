import express from "express";
import noteRouters from "./router/noteRouters.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import showcaseMiddleware from "./middlewares/showcase.js";
import RateLimit from "./middlewares/rateLimit.js";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();
const __dirname = path.resolve();
const port = process.env.PORT;

if (process.env.NODE_ENV !== "production") {
  app.use(cors(
  {
    origin: "http://localhost:5173",
  }
));

}
app.use(express.json());
app.use(RateLimit);
app.use("/api/notes", noteRouters);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
}



connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
