const express = require('express');
const router = express.Router();
const equipamentoController = require('../controller/Equipamento.controller');
const auth = require('../controller/Auth.controller');

router.post('/equipamentos', auth.authenticateToken, equipamentoController.createEquipamento);
router.get('/equipamentos', auth.authenticateToken, equipamentoController.getAllEquipamentos);
router.get('/equipamentos/name', auth.authenticateToken, equipamentoController.getEquipamentoByNome);
router.put('/equipamentos/:id', auth.authenticateToken, equipamentoController.updateEquipamento);
router.delete('/equipamentos/:id', auth.authenticateToken, equipamentoController.deleteEquipamento);

module.exports = router;
