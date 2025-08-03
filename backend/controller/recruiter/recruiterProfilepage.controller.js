import User from '../../models/user.model.js';

export const recruiterProfilePage = async (req, res) => {
    try {
        const reqRecruiter = await User.findById(req.params.id);
        
        if (!reqRecruiter) {
            return res.status(404).json({ message: "Recruiter not found" });
        }
        
        res.status(200).json({
            user: {
                id: reqRecruiter._id,
                name: reqRecruiter.name,
                email: reqRecruiter.email,
                role: reqRecruiter.role
            }
        });
    } catch (error) {
        console.error("Error in recruiterProfilePage:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateRecruiterProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const recruiterId = req.params.id;
        
        // Validate input
        if (!name || !email) {
            return res.status(400).json({ message: "Name and email are required" });
        }
        
        // Check if email is already taken by another user
        const existingUser = await User.findOne({ 
            email: email, 
            _id: { $ne: recruiterId } 
        });
        
        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use" });
        }
        
        // Update the recruiter profile
        const updatedRecruiter = await User.findByIdAndUpdate(
            recruiterId,
            { name, email },
            { new: true, runValidators: true }
        );
        
        if (!updatedRecruiter) {
            return res.status(404).json({ message: "Recruiter not found" });
        }
        
        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: updatedRecruiter._id,
                name: updatedRecruiter.name,
                email: updatedRecruiter.email,
                role: updatedRecruiter.role
            }
        });
    } catch (error) {
        console.error("Error in updateRecruiterProfile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}