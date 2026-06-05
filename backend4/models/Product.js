const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  naziv: { type: String, required: true },
  cena: { type: Number, required: true },
  kategorija: { type: String, required: true },
  slika: { type: String }
});

module.exports = mongoose.model('Product', productSchema);