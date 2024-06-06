const Cliente = require('../model/cliente.model.js');

exports.createCliente = async (req, res) => {
  try {
    const existingCliente = await Cliente.findOne({ email: req.body.email });
    if (existingCliente) {
        return res.status(400).json({ error_text: "Cliente já cadastrado"});
    }

    const newCliente = new Cliente(req.body);
    await newCliente.save();

    res.status(201).json(newCliente);
  } catch (err) {
    res.status(400).json({ error_text: 'Erro ao criar cliente', error: err });
  }
};

exports.readCliente = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (err) {
    res.status(404).json({ error_text: 'Clientes não encontrados', error: err });
  }
};

exports.updateCliente = async (req, res) => {
  try {
    const updatedCliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedCliente);
  } catch (err) {
    res.status(400).json({ error_text: 'Erro ao atualizar cliente', error: err });
  }
};

exports.deleteCliente = async (req, res) => {
  try {
    await Cliente.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Cliente deletado' });
  } catch (err) {
    res.status(400).json({ error_text: 'Erro ao deletar cliente', error: err });
  }
};
