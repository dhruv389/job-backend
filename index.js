const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const linkedIn = require('linkedin-jobs-api');

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: 'https://jobspring.vercel.app/', // Replace with your website's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

// Use CORS middleware
app.use(cors(corsOptions));

// app.use(cors());
// Connect to the Database

require("dotenv").config();
// Middleware

app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
const queryOptions = {
  keyword: 'software engineer',
  location: 'India',
  dateSincePosted: 'past Week',
  jobType: 'full time',
  remoteFilter: 'remote',
  salary: '100000',
  experienceLevel: 'entry level',
  limit: '10',
  page: "0",
};

linkedIn.query(queryOptions).then(response => {
	console.log(response); // An array of Job objects
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
