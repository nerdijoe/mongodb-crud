var express = require('express');
var router = express.Router();
var book_controller = require('../controllers/bookController')
var Book = require('../models/book');

var mongoose = require('mongoose');
// var mongoDB = 'mongodb://127.0.0.1/academic'
// mongoose.connect(mongoDB);

var db = mongoose.connection;


// Create
router.post('/', book_controller.create);

// Get all books
router.get('/', book_controller.get_books);

// Get a book by id
router.get('/:id', book_controller.get_book);


// delete a book
router.delete('/:id', book_controller.delete);

// update a book
router.put('/:id', book_controller.update);



module.exports = router;
