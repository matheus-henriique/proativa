const Furo = require('../model/furos.model.js');

exports.createFuro = async (req, res) => {
  try {
    const newFuro = new Furo(req.body);
    await newFuro.save();
    res.status(201).json(newFuro);
  } catch (error) {
    res.status(500).send({ error_text: 'Erro no servidor', error: error });
  }
};

exports.getAllFuros = async (req, res) => {
  try {
    const furos = await Furo.find();
    res.status(200).json(furos);
  } catch (error) {
    res.status(500).send({ error_text: 'Erro no servidor', error: error });
  }
};

exports.getFuroById = async (req, res) => {
  try {
    const furo = await Furo.findById(req.params.id);
    if (!furo) {
      res.status(404).json({ error_text: 'Furo não encontrado' });
    } else {
      res.status(200).json(furo);
    }
  } catch (error) {
    res.status(500).send({ error_text: 'Erro no servidor', error: error });
  }
};

exports.updateFuro = async (req, res) => {
  try {
    const updatedFuro = await Furo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedFuro);
  } catch (error) {
    res.status(500).send({ error_text: 'Erro no servidor', error: error });
  }
};

exports.deleteFuro = async (req, res) => {
  try {
    const furo = await Furo.findById(req.params.id);
    if (!furo) {
      res.status(404).json({ error_text: 'Furo não encontrado' });
    } else {
      await Furo.findByIdAndDelete(req.params.id);
      res.status(204).json({ message: 'Furo deletado com sucesso' });
    }
  } catch (error) {
    res.status(500).send({ error_text: 'Erro no servidor', error: error });
  }
};
