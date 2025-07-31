import express from 'express';
import { userResgistration, userLogin } from '../controller/auth.controller.js';

const router = express.Router();

router.post('/register', userResgistration);
router.get('/login', userLogin);

export default router;