const express = require('express');
const router = express.Router();
const pecaController = require('../controller/Pecas.controller');

router.post('/pecas', pecaController.createPeca);
router.get('/pecas', pecaController.getAllPecas);
router.get('/pecas/nome', pecaController.getPecaByNome);
router.put('/pecas/:id', pecaController.updatePeca);
router.delete('/pecas/:id', pecaController.deletePeca);

module.exports = router;
