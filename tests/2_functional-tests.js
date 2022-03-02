/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *       
 */

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;

const server = require('../server');
const Book = require('../models/book');

chai.use(chaiHttp);

suite('Functional Tests', function () {

  suite('Routing tests', function () {


    suite('POST /api/books with title => create book object/expect book object', function () {

      test('Test POST /api/books with title', function (done) {
        chai.request(server)
          .post('/api/books')
          .send({
            title: "A whole new book"
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.property(res.body, "_id", "_id must be a property");
            assert.property(res.body, "title", "title must be a property");
            done();
          });
      });

      test('Test POST /api/books with no title given', function (done) {
        chai.request(server)
          .post('/api/books')
          .send({})
          .end(function (err, res) {
            assert.equal(res.body, "missing required field title", "the title is required");
            done();
          });
      });

    });


    suite('GET /api/books => array of books', function () {

      test('Test GET /api/books', function (done) {
        chai.request(server)
          .get('/api/books')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body, "The body must be an array");
            assert.hasAllKeys(res.body[0], ["_id", "title", "comments", "commentcount", "__v"], "The objects within the array have these keys: _id, title, comments, commentcount and __v");
            done();
          });
      });

    });


    suite('GET /api/books/[id] => book object with [id]', function () {

      test('Test GET /api/books/[id] with id not in db', function (done) {
        chai.request(server)
          .get('/api/books/hudiasuibdsiabui')
          .end(function (err, res) {
            assert.equal(res.body, "no book exists");
            done();
          });
      });

      test('Test GET /api/books/[id] with valid id in db', function (done) {
        Book.findOne({}, function (err, doc) {
          chai.request(server)
            .get(`/api/books/${doc._id.toString()}`)
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.isObject(res.body, "The response must be an object");
              assert.hasAllKeys(res.body, ["_id", "title", "comments", "commentcount", "__v"], "The object must have all the required keys: _id, title, comments, commentcount and __v");
              done();
            });
        });
      });
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function () {

      test('Test POST /api/books/[id] with comment', function (done) {
        Book.findOne({}, function (err, doc) {
          chai.request(server)
            .post(`/api/books/${doc._id.toString()}`)
            .send({
              comment: "QWERTYUIOP"
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.isObject(res.body, "The response must be an object");
              assert.hasAllKeys(res.body, ["_id", "title", "comments", "commentcount", "__v"], "The object must have all the required keys");
              assert.isArray(res.body.comments, "The book comments must be an array");
              assert.isAbove(res.body.commentcount, 0, "The comment count must be greater than 0 after adding a new one");
              done();
            });
        });
      });

      test('Test POST /api/books/[id] without comment field', function (done) {
        Book.findOne({}, function (err, doc) {
          chai.request(server)
            .post(`/api/books/${doc._id.toString()}`)
            .send({})
            .end(function (err, res) {
              assert.equal(res.body, "missing required field comment");
              done();
            });
        });
      });

      test('Test POST /api/books/[id] with comment, id not in db', function (done) {
        chai.request(server)
          .post('/api/books/hkdnsajknjkdsanjkiu')
          .send({
            comment: "ZXCVBNM"
          })
          .end(function (err, res) {
            assert.equal(res.body, "no book exists");
            done();
          });
      });

    });

    suite('DELETE /api/books/[id] => delete book object id', function () {

      test('Test DELETE /api/books/[id] with valid id in db', function (done) {
        Book.findOne({}, function (err, doc) {
          chai.request(server)
            .delete(`/api/books/${doc._id.toString()}`)
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.body, "delete successful");
              done();
            });
        });
      });

      test('Test DELETE /api/books/[id] with id not in db', function (done) {
        chai.request(server)
          .delete('/api/books/123456yuikjhgvcx')
          .end(function (err, res) {
            assert.equal(res.body, "no book exists");
            done();
          });
      });
      
    });

  });
  
});