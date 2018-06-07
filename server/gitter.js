const request = require('request');

const gitterHost = 'https://gitter.im';
const clientId = process.env.GITTER_KEY ? process.env.GITTER_KEY.trim() : 'af93f30de7ce8d102d264b63c7601d18f0ad36d9';
const clientSecret  = process.env.GITTER_SECRET ? process.env.GITTER_SECRET.trim() : '05a45c2a65acc2c9e1b318e1f9d707ec137cf530';

// Gitter API client helper
const gitter = {
  fetch: function(path, token, cb) {
    var options = {
     url: gitterHost + path,
     headers: {
       'Authorization': 'Bearer ' + token
     }
    };

    request(options, function (err, res, body) {
      if (err) return cb(err);

      if (res.statusCode === 200) {
        cb(null, JSON.parse(body));
      } else {
        cb('err' + res.statusCode);
      }
    });
  },

  fetchCurrentUser: function(token, cb) {
    this.fetch('/api/v1/user/', token, function(err, user) {
      cb(err, user[0]);
    });
  },

  fetchRooms: function(user, token, cb) {
    this.fetch('/api/v1/user/' + user.id + '/rooms', token, function(err, rooms) {
      cb(err, rooms);
    });
  }
};

module.exports = gitter;
