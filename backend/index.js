// Packages
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

// Files
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";
import moviesRoutes from "./routes/moviesRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// Configuration
dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/genre", genreRoutes);
app.use("/api/v1/movies", moviesRoutes);
app.use("/api/v1/upload", uploadRoutes);

// Catch-all route for undefined API endpoints
app.use((req, res) => {
  res.status(404).send({ message: "API route not found" });
});

// Set port for localhost (port 3000)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for deployment
export default app;
