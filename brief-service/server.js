import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import briefRoutes from './routes/brief.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3003"]
}));

// Routes
app.use('/api', briefRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Brief Service is running' });
});

app.listen(PORT, () => {
  console.log(`Brief Service running on port ${PORT}`);
  connectDB();
});