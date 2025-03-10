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
  origin: "https://job-portal-application-1-624g.onrender.com", // Allow both local & deployed frontend
  credentials: true, // Allow cookies & authorization headers
  
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
  res.sendFile(path.resolve(__dirname, "FrontEnd", "dist", "index.html"));
});

// Start the server after ensurinyg DB connection
const PORT = process.env.PORT || 8005;

// Start the server
app.listen(PORT, () => {
  connectDB(); // Ensure database connection
  console.log(`Server is running on port ${PORT}`);
});
