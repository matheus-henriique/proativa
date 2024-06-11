const express = require('express');
const router = express.Router();
const equipamentoController = require('../controller/Equipamento.controller');

router.post('/equipamentos', equipamentoController.createEquipamento);
router.get('/equipamentos', equipamentoController.getAllEquipamentos);
router.get('/equipamentos/name', equipamentoController.getEquipamentoByNome);
router.put('/equipamentos/:id', equipamentoController.updateEquipamento);
router.delete('/equipamentos/:id', equipamentoController.deleteEquipamento);

router.post('/:equipamentoId/remove-cliente', equipamentoController.removeCliente);
router.post('/:equipamentoId/assign-cliente/:clienteId', equipamentoController.assignCliente);


module.exports = router;
