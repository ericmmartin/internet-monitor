'use strict';

const mongoose = require('mongoose');

const PingSchema = mongoose.Schema({
    host: String,
    alive: Boolean,
    time: Number
});

module.exports = mongoose.model('Ping', PingSchema);
