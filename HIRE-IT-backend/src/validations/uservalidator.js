const User = require('../models/usermodel');
const mongoose = require('mongoose');

const checkuser = async (req, res, next) => {
    try {
        // Log the req.params.userId to ensure it's being set
        console.log('User ID from request:', req.params.userId);
        
        // Check if the provided userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        // Find the user by ID
        const user = await User.findById(req.params.userId);
        
        // Log the user object to see what it contains
        console.log('User object:', user);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }
        
        if (user.role !== 'recruiter' && user.role !== 'admin') {
            return res.status(401).json({ message: 'Unauthorized: Not a recruiter or admin' });
        }

        next(); // User is authorized, proceed to the next middleware or route handler
    } catch (err) {
        // Log the error for debugging
        console.error('Internal server error:', err);

        // Send a generic error message to the client
        res.status(500).json({ message: 'Internal server error: ' + err.message });
    }
};

module.exports = checkuser;
