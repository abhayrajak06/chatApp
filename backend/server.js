import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

//config env
dotenv.config();

//config database
connectDB();

//middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/v1/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server running...");
});
