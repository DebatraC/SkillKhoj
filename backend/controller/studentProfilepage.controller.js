import User from '../models/user.model.js';

export const studentProfilePage = async (req, res) => {
    try{
        const requiredUser = await User.findById(req.params.id);
        
        if (!requiredUser) {
            return res.status(404).json({ message: "Student not found" });
        }
        
        res.status(200).json({
            name: requiredUser.name,
            email: requiredUser.email,
        });
    } catch(error){
        console.error("Error in studentProfilePage:", error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const updateStudentProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const studentId = req.params.id;
        
        // Validate input
        if (!name || !email) {
            return res.status(400).json({ message: "Name and email are required" });
        }
        
        // Check if email is already taken by another user
        const existingUser = await User.findOne({ 
            email: email, 
            _id: { $ne: studentId } 
        });
        
        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use" });
        }
        
        // Update the student profile
        const updatedStudent = await User.findByIdAndUpdate(
            studentId,
            { name, email },
            { new: true, runValidators: true }
        );
        
        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        
        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: updatedStudent._id,
                name: updatedStudent.name,
                email: updatedStudent.email,
                role: updatedStudent.role
            }
        });
    } catch (error) {
        console.error("Error in updateStudentProfile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}