import JobPosting from '../models/jobposting.model.js';
import JobApplication from '../models/jobApplication.model.js';
import User from '../models/user.model.js';

export const getAllJobs = async (req, res) => {
    try {
        // Fetch all job postings and populate the postedBy field to get recruiter details
        const jobs = await JobPosting.find()
            .populate('postedBy', 'name email') // Populate recruiter name and email
            .sort({ createdAt: -1 }); // Sort by newest first
        
        res.status(200).json({
            success: true,
            data: jobs,
            message: 'Jobs fetched successfully'
        });
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch jobs'
        });
    }
};

export const applyToJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const studentId = req.params.id; // Student ID from URL params
        const { coverLetter } = req.body;

        // Check if job exists
        const job = await JobPosting.findById(jobId);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }

        // Check if student has already applied
        const existingApplication = await JobApplication.findOne({
            jobId: jobId,
            studentId: studentId
        });

        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: 'You have already applied to this job'
            });
        }

        // Create new job application
        const application = new JobApplication({
            jobId: jobId,
            studentId: studentId,
            coverLetter: coverLetter || ''
        });

        await application.save();

        // Update user's jobsAppliedTo field
        await User.findByIdAndUpdate(
            studentId,
            { $addToSet: { jobsAppliedTo: jobId } }, // $addToSet prevents duplicates
            { new: true }
        );

        // Update job's applicants field
        await JobPosting.findByIdAndUpdate(
            jobId,
            { $addToSet: { applicants: studentId } }, // $addToSet prevents duplicates
            { new: true }
        );

        res.status(201).json({
            success: true,
            data: application,
            message: 'Application submitted successfully'
        });

    } catch (error) {
        console.error('Error applying to job:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit application'
        });
    }
};

export const getStudentApplications = async (req, res) => {
    try {
        const studentId = req.params.id;

        // Fetch all applications by the student with job and recruiter details
        const applications = await JobApplication.find({ studentId: studentId })
            .populate({
                path: 'jobId',
                populate: {
                    path: 'postedBy',
                    select: 'name email'
                }
            })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: applications,
            message: 'Student applications fetched successfully'
        });

    } catch (error) {
        console.error('Error fetching student applications:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch applications'
        });
    }
};

// New function to get jobs applied to from user model
export const getJobsAppliedTo = async (req, res) => {
    try {
        const studentId = req.params.id;

        // Fetch user and populate jobsAppliedTo with job and recruiter details
        const user = await User.findById(studentId)
            .populate({
                path: 'jobsAppliedTo',
                populate: {
                    path: 'postedBy',
                    select: 'name email'
                }
            });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user.jobsAppliedTo,
            message: 'Jobs applied to fetched successfully'
        });

    } catch (error) {
        console.error('Error fetching jobs applied to:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch jobs applied to'
        });
    }
};

// New function to get applicants for a specific job
export const getJobApplicants = async (req, res) => {
    try {
        const jobId = req.params.jobId;

        // Fetch job and populate applicants with their details
        const job = await JobPosting.findById(jobId)
            .populate('applicants', 'name email')
            .populate('postedBy', 'name email');

        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }

        res.status(200).json({
            success: true,
            data: {
                job: job,
                applicants: job.applicants
            },
            message: 'Job applicants fetched successfully'
        });

    } catch (error) {
        console.error('Error fetching job applicants:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch job applicants'
        });
    }
};
