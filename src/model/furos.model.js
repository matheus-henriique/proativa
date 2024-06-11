const mongoose = require('mongoose');

const FuroSchema = new mongoose.Schema({
  obra: { type: String, required: true },
  cliente: { type: String, required: true },
  responsavel: { type: String, required: true },
  assistente: { type: String, required: true },
  observacao: { type: String },
  liberado: { type: Boolean, required: true }
});

module.exports = mongoose.model('Furo', FuroSchema);