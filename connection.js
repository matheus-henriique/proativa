const mongoose = require('mongoose');

const uri = process.env.PATH;

mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));