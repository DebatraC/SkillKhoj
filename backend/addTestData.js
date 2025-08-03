import mongoose from 'mongoose';
import Course from './models/courses.model.js';
import User from './models/user.model.js';
import { connectDB } from './config/db.js';

// Connect to database
connectDB();

const addTestData = async () => {
    try {
        // Create test courses
        const course1 = new Course({
            title: "JavaScript Fundamentals",
            description: "Learn the basics of JavaScript programming language",
            link: "https://example.com/javascript-course"
        });

        const course2 = new Course({
            title: "React Development",
            description: "Build modern web applications with React",
            link: "https://example.com/react-course"
        });

        const course3 = new Course({
            title: "Node.js Backend",
            description: "Server-side development with Node.js",
            link: "https://example.com/nodejs-course"
        });

        // Save courses
        await course1.save();
        await course2.save();
        await course3.save();

        console.log('Test courses created!');
        console.log('Course 1 ID:', course1._id);
        console.log('Course 2 ID:', course2._id);
        console.log('Course 3 ID:', course3._id);

        // Find a student user (replace with actual student email)
        const studentEmail = 'student@example.com'; // Replace with your student's email
        const student = await User.findOne({ email: studentEmail, role: 'Student' });

        if (student) {
            // Add courses to student
            student.registeredCourses = [course1._id];
            student.recommendedCourses = [course2._id, course3._id];
            await student.save();

            console.log(`Courses assigned to student: ${student.name}`);
            console.log('Registered:', student.registeredCourses);
            console.log('Recommended:', student.recommendedCourses);
        } else {
            console.log('Student not found! Please create a student user first or update the email.');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error adding test data:', error);
        process.exit(1);
    }
};

addTestData();
