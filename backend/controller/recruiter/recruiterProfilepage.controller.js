import User from '../../models/user.model.js';

export const recruiterProfilePage = async (req, res) => {
    try {
        const reqRecruiter = await User.findById(req.params.id)
        
        res.status(200).json({
            name: reqRecruiter.name,
            email: reqRecruiter.email
        });
    } catch (error) {
        console.error("Error in recruiterProfilePage:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}