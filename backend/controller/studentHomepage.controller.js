import User from '../models/user.model.js';

export const studentHomepage = async (req, res) => {
    
    try {
        const requiredUser = await User.findById(req.params.id).populate('registeredCourses').populate('recommendedCourses');
        
        const registeredCourses = requiredUser.registeredCourses.map(course => ({
            title: course.title,
            description: course.description,
            link: course.link
        }));
        const recommendedCourses = requiredUser.recommendedCourses.map(course => ({
            title: course.title,
            description: course.description,
            link: course.link
        }));
        res.status(200).json({ registeredCourses, recommendedCourses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
