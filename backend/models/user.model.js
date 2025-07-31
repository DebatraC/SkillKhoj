import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Student', 'Recruiter', 'Admin'],
    required: true
  },
  registeredCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],

  recommendedCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],

  jobPostings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPosting'
  }]
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;

