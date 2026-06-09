const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  short: { type: String, required: true },
  desc: { type: String, required: true },
  benefits: [{ type: String }],
  icon: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
