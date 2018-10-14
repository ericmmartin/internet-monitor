'use strict';

const co = require('co');

const Speed = require('../models/speed');

module.exports = speedData => co(function*() {
    const speed = new Speed(speedData);

    yield speed.save();

    return {status: 'success'};
}).catch(err => {
    return {status: 'failed'};
});
