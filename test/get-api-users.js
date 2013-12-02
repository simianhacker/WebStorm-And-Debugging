var expect = require('chai').expect;
var config = require('./fixtures/config');
var request = require('request');
require('mocha');

describe("GET /api/users", function () {
  it("should return 200 statusCode", function (done) {
    request.get('http://localhost:5555/api/users', function (err, resp, body) {
      expect(resp.statusCode).to.equal(200);
      done();
    });
  });

  it("should return an array of users", function (done) {
    var options = { json: true };

    var callback = function (err, resp, body) {
      expect(body).to.be.instanceof(Array);
      expect(body).to.have.length(20);
      done();
    };

    request.get('http://localhost:5555/api/users', options, callback);
  });

  it("should return records that have names", function (done) {
    var options = { json: true };

    var callback = function (err, resp, body) {
      body.forEach(function (user) {
        expect(user).to.have.property('name');
      });
      done();
    };

    request.get('http://localhost:5555/api/users', options, callback);
  });

});