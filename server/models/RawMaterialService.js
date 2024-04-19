const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RawMaterialServiceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image:{
    type: String,
  },
  MateriaID: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  PricePerUnit: {
    type: Number,
    required: true
  },
  Quantity: {
    type: Number,
    required: true
  },
  SupplierID: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    default: Date.now
  },
  ExpiryDate:{
    type: Date,
    required: true
  },
  Status: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('rawMaterialService', RawMaterialServiceSchema);