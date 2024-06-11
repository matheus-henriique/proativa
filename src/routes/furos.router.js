const express = require('express');
const router = express.Router();
const furoController = require('../controller/Furos.controller');

router.post('/furos', furoController.createFuro);
router.get('/furos', furoController.getAllFuros);
router.get('/furos/:id', furoController.getFuroById);
router.put('/furos/:id', furoController.updateFuro);
router.delete('/furos/:id', furoController.deleteFuro);

module.exports = router;
