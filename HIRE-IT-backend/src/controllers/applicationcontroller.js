const Job = require('../models/jobmodel');
const Application = require('../models/applicationmodel');

// Create a new application
exports.newApplication = async (req, res) => {
    const { jobId, userId } = req.params;
    const { resume } = req.body;

    try {
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).send('Job not found');
        }

        const existingApplication = await Application.findOne({ jobId, userId });
        if (existingApplication) {
            return res.status(400).send('You have already applied');
        }

        // Create a new application
        const newApplication = new Application({
            jobId,
            userId,
            resume
        });

        await newApplication.save();
        res.status(201).json({
            message: 'Application submitted successfully',
            newApplication
        });
    } catch (error) {
        console.error('Error creating application:', error);
        res.status(500).send('Something went wrong: ' + error.message);
    }
};

// Find application by ID
exports.getApplicationById = async (req, res) => {
    const applicationId = req.params.id; 

    try {
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).send('Application not found');
        }
        res.status(200).json(application);
    } catch (error) {
        console.error('Error fetching application:', error);
        res.status(500).send('Error fetching application: ' + error.message);
    }
};

// Update application
exports.updateApplication = async (req, res) => {
    const applicationId = req.params.id; 
    const updateData = req.body;

    try {
        const updatedApplication = await Application.findByIdAndUpdate(applicationId, updateData, {
            new: true,
            runValidators: true
        });
        if (!updatedApplication) {
            return res.status(404).send('Application not found');
        }
        res.status(200).json({
            message: 'Application updated successfully',
            application: updatedApplication
        });
    } catch (error) {
        console.error('Error updating application:', error);
        res.status(500).send('Error updating application: ' + error.message);
    }
};

// Withdraw application
exports.removeApplication = async (req, res) => {
    const applicationId = req.params.id;

    try {
        const removedApplication = await Application.findByIdAndDelete(applicationId);
        if (!removedApplication) {
            return res.status(404).send('Application not found');
        }
        res.status(200).send('Application deleted successfully');
    } catch (error) {
        console.error('Error deleting application:', error);
        res.status(500).send('Error deleting application: ' + error.message);
    }
};
