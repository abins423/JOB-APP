const express = require('express');
const createError = require('http-errors');
const cors = require('cors');
const morgan = require('morgan'); // For logging HTTP requests
const helmet = require('helmet'); // For security headers
const dotenv = require('dotenv'); // For loading environment variables
const mongoose = require('mongoose'); 

const user_route = require('./src/routes/user_route');
const jobs_route = require('./src/routes/jobs_route');
const application_route = require('./src/routes/application_route');


dotenv.config();

const app = express();

// Use CORS middleware
app.use(cors());

app.use(helmet());


app.use(morgan('dev'));


app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/job_portal', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Define routes
app.use('/api/user', user_route);
app.use('/api/jobs', jobs_route);
app.use('/api/application', application_route);

// Basic route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// 404 error handler
app.use((req, res, next) => {
    next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {},
    });
});

module.exports = app;
