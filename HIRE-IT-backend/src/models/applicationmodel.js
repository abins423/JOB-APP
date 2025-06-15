const mongoose = require('mongoose');
const application_status=require('../util/applicationconstant')
const applicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        default:application_status.NOT_VIEWED
    },
    resume: {
        type: String,
        trim: true
    },
    applied_at: {
        type: Date,
        default: Date.now
    }
});

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;
