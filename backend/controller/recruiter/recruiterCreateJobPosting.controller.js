import JobPosting from "../../models/jobposting.model.js";

export const createJobPosting = async (req, res) => {
    const job = req.body; // Assuming you send job data in the request body

    const newJob = new JobPosting(job);

    try {
        await newJob.save();
        res.status(201).json(newJob);
    } catch (error) {
        console.error("Error in createJobPosting:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}