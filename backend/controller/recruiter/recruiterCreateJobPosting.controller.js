import JobPosting from "../../models/jobposting.model.js";
import User from "../../models/user.model.js";

export const createJobPosting = async (req, res) => {
    try {
        const { title, description, company, location, salary } = req.body;
        const recruiterId = req.params.id;

        // Validate required fields
        if (!title || !description || !company || !location || !salary) {
            return res.status(400).json({ 
                message: "All fields are required: title, description, company, location, salary" 
            });
        }

        // Create new job posting
        const newJob = new JobPosting({
            title,
            description,
            company,
            location,
            salary,
            postedBy: recruiterId
        });

        await newJob.save();

        // Add job to recruiter's jobPostings array
        await User.findByIdAndUpdate(
            recruiterId,
            { $push: { jobPostings: newJob._id } },
            { new: true }
        );

        res.status(201).json({
            message: "Job posting created successfully",
            job: {
                id: newJob._id,
                title: newJob.title,
                description: newJob.description,
                company: newJob.company,
                location: newJob.location,
                salary: newJob.salary,
                createdAt: newJob.createdAt
            }
        });
    } catch (error) {
        console.error("Error in createJobPosting:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}