const mongoose = require('mongoose');
const job_status = require('../util/jobconstant'); // Import constants

const jobSchema = new mongoose.Schema({
    job_role: {
        type: String,
        required: [true, 'Job name is required'],
        trim: true
    },
    job_company: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true
    },
    job_description: {
        type: String,
    //    required: [true, 'Description is required']
    },
    job_location: {
        type: String,
        required: [true, 'Location is required']
    },
    job_type: {
        type: String,
        required: [true, 'Job type is required'],
        default: job_status.FULL_TIME, 
        trim: true
    },
    end_date: {
        type: Date,
       required: [true, 'End date is required']
    },
    datecreated: {
        type: Date,
        default: Date.now
    }
}, 
{
    timestamps: true
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
