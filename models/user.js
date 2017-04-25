var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
  studentId: Number,
  name: String,
  address: String,
  department: String

});

var User = mongoose.model('User', userSchema);

module.exports = User;
