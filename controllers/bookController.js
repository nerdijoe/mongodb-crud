var Book = require('../models/book');



exports.create = (req, res, next) => {
  var newBook = Book({
    isbn: req.body.isbn,
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    stock: req.body.stock
  });

  newBook.save( (err, book) => {
    if (err) res.send(err);
    console.log(`book ${book.isbn} is created.`);
    res.send(book);
  })
}

exports.get_books = (req, res, next) => {
  Book.find( (err, books) => {
    if (err) res.send(err);
    res.send(books);
  })
}

exports.get_book = (req, res, next) => {
  Book.find({_id: req.params.id } , (err, book) => {
    if (err) res.send(err);
    res.send(book);
  })
}

exports.delete = (req, res, next) => {
  Book.findByIdAndRemove(req.params.id, (err, book) => {
    var message = {
      message: "Book has been deleted successfully.",
      id: book._id
    };
    res.send(message);
  })
}

exports.update = (req, res, next) => {
  Book.findById(req.params.id, (err, book) => {
    if (err) res.send(err);

    book.isbn = req.body.isbn || book.isbn;
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.category = req.body.category || book.category;
    book.stock = req.body.stock || book.stock;

    // after updating the attributes, we need to save it
    book.save( (err, book) => {
      if (err) res.send(err);

      res.send(book);
    })

  })
}

//
