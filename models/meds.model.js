const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const medsSchema = new Schema({
  username: { type: String, required: true },
  medsname:{type: String, required: true},
  description: { type: String, required: true },
  duration: { type: Number, required: true }
  
}, {
  timestamps: true,
});

const Meds = mongoose.model('Meds', medsSchema);

module.exports = Meds;