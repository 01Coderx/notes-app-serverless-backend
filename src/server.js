import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], allowedHeaders: ["Content-Type", "Authorization"] }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Notes API is running" });
});

app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);

// Serverless entrypoint: connect lazily and reuse the cached connection.
export const handler = async (req, res) => {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error("API startup error:", error);
    return res.status(500).json({ message: "Database connection failed" });
  }
};

// Local development only.
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  connectDB()
    .then(() => {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(() => process.exit(1));
}

export default app;
