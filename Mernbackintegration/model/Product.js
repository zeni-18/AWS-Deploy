const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: String, default: 'electronics' },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

});
module.exports = mongoose.model('Product', ProductSchema);
