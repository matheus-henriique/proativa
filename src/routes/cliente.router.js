const express = require('express');
const router = express.Router();
const clientesController = require('../controller/Cliente.controller');

router.post('/cliente', clientesController.createCliente);
router.get('/cliente', clientesController.getAllCliente);
router.put('/cliente/:id', clientesController.updateCliente);
router.delete('/cliente/:id', clientesController.deleteCliente);

module.exports = router;