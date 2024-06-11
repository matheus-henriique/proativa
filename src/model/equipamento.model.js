const mongoose = require('mongoose');

const equipamentoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  modelo: { type: String, required: true },
  tamanho: String,
  patrimonio: { type: String, required: true },
  marca: String,
  liberado: { type: Boolean, default: false }
});

module.exports = mongoose.model('Equipamento', equipamentoSchema);