const express = require('express');
const router = express.Router();
const userController = require('../controller/User');
const auth = require('../controller/Auth.controller');

// Rotas
router.post('/user', auth.authenticateToken, userController.createUser);
router.get('/users', auth.authenticateToken, userController.getUsers);
router.get('/user/email', auth.authenticateToken, userController.getUserByEmail);
router.put('/user', auth.authenticateToken, userController.updateUser);
router.delete('/user', auth.authenticateToken, userController.deleteUser);

module.exports = router