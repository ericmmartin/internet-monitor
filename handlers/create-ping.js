'use strict';

const co = require('co');

const Ping = require('../models/ping');

module.exports = pingData => co(function*() {
    const ping = new Ping(pingData);

    yield ping.save();

    return {status: 'success'};
}).catch(err => {
    return {status: 'failed'};
});
