const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String
});

const User = mongoose.model('User', userModel);

module.exports = User;
