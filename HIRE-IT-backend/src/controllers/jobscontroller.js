const Job = require('../models/jobmodel');


exports.getJobList = async (req, res) => {
    try {
        const jobs = await Job.find(req.query);
        res.status(200).json(jobs);
    } catch (error) {
        console.error('Error occurred while fetching jobs:', error);
        res.status(500).send('Error occurred while fetching jobs');
    }
};


exports.createJob = async (req, res) => {
    try {
        const job = new Job(req.body);
        await job.save();
        res.status(201).json({
            message: 'Job created successfully',
            job: job
        });
    } catch (error) {
        console.error('Error occurred while creating job:', error);
        res.status(400).send('Error occurred while creating job');
    }
};

// Get job details by ID
exports.getJobDetailsById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).send('Job not found');
        }
        res.status(200).json(job);
    } catch (error) {
        console.error('Error occurred while fetching job details:', error);
        res.status(500).send('Error occurred while fetching job details');
    }
};

// Update job by ID
exports.updateJob = async (req, res) => {
    const jobId = req.params.id;
    const updateData = req.body;

    try {
        const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, { new: true, runValidators: true });
        if (!updatedJob) {
            return res.status(404).send('Job not found');
        }
        res.status(200).json(updatedJob);
    } catch (error) {
        console.error('Error occurred while updating job:', error);
        res.status(500).send('Error occurred while updating job');
    }
};


exports.deleteJob = async (req, res) => {
    const jobId = req.params.jobId;

    try {
        const jobToDelete = await Job.findById(jobId);
        if (!jobToDelete) {
            return res.status(404).send('Job not found');
        }
        await Job.findByIdAndDelete(jobId);
        res.status(200).json('Job deleted successfully');
    } catch (error) {
        console.error('Error occurred while deleting job:', error);
        res.status(500).send('Error occurred while deleting job');
    }
};
