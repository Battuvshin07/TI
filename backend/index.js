import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import loginRoutes from "./routes/loginRoutes.js";
import employ from "./routes/employRoutes.js"
import companyRoutes from "./routes/companyRoutes.js"
import reportRoutes from "./routes/reportRouter.js";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());

app.use("/auth", loginRoutes);
app.use("/employ", employ);
app.use("/company", companyRoutes);
app.use("/report", reportRoutes);

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});