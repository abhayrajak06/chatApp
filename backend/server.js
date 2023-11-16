import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

const app = express();

//config env
dotenv.config();

//config database
connectDB();

//middlewares
app.use(express.json());
app.use(cors());

app.get("/api/v1", (req, res) => {
  res.send("hello...");
});

app.listen(process.env.PORT, () => {
  console.log("Server running...");
});
