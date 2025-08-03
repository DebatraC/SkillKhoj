// Student homepage will have registered courses, recommended courses

import express from 'express';

import { studentHomepage } from '../controller/studentHomepage.controller.js';
import { studentProfilePage, updateStudentProfile } from '../controller/studentProfilepage.controller.js';

import verifyToken from '../middleware/auth.middleware.js';
import authorizeRoles from '../middleware/role.middleware.js';

const router = express.Router();

router.get('/:id/homepage', verifyToken, authorizeRoles('Student', 'Admin'), studentHomepage);
router.get('/:id/profile', verifyToken, authorizeRoles('Student', 'Admin'), studentProfilePage);
router.put('/:id/profile', verifyToken, authorizeRoles('Student', 'Admin'), updateStudentProfile);

export default router;