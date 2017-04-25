var express = require('express');
var router = express.Router();
var Student = require('../models/student');


// var mongoose = require('mongoose');
// var mongoDB = 'mongodb://127.0.0.1/library'
// mongoose.connect(mongoDB);

// var db = mongoose.connection;


/* GET users listing. */
router.get('/', function(req, res, next) {
  Student.find( {}, (err, students) => {
    if (err) throw err;

    console.log(db);
    console.log(students);
    res.send(students);

  })
});

module.exports = router;
