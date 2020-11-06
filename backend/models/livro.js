const mongoose = require ('mongoose');

const livroSchema = mongoose.Schema({
  // id: {type: String, required: true},
  titulo: {type: String, required: true},
  autor: {type: String, required: false, default: '00000000'},
  numero: {type: String, required: true}
});

module.exports = mongoose.model ('Livro', livroSchema);
