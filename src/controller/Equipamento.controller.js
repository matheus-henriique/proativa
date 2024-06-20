const Equipamento = require('../model/equipamento.model.js');
const Cliente = require('../model/cliente.model.js');

exports.createEquipamento = async (req, res) => {
  try {
    const newEquipamento = new Equipamento(req.body);
    await newEquipamento.save();

    res.status(201).json(newEquipamento);
  } catch (error) {
    res.status(500).send({ error_text: 'Erro no servidor', error: error });
  }
};

exports.getAllEquipamentos = async (req, res) => {
  try {
    const equipamentos = await Equipamento.find();
    console.log(equipamentos);
    res.status(200).json(equipamentos);
  } catch (error) {
    res.status(500).send({ error_text: 'Erro no servidor', error: error });
  }
};


exports.getEquipamentoByNome = async (req, res) => {
  try {
    const equipamento = await Equipamento.findOne({ nome: req.body.nome });
    if (!equipamento) {
      res.status(404).json({ error_text: 'Equipamento não encontrado' });
    } else {
      res.status(200).send(equipamento);
    }
  } catch (error) {
    res.status(500).send({ error_text: 'Erro no servidor', error: error });
  }
};

exports.updateEquipamento = async (req, res) => {
  try {
    const exist = await Equipamento.findById(req.params.id);
    if (!exist) {
        res.status(404).json({ error_text: 'Equipamento não encontrado' });
    } else {
        const equipamento = await Equipamento.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(equipamento);
    }
  } catch (error) {
    res.status(500).send({ error_text: 'Erro no servidor', error: error });
  }
};

exports.deleteEquipamento = async (req, res) => {
    try {
      const equipamento = await Equipamento.findByIdAndDelete(req.params.id);
      if (!equipamento) {
        res.status(404).json({ error_text: 'Equipamento não encontrado' });
      } else {
        res.status(200).send({ message: "Equipamento deletado com sucesso."});
      }
    } catch (error) {
        res.status(500).send({ error_text: 'Erro no servidor', error: error });
    }
};

exports.assignCliente = async (req, res) => {
  try {
    const { equipamentoId, clienteId } = req.params;
    
    const equipamento = await Equipamento.findById(equipamentoId);
    if (equipamento.cliente) {
      return res.status(400).json({error_text: "Este equipamento já está associado a um cliente."});
    }

    const updatedEquipamento = await Equipamento.findByIdAndUpdate(equipamentoId, {
      cliente: clienteId
    }, { new: true });

    await Cliente.findByIdAndUpdate(clienteId, {
      $push: { equipamentos: updatedEquipamento._id }
    });

    res.status(200).send(updatedEquipamento);
  } catch (error) {
    res.status(500).send({ error_text: 'Erro no servidor', error: error });
  }
};

exports.removeCliente = async (req, res) => {
  const { equipamentoId } = req.params;

  try {
    const equipamento = await Equipamento.findById(equipamentoId);
    if (!equipamento.cliente) {
      return res.status(400).json({error_text: "Este equipamento não está associado a nenhum cliente."});
    }

    const clienteId = equipamento.cliente;
    await Equipamento.findByIdAndUpdate(equipamentoId, {
      $unset: { cliente: "" }
    });

    await Cliente.findByIdAndUpdate(clienteId, {
      $pull: { equipamentos: equipamentoId }
    });

    return res.status(200).json({message: "Cliente removido do equipamento com sucesso."});
  } catch (error) {
    res.status(500).send(error);
  }
};

  
