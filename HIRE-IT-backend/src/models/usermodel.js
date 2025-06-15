const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Job = require('../models/jobmodel');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email ID is required'],
        unique: [true, 'Email ID must be unique'],
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Minimum length of 6 characters is required'],
    },
    role: {
        type: String,
        enum: ['user', 'recruiter', 'admin'],
        default: 'user',
    },
    appliedjobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
    }],
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema, 'users');
module.exports = User;
