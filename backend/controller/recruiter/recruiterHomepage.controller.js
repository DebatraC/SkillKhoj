import User from '../../models/user.model.js';

export const recruiterHomepage = async (req, res) => {
    try {
        const reqRecruiter = await User.findById(req.params.id).populate('jobPostings');
        const jobPostings = reqRecruiter.jobPostings.map(job => ({
            title: job.title
        }));
        res.status(200).json(jobPostings);
    } catch (error) {
        console.error("Error in recruiterHomepage:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}