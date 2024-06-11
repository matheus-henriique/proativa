const express = require('express');
const router = express.Router();
const pecaController = require('../controller/Pecas.controller');
const auth = require('../controller/Auth.controller');


router.post('/pecas', auth.authenticateToken, pecaController.createPeca);
router.get('/pecas', auth.authenticateToken, pecaController.getAllPecas);
router.get('/pecas/nome/:nome', pecaController.getPecaByNome);
router.put('/pecas/:id', auth.authenticateToken, pecaController.updatePeca);
router.delete('/pecas/:id', auth.authenticateToken, pecaController.deletePeca);

module.exports = router;
