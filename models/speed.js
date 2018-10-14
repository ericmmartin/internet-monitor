'use strict';

const mongoose = require('mongoose');

const SpeedSchema = mongoose.Schema({
  host: String,
  ping: Number,
  distance: Number,
  download: Number,
  upload: Number
});

module.exports = mongoose.model('Speed', SpeedSchema);
