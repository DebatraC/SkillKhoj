import User from '../../models/user.model.js';

export const recruiterHomepage = async (req, res) => {
    try {
        const reqRecruiter = await User.findById(req.params.id).populate('jobPostings');
        
        if (!reqRecruiter) {
            return res.status(404).json({ message: 'Recruiter not found' });
        }

        const jobPostings = reqRecruiter.jobPostings.map(job => ({
            id: job._id,
            title: job.title,
            description: job.description,
            company: job.company,
            location: job.location,
            salary: job.salary,
            createdAt: job.createdAt,
            updatedAt: job.updatedAt
        }));

        const recruiterData = {
            id: reqRecruiter._id,
            name: reqRecruiter.name,
            email: reqRecruiter.email,
            role: reqRecruiter.role,
            jobPostings
        };

        res.status(200).json({ user: recruiterData });
    } catch (error) {
        console.error("Error in recruiterHomepage:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}