import express from 'express';

import verifyToken from '../middleware/auth.middleware.js';
import authorizeRoles from '../middleware/role.middleware.js';

const router = express.Router();

//Student route
router.get("/student", verifyToken, authorizeRoles('Student', 'Admin'), (req, res) => {
    res.json({message: "Welcome Student"});
});

//Recruiter route
router.get("/recruiter", verifyToken, authorizeRoles('Recruiter', 'Admin'), (req, res) => {
    res.json({message: "Welcome Recruiter"});
});

//Admin route
router.get("/admin", verifyToken, authorizeRoles('Admin'), (req, res) => {
    res.json({message: "Welcome Admin"});
});

export default router;