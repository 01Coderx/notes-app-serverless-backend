import app from "../src/server.js";
import connectDB from "../src/config/db.js";

export default async function handler(req, res) {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error("Serverless API error:", error);
    return res.status(500).json({ message: "Database connection failed" });
  }
}
