const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  telefone: String,
  email: { type: String, required: true, unique: true },
  cpf: { type: String, required: true, unique: true },
  funcao: String,
  obra: String,
  equipamentos: [{ type: Schema.Types.ObjectId, ref: 'Equipamento' }],
  furos: Number
});

module.exports = mongoose.model('Cliente', clienteSchema);