// user.controller.js
const User = require('../model/user.model.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Create
exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        user.password = bcrypt.hashSync(user.password, saltRounds);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
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
    const {email, password} = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const match = await bcrypt.compare(password, user.password);

        if(match){
            res.status(200).json(user);
        } else {
            res.status(401).json({
                Access: "Negado!!",
                Info: match
            });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};