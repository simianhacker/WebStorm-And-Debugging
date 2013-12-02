var api = {};
var async = require('async');
var redis = require('redis');
var client = redis.createClient();
module.exports = function (app) {
  app.get('/api/users', api.list);
};

var getUser = function (id, callback) {
    client.hgetall(id, callback);
};

api.list = function (req, res, next) {
  client.smembers('users', function (err, resp) {
    if (err) return next (err);
    async.map(resp, getUser, function (err, users) {
      if (err) return next(err);
      res.send(200, users);
    });
  });
};