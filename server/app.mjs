import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import registerRoutes from './req/req.mjs';

dotenv.config();

// פתרון ל־__dirname ב־ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// התחברות למסד הנתונים
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("✅ Database connected");
  } catch (err) {
    console.error("❌ Error connecting to database:", err);
  }
}
main().catch(err => console.error(err));

export const app = express();

// תיכנות אמצע (middlewares)
app.use(express.json());

app.use(cors({
  origin: true,
  credentials: true,
  methods: 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  allowedHeaders: 'Content-Type, Accept, Authorization',
}));

// ✅ רישום כל הראוטים מהקובץ req.mjs
registerRoutes(app);

// ✅ הגשת קבצי React (build)
app.use(express.static(path.join(__dirname, './client/build')));

// ✅ כל נתיב שלא תואם → מחזיר index.html של React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build', 'index.html'));
});

// הרצת השרת
const PORT = process.env.PORT || 1010;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
