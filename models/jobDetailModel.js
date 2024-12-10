const mongoose = require('mongoose');

// Define the Mongoose schema for User Job Detail
const jobDetailSchema = new mongoose.Schema({
  userId: {
   type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  longString: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });  // Adds createdAt and updatedAt automatically

// Create and export the Job Detail model
const JobDetail = mongoose.model('JobDetail', jobDetailSchema);

module.exports = JobDetail;
