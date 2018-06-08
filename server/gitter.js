const request = require('request');

const gitterHost = 'https://gitter.im';

// Gitter API client helper
const gitter = {
  fetch: function(path, token, cb) {
    const options = {
     url: gitterHost + path,
     headers: {
       'Authorization': 'Bearer ' + token
     }
    };

    request(options, function(err, res, body) {
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
      if (user && user[0]) {
        cb(err, user[0]);
      } else {
        cb(err);
      }
    });
  },

  fetchRooms: function(userId, token, cb) {
    this.fetch('/api/v1/user/' + userId + '/rooms', token, function(err, rooms) {
      cb(err, rooms);
    });
  },
  
  fetchChatMessages: function(roomId, token, cb) {
    this.fetch('/api/v1/rooms/' + roomId + '/chatMessages?limit=50', token, function(err, messages) {
      cb(err, messages);
    });
  }
};

module.exports = gitter;
