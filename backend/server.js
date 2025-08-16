// The struggle begins
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.routes.js';
import courseRoutes from './routes/course.route.js';
import userRoutes from './routes/user.routes.js';
import studentHomepageRoutes from './routes/studentHomepage.route.js';
import recruiterRoutes from './routes/recruiter.routes.js';

import cors from 'cors';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file from the backend directory specifically
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

const allowedOrigins = [
  'http://localhost:4200', // Development
  'https://skill-khoj.vercel.app', // Production frontend URL
];

// In your backend server (Express.js example)
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use("/api/auth", authRoutes)
app.use("/api/courses", courseRoutes); // Use course routes
app.use("/api/user",  userRoutes);

app.use("/api/student", studentHomepageRoutes);

app.use("/api/recruiter", recruiterRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connectDB();
  console.log(`Server is running on port ${PORT}`);
});

export default app;

//rZ9N5GtFU9IEBDXF
//debatrachatterjee24
//mongodb+srv://debatrachatterjee24:rZ9N5GtFU9IEBDXF@cluster0.fvnjzz0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0