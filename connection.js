const mongoose = require('mongoose');

const uri = "mongodb+srv://" + process.env.USER + ":" + process.env.CLUSTER + "/" + process.env.DB + "?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Could not connect to MongoDB', error));