const express = require('express');
const router = express.Router();
// const { registerUser, loginUser } = require('../controllers/userController');

// // Routes for User
// router.post('/register', registerUser);
// router.post('/login', loginUser);

// // Routes for Job Details







const jobController = require('../controllers/jobDetailController');

// Route to create a new job
router.post('/createjob', jobController.createJob);

// Route to get all jobs
router.get('/jobs', jobController.getAllJobs);

// Route to get jobs by userId
router.get('/jobs/user/:userId', jobController.getJobsByUserId);
router.get('/findjobs1', jobController.getJobsByApi1);
router.get('/findjobs2', jobController.getJobsapi2);

// Route to get a job by jobId
router.get('/jobs/:jobId', jobController.getJobById);
router.get('/jobs/category/:category', jobController.getJobsByCategory);
router.delete('/jobdelete/:jobId', jobController.deleteJobById);

module.exports = router;
