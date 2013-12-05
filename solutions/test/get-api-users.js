var config = require('./fixtures/config');
var request = require('request');
var expect = require('chai').expect;
require('mocha');

describe('GET /api/users', function () {
  // The URL we are testing
  var url = 'http://localhost:5555/api/users';
  var options = { json: true };
    
  it('should successfully return users', function (done) {
    request.get(url, options, function (err, resp, body) {
      expect(resp).to.have.property('statusCode').to.equal(200);
      expect(body).to.be.instanceof(Array).to.have.length(20);
      body.forEach(function (user) {
        expect(user).to.have.property('name');
      });
      done(); // Don't forget to call done!
    });
  });
});
