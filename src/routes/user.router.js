const express = require('express');
const router = express.Router();
const userController = require('../controller/User');

// Rotas
router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);
router.get('/users/email', userController.getUserByEmail);
router.put('/users', userController.updateUser);
router.delete('/users', userController.deleteUser);

module.exports = router