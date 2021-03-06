/*jslint node: true */
/*global describe: false, before: false, after: false, it: false */
"use strict";

// Declare the variables used
var expect = require('chai').expect,
  request = require('request'),
  server = require('../index');

// Server tasks
describe('server', function () {

  // Beforehand, start the server
  before(function (done) {
    console.log('Starting the server');
    done();
  });

  // Afterwards, stop the server and empty the database
  after(function (done) {
    console.log('Stopping the server');
    done();
  });

  // Test the index route
  describe('Test the index route', function () {
    it('should return a page with the title React Todo', function (done) {
      request.get({ url: 'http://localhost:5000/' }, function (error, response, body) {
        expect(body).to.include('React Todo');
        expect(response.statusCode).to.equal(200);
        expect(response.headers['content-type']).to.equal('text/html; charset=utf-8');
        done();
      });
    });
  });

  // Test the todos route
  describe('Test the todos route', function () {
    it('should return JSON', function (done) {
      request.get({ url: 'http://localhost:5000/todos' }, function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        expect(response.headers['content-type']).to.equal('application/json; charset=utf-8');
        done();
      });
    });
  });

  // Test adding a new todo
  describe('Test adding a new todo', function () {
    it('should return a 201', function (done) {
      request.post({ url: 'http://localhost:5000/todos',
        form:{text: 'Bake a cake'},
        jar: true,
        followRedirect: false},
        function (error, response, body) {
          expect(response.statusCode).to.equal(201);
          done();
        });
      });
    });
});
