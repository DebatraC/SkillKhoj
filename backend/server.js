import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import authRoutes from './routes/auth.routes.js';
import courseRoutes from './routes/course.route.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

app.use("/api/auth", authRoutes)
app.use("/api/courses", courseRoutes); // Use course routes
app.use("/api/user",  userRoutes);


app.listen(5000, () => {
    connectDB();
  console.log('Server is running on port 5000');
});

//rZ9N5GtFU9IEBDXF
//debatrachatterjee24
//mongodb+srv://debatrachatterjee24:rZ9N5GtFU9IEBDXF@cluster0.fvnjzz0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0