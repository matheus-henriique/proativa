const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const equipamentoSchema = new Schema({
  nome: { type: String, required: true },
  modelo: { type: String, required: true },
  tamanho: String,
  patrimonio: { type: String, required: true },
  marca: String,
  liberado: { type: Boolean, default: false },
  cliente: { type: Schema.Types.ObjectId, ref: 'Cliente' }
});

module.exports = mongoose.model('Equipamento', equipamentoSchema);