var redis = require('redis');
var client = redis.createClient();

// For demo purposes we are going to add a float to Redis so we
// can have something to retrieve later. Normally, this number would
// be generated differently.
client.set('totals', Math.random() + (Math.random()*1000000));

var api = {};

module.exports = function (app) {
    app.get('/api/totals', api.list);
};

api.list = function (req, res, next) {
    client.get('totals', function (err, total) {
        if (err) return next(err);
        res.send(200, total.toFixed(2));
    });
}
