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
  } catch (error) {
    res.status(500).send({ error_text: 'Erro no servidor', error: error });
  }
};

exports.getAllCliente = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).send({ error_text: 'Erro no servidor', error: error });
  }
};

exports.getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      res.status(404).json({ error_text: 'Cliente não encontrado' });
    } else {
      res.status(200).json(cliente);
    }
  } catch (error) {
    res.status(500).send({ error_text: 'Erro no servidor', error: error });
  }
};

exports.updateCliente = async (req, res) => {
  try {
    const updatedCliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedCliente);
  } catch (error) {
    res.status(500).send({ error_text: 'Erro no servidor', error: error });
  }
};

exports.deleteCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      res.status(404).json({ error_text: 'Cliente não encontrado' });
    } else {
      await Cliente.findByIdAndDelete(req.params.id);
      res.status(204).json({ message: 'Cliente deletado com sucesso' });
    }
  } catch (error) {
    res.status(500).send({ error_text: 'Erro no servidor', error: error });
  }
};