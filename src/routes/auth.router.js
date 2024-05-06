const express = require('express');
const router = express.Router();
const authController = require('../controller/Auth.controller');

// Rotas
router.post('/auth', authController.login);

module.exports = router