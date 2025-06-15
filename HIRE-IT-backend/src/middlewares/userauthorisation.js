const User = require('../models/usermodel');
const generateToken = require('../util/jwt_generator'); 

const loginMiddleware = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const foundUser = await User.findOne({ username });
        if (!foundUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await foundUser.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }
        const token = generateToken({ userId: foundUser._id, username: foundUser.username });

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'An error occurred during login', error: err.message });
    }
};

module.exports = loginMiddleware;
