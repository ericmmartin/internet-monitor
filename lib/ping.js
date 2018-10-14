'use strict';

const co = require('co');
const ping = require('ping');

const host = '8.8.8.8';

module.exports = () => co(function*() {
  const response = yield ping.promise.probe(host);

  if (response && response.hasOwnProperty('alive')) {
    return {
      host: response.host,
      alive: response.alive,
      time: response.time
    };
  } else {
    console.log('ping - invalid response');
    return {
      host,
      alive: false,
      time: 0
    }
  }
}).catch(err => {
  console.log(`ping failed: ${err}`);
  return {
    host,
    alive: false,
    time: 0
  }
});
