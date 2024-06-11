const express = require('express');
const router = express.Router();
const equipamentoController = require('../controller/Equipamento.controller');
const auth = require('../controller/Auth.controller');

router.post('/equipamentos', auth.authenticateToken, equipamentoController.createEquipamento);
router.get('/equipamentos', auth.authenticateToken, equipamentoController.getAllEquipamentos);
router.get('/equipamentos/name', auth.authenticateToken, equipamentoController.getEquipamentoByNome);
router.put('/equipamentos/:id', auth.authenticateToken, equipamentoController.updateEquipamento);
router.delete('/equipamentos/:id', auth.authenticateToken, equipamentoController.deleteEquipamento);

router.post('/:equipamentoId/remove-cliente', auth.authenticateToken, equipamentoController.removeCliente);
router.post('/:equipamentoId/assign-cliente/:clienteId', auth.authenticateToken, equipamentoController.assignCliente);


module.exports = router;
