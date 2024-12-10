const JobDetail = require('../models/jobDetailModel');
const axios = require('axios');
// // Add job detail for a user
// const addJobDetail = async (req, res) => {
//   const { userId, heading, imageUrl, longString } = req.body;

//   try {
//     // Create new job detail
//     const jobDetail = new JobDetail({
//       userId,
//       heading,
//       imageUrl,
//       longString
//     });

//     await jobDetail.save();

//     res.status(201).json({ message: 'Job detail added successfully', jobDetail });
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding job detail', error });
//   }
// };

// // Get job details for a specific user
// const getUserJobDetails = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const jobDetails = await JobDetail.find({ userId });
//     res.status(200).json({ jobDetails });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching job details', error });
//   }
// };

// module.exports = { addJobDetail, getUserJobDetails };








// controllers/jobController.js



// Function to create a new job
exports.createJob = async (req, res) => {
  try {
    const { userId, heading, imageUrl, category, longString, url } = req.body;

    const newJob = new JobDetail({
      userId,
      heading,
      imageUrl,
      category,
      longString,
      url,
    });

    // Save the job to the database
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: 'Error creating job', error });
  }
};

// Function to get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await JobDetail.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error });
  }
};

// Function to get jobs by userId
exports.getJobsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const jobs = await JobDetail.find({ userId });
    if (!jobs.length) {
      return res.status(404).json({ message: 'No jobs found for this user' });
    }
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs by userId', error });
  }
};

exports.getJobsByApi1 = async (req, res) => {
  try {
    const response = await axios.get('https://arbeitnow.com/api/job-board-api');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs' });
  }
};

exports.getJobsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const jobs = await JobDetail.find({category});
    if (!jobs.length) {
      return res.status(404).json({ message: 'No jobs found for this category' });
    }
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs by category', error });
  }
};

// Function to get a job by jobId
exports.getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await JobDetail.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job by jobId', error });
  }
};



// Function to delete a job by jobId
exports.deleteJobById = async (req, res) => {
  try {
    const { jobId } = req.params;
    const deletedJob = await JobDetail.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job deleted successfully', deletedJob });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job', error });
  }
};


exports.getJobsapi2 = async (req, res) => {
  try {
    const { data } = await axios.get('https://api.adzuna.com/v1/api/jobs/in/search/1', {
        params: {
            app_id: 'd52f87ae',
            app_key: '4dd7274e25d0c2618bf61938ee4c96ff',
            what: req.query.what,
            where: req.query.where,
            salary_min: req.query.salary_min,
            salary_max: req.query.salary_max
        }
    });
    res.json(data);
} catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Adzuna API' });
}
};



