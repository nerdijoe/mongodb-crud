var Book = require('../models/book');

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1/library';

var ObjectId = require('mongodb').ObjectID;


exports.create = (req, res, next) => {
  MongoClient.connect(url, (err, db) => {
    var collection = db.collection('books');

    collection.insertMany([
      {
        isbn: "978-1-60309-057-5",
        title: "Dragon Puncher",
        author: "James Kochalka",
        category: "All Ages",
        stock: 3
      },
      {
        isbn: "978-1-891830-77-8",
        title: "Every Girl is the End of the World for Me",
        author: "Jeffrey Brown",
        category: "Mature (16+)",
        stock: 5
      }
    ], (err, result) => {
      if(err) res.send(err);
      db.close();
      res.send(result);
    })
  }) // end of MongoClient.connect


}

//
// exports.create = (req, res, next) => {
//   var newBook = Book({
//     isbn: req.body.isbn,
//     title: req.body.title,
//     author: req.body.author,
//     category: req.body.category,
//     stock: req.body.stock
//   });
//
//   newBook.save( (err, book) => {
//     if (err) res.send(err);
//     console.log(`book ${book.isbn} is created.`);
//     res.send(book);
//   })
// }
//


exports.get_books = (req, res, next) => {

  MongoClient.connect(url, (err, db) => {
    var collection = db.collection('books');
    collection.find().toArray((err, books) => {
      if(err) res.send(err);
      db.close();
      res.send(books);
    })
  })

}

// exports.get_books = (req, res, next) => {
//   Book.find( (err, books) => {
//     if (err) res.send(err);
//     res.send(books);
//   })
// }



exports.get_book = (req, res, next) => {
  console.log(`get_book: ${req.params.id}`);
  MongoClient.connect(url, (err, db) => {
    var collection = db.collection('books');
    collection.find({_id: new ObjectId(req.params.id)}).toArray((err, book) => {
      if(err) res.send(err);
      db.close();
      res.send(book);
    })
  })
}


// exports.get_book = (req, res, next) => {
//   Book.find({_id: req.params.id } , (err, book) => {
//     if (err) res.send(err);
//     res.send(book);
//   })
// }

exports.delete = (req, res, next) => {
  MongoClient.connect(url, (err, db) => {
    var collection = db.collection('books');
    collection.deleteOne({_id: new ObjectId(req.params.id)}, (err, row) => {
      if(err) res.send(err);
      db.close();
      res.send(row);
    })
  })
}

// exports.delete = (req, res, next) => {
//   Book.findByIdAndRemove(req.params.id, (err, book) => {
//     var message = {
//       message: "Book has been deleted successfully.",
//       id: book._id
//     };
//     res.send(message);
//   })
// }



exports.update = (req, res, next) => {

  MongoClient.connect(url, (err, db) => {
    var collection = db.collection('books');
    collection.findOneAndUpdate (
      {_id: new ObjectId(req.params.id)},
      {$set: {isbn: req.body.isbn, title: req.body.title, author: req.body.author, category: req.body.category, stock: req.body.stock}},
      (err, r) => {
        if(err) res.send(err);
        db.close();
        res.send(r);
      }
    )
  })
}

// exports.update = (req, res, next) => {
//   Book.findById(req.params.id, (err, book) => {
//     if (err) res.send(err);
//
//     book.isbn = req.body.isbn || book.isbn;
//     book.title = req.body.title || book.title;
//     book.author = req.body.author || book.author;
//     book.category = req.body.category || book.category;
//     book.stock = req.body.stock || book.stock;
//
//     // after updating the attributes, we need to save it
//     book.save( (err, book) => {
//       if (err) res.send(err);
//
//       res.send(book);
//     })
//
//   })
// }

//
