const Peca = require('../model/peca.model.js');

exports.createPeca = async (req, res) => {
  try {
    const existingPeca = await Peca.findOne({ codigo: req.body.codigo });
    if (existingPeca) {
      return res.status(400).json({ error_text: "Peça já cadastrada com este código"});
    }

    const newPeca = new Peca(req.body);
    await newPeca.save();

    res.status(201).json(newPeca);
  } catch (error) {
    res.status(500).send({ error_text: 'Erro no servidor', error: error });
  }
};

exports.getAllPecas = async (req, res) => {
  try {
    const pecas = await Peca.find();
    res.status(200).json(pecas);
  } catch (error) {
    res.status(500).send({ error_text: 'Erro no servidor', error: error });
  }
};

exports.getPecaById = async (req, res) => {
  try {
    const peca = await Peca.findById(req.params.id);
    if (!peca) {
      res.status(404).json({ error_text: 'Peça não encontrada' });
    } else {
      res.status(200).json(peca);
    }
  } catch (error) {
    res.status(500).send({ error_text: 'Erro no servidor', error: error });
  }
};

exports.updatePeca = async (req, res) => {
  try {
    const updatedPeca = await Peca.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedPeca);
  } catch (error) {
    res.status(500).send({ error_text: 'Erro no servidor', error: error });
  }
};

exports.deletePeca = async (req, res) => {
  try {
    const peca = await Peca.findById(req.params.id);
    if (!peca) {
      res.status(404).json({ error_text: 'Peça não encontrada' });
    } else {
      await Peca.findByIdAndDelete(req.params.id);
      res.status(204).json({ message: 'Peça deletada com sucesso' });
    }
  } catch (error) {
    res.status(500).send({ error_text: 'Erro no servidor', error: error });
  }
};
