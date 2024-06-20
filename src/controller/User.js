// user.controller.js
const User = require('../model/user.model.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Create
exports.createUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: "User is already registered" });
        }
        
        const newUser = new User(req.body);
        newUser.password = await bcrypt.hash(newUser.password, saltRounds);
        
        await newUser.save();
        
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Read
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserByEmail = async (req, res) => {
    const {email} = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(200).json({
                message: "User not found!"
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update
exports.updateUser = async (req, res) => {
    try {
        const { id, data } = req.body;

        if(data.password){
            data.password = await bcrypt.hash(data.password, saltRounds);
        }

        const user = await User.findByIdAndUpdate(id, data, { new: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.body;
        console.log(id)
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};