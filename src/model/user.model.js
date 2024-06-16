const mongoose = require('mongoose');

const userModel = new mongoose.Schema({ 
    name: { type: String, required: true }, 
    phone: { type: String, required: true }, 
    address: { type: String, required: true }, 
    role: { type: String, required: true }, 
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true } ,
    resetCode: { type: String } ,
    resetTokenExpiration: { type: Date }
});

const User = mongoose.model('User', userModel);

module.exports = User;
