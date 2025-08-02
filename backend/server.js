import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import authRoutes from './routes/auth.routes.js';
import courseRoutes from './routes/course.route.js';
import userRoutes from './routes/user.routes.js';
import studentHomepageRoutes from './routes/studentHomepage.route.js';
import recruiterRoutes from './routes/recruiter.routes.js';

import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

// In your backend server (Express.js example)
app.use(cors({
  origin: 'http://localhost:4200', // Your Angular dev server
  credentials: true
}));

app.use("/api/auth", authRoutes)
app.use("/api/courses", courseRoutes); // Use course routes
app.use("/api/user",  userRoutes);

app.use("/api/student", studentHomepageRoutes);

app.use("/api/recruiter", recruiterRoutes);




app.listen(5000, () => {
    connectDB();
  console.log('Server is running on port 5000');
});

//rZ9N5GtFU9IEBDXF
//debatrachatterjee24
//mongodb+srv://debatrachatterjee24:rZ9N5GtFU9IEBDXF@cluster0.fvnjzz0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0