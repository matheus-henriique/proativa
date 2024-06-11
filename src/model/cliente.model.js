const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nome: String,
  telefone: String,
  email: { type: String, unique: true },
  cpf: { type: String, unique: true },
  funcao: String,
  obra: String
});

module.exports = mongoose.model('Cliente', clienteSchema);