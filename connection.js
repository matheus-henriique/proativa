const mongoose = require('mongoose');

var CLUSTER = encodeURIComponent("CLUSTER");

const uri = "mongodb+srv://" + process.env.USER + ":" + CLUSTER + "/" + process.env.DB + "?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));