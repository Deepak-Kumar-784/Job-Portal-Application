import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import applicationRoute from "./routes/application.route.js";
import companyRoute from "./routes/company.routes.js";
import jobRoute from "./routes/job.route.js";
import userRoute from "./routes/user.routes.js";
import connectDB from "./utils/db.js";

// Load environment variables
dotenv.config();

const app = express();
const __dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: "https://job-portal-application-0py2.onrender.com", // Removed trailing slash
  credentials: true,
};
app.use(cors(corsOptions));

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Serve frontend files
app.use(express.static(path.join(__dirname, "/FrontEnd/dist")));

app.get("*", (_, res) => {
  try {
    res.sendFile(path.resolve(__dirname, "FrontEnd", "dist", "index.html"));
  } catch (error) {
    console.error("Error serving frontend:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server after ensuring DB connection
const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
  connectDB(); // Ensure database connection
  console.log(`Server is running on port ${PORT}`);
});
