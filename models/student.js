var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
  studentId: Number,
  name: String,
  address: String,
  department: String

});

var Student = mongoose.model('Student', userSchema);

module.exports = Student;
