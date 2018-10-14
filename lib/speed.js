'use strict';

const speedtest = require('speedtest-net');

module.exports = () => new Promise((resolve, reject) => {
  const st = speedtest(); // {maxTime: 20000}
  const stats = {
    host: '',
    ping: 0,
    distance: 0,
    download: 0,
    upload: 0
  };

  st.on('data', data => {
    stats.host = data.server.host;
    stats.ping = data.server.ping;
    stats.distance = data.server.distanceMi;
    stats.download = data.speeds.download;
    stats.upload = data.speeds.upload;

  	resolve(stats);
  });

  st.on('error', err => {
    resolve(stats);
  });
});
