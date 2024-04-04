const express = require('express');
const mongoose = require('mongoose');
const userController = require('./src/controller/User.js');

const app = express();
app.use(express.json());

const uri = "mongodb+srv://<user>:<password>@cluster0.4ctzmak.mongodb.net/<base>?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Rotas
app.post('/users', userController.createUser);
app.get('/users', userController.getUsers);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));