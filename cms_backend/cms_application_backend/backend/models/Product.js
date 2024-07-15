
const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  id: Number,
  name: String,
  description: String,
  price: Number,
  category: String,
  imageUrl: String,
  stock: Number,
  shipping: String,
  reviews: String
});

module.exports = mongoose.model('Product', productSchema);