const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, index: 'text' },
  description: { type: String, required: true, index: 'text' },
  price: { type: Number, required: true, index: true },
  imageUrl: { type: String, required: true },
  categories: { type: [String], required: true, index: true },
  brand: { type: String, required: true, index: true },
  attributes: { type: mongoose.Schema.Types.Mixed, required: true },
  stock: { type: Number, default: 0 },
  averageRating: { type: Number, min: 0, max: 5, default: 0 },
}, {
  timestamps: true,
});

// Create compound indexes for better query performance
ProductSchema.index({ categories: 1, brand: 1, price: 1 });
ProductSchema.index({ 'attributes.color': 1 });
ProductSchema.index({ 'attributes.size': 1 });

module.exports = mongoose.model('Product', ProductSchema);