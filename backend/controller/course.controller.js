import Course from '../models/courses.model.js'; // Assuming you have a Course model defined


export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json({success: true, data: courses});
    } catch (error) {
        console.error('Error fetching courses:', error.message);
        res.status(500).json({success: false, message: 'Error fetching courses'});
    }
}

export const createCourse = async (req, res) => {
    const course = req.body; // Assuming you send course data in the request body

    const newCourse = new Course(course)

    try {
        await newCourse.save();
        res.status(201).json({success: true, data:newCourse});
    } catch(error){
        console.error('Error saving course:', error.message);                           
        res.status(500).json({success: false, message: 'Error saving course'});
    }
}

export const deleteCourse = async (req, res) => {
    const {id} = req.params;

    try {
        await Course.findByIdAndDelete(id);
        res.status(200).json({success: true, message: 'Course deleted successfully'});
    } catch(error) {
        console.error('Error deleting course:', error.message);
        res.status(404).json({success: false, message: 'Course not found'});
    }
}

export const updateCourse = async (req, res) => {
    const { id } = req.params;
    const courseData = req.body;

    try {
        const updatedCourse = await Course.findByIdAndUpdate(id, courseData, { new: true });
        if (!updatedCourse) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }
        res.status(200).json({ success: true, data: updatedCourse });
    } catch (error) {
        console.error('Error updating course:', error.message);
        res.status(500).json({ success: false, message: 'Error updating course' });
    }
}