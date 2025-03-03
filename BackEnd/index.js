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

const _dirname=path.resolve();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cookieParser()); // Parse cookies

// CORS configuration
const corsOption = {
  origin: "http://localhost:5173", // Your frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOption));

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.use(express.static(path.join(_dirname,"/FrontEnd/dist")))
app.get('*',(_,res)=>{
  res.sendFile(path.resolve(_dirname,"FrontEnd","dist","index.html"))
})//if any route other than user,company etc..come then this ll hep to serve


// The server is listening on PORT 8000
 const PORT =  8002;

// Start the server
app.listen(PORT, () => {
  connectDB(); // Ensure database connection
  console.log(`Server is running on port ${PORT}`);
});    