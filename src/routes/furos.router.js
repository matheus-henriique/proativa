const express = require('express');
const router = express.Router();
const auth = require('../controller/Auth.controller');

const furoController = require('../controller/Furos.controller');

router.post('/furos', auth.authenticateToken, furoController.createFuro);
router.get('/furos', auth.authenticateToken, furoController.getAllFuros);
router.get('/furos/:id', auth.authenticateToken, furoController.getFuroById);
router.put('/furos/:id', auth.authenticateToken, furoController.updateFuro);
router.delete('/furos/:id', auth.authenticateToken, furoController.deleteFuro);

module.exports = router;
