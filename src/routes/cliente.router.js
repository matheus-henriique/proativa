const express = require('express');
const router = express.Router();
const clientesController = require('../controller/Cliente.controller');
const auth = require('../controller/Auth.controller');

router.post('/cliente', auth.authenticateToken, clientesController.createCliente);
router.get('/cliente', auth.authenticateToken, clientesController.getAllCliente);
router.put('/cliente/:id', auth.authenticateToken, clientesController.updateCliente);
router.delete('/cliente/:id', auth.authenticateToken, clientesController.deleteCliente);

module.exports = router;