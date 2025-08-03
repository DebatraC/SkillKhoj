import User from '../models/user.model.js';

export const studentHomepage = async (req, res) => {
    
    try {
        console.log('Fetching user with ID:', req.params.id);
        
        const requiredUser = await User.findById(req.params.id).populate('registeredCourses').populate('recommendedCourses');
        
        if (!requiredUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('User found:', requiredUser.name);
        console.log('Raw registeredCourses:', requiredUser.registeredCourses);
        console.log('Raw recommendedCourses:', requiredUser.recommendedCourses);
        console.log('registeredCourses length:', requiredUser.registeredCourses?.length);
        console.log('recommendedCourses length:', requiredUser.recommendedCourses?.length);
        
        const registeredCourses = requiredUser.registeredCourses.map(course => ({
            id: course._id,
            title: course.title,
            description: course.description,
            link: course.link
        }));
        
        const recommendedCourses = requiredUser.recommendedCourses.map(course => ({
            id: course._id,
            title: course.title,
            description: course.description,
            link: course.link
        }));

        console.log('Mapped registeredCourses:', registeredCourses);
        console.log('Mapped recommendedCourses:', recommendedCourses);

        // Return user object with course data
        const userWithCourses = {
            id: requiredUser._id,
            name: requiredUser.name,
            email: requiredUser.email,
            role: requiredUser.role,
            registeredCourses,
            recommendedCourses
        };

        console.log('Final response:', userWithCourses);
        res.status(200).json({ user: userWithCourses });
    } catch (error) {
        console.error('Error in studentHomepage:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
