 
const Users = require('../models/usermodel');
const loginMiddleware=require('../middlewares/userauthentication');

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await Users.find(req.query);
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching users', error });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const userDetails = await Users.findById(req.params.id);
        if (!userDetails) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(userDetails);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error });
    }
};

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password,role } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await Users.findOne({ email:email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new Users({ username, email, password,role  });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error("Error creating user:", error); 
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    loginMiddleware(req, res, () => {
        if (req.token) {
            res.status(200).json({ message: 'Login successful', token: req.token });
        } else {
            res.status(500).json({ message: 'Token generation failed' });
        }
    });
};

// Update user details
exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const update = req.body;
    try {
        const updatedUser = await Users.findByIdAndUpdate(userId, update, { new: true, runValidators: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await Users.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};
