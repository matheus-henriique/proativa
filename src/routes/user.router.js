const express = require('express');
const router = express.Router();
const userController = require('../controller/User');

// Rotas
router.post('/user', userController.createUser);
router.get('/users', userController.getUsers);
router.get('/user/email', userController.getUserByEmail);
router.put('/user', userController.updateUser);
router.delete('/user', userController.deleteUser);

module.exports = router