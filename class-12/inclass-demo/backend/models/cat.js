'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const catSchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  spayNeuter: { type: Boolean, required: true },
  location: String
});

const CatModel = mongoose.model('cat', catSchema);

module.exports = CatModel;
