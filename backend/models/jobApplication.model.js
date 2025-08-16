import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({
  jobId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'JobPosting', 
    required: true 
  },
  studentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'reviewed', 'accepted', 'rejected'], 
    default: 'pending' 
  },
  applicationDate: { 
    type: Date, 
    default: Date.now 
  },
  coverLetter: { 
    type: String, 
    default: '' 
  }
}, { timestamps: true });

// Create compound index to prevent duplicate applications
jobApplicationSchema.index({ jobId: 1, studentId: 1 }, { unique: true });

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

export default JobApplication;
