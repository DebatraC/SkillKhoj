import express from 'express';
import { getCourses, createCourse, deleteCourse, updateCourse } from '../controller/course.controller.js';

const router = express.Router();

router.post('/', createCourse);
router.delete('/:id', deleteCourse);
router.get('/', getCourses);
router.patch('/:id', updateCourse);

export default router;

