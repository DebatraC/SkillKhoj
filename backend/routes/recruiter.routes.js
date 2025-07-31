import express from 'express';

import { recruiterProfilePage } from '../controller/recruiter/recruiterProfilepage.controller.js';
import { recruiterHomepage } from '../controller/recruiter/recruiterHomepage.controller.js';
import { createJobPosting } from '../controller/recruiter/recruiterCreateJobPosting.controller.js';

import verifyToken from '../middleware/auth.middleware.js';
import authorizeRoles from '../middleware/role.middleware.js';

const router = express.Router();

router.get('/:id/profile',  verifyToken, authorizeRoles('Recruiter', 'Admin'), recruiterProfilePage);
router.get('/:id/homepage', verifyToken, authorizeRoles('Recruiter', 'Admin'), recruiterHomepage);
router.post("/:id/createJobPosting", verifyToken, authorizeRoles('Recruiter', 'Admin'), createJobPosting);

export default router;