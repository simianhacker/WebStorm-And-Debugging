var api = {};
var redis = require('redis');
var client = redis.createClient();
var async = require('async');

module.exports = function (app) {
  app.get('/api/users', api.list);
};

api.list = function (req, res, next) {
  client.smembers('users', function (err, resp) {
    if (err) return next(err);
    async.map(resp, client.hgetall.bind(client), function (err, users) {
      if (err) return next(err);
      res.send(200, users);
    });
  });
};

