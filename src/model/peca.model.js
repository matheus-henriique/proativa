const mongoose = require('mongoose');

const PecaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  equipamento: { type: String, required: true },
  quantidade: { type: Number, required: true },
  codigo: { type: String, required: true, unique: true },
  marca: { type: String, required: true },
  observacao: { type: String }
});

module.exports = mongoose.model('Peca', PecaSchema);