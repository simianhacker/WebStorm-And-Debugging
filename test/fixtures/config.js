process.env.NODE_ENV = 'test';
var path = require('path');
var http = require('http');
var app = require(path.join(__dirname, '..', '..', 'app'));
var mocha = require('mocha');
var redis = require('redis');
var _ = require('lodash');
var uuid = require('node-uuid');
var Faker = require('Faker');
var client = redis.createClient();

app.set('port', 5555);
var server = http.createServer(app);

beforeEach(function (done) {
  server.listen(app.get('port'), done);
});

beforeEach(function (done) {
  var multi = client.multi();
  _.range(20).forEach(function (i) {
    var id = uuid.v4();
    multi.hmset('user:'+id, {
      name: Faker.Name.findName(),
      email: Faker.Internet.email(),
      password: "example"
    });
    multi.sadd('users', 'user:'+id);
  });
  multi.exec(done);
});

afterEach(function (done) {
  client.flushdb(done);
})

afterEach(function (done) {
  server.close(done);
});

