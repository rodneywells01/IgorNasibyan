var express = require("express");
var app = express();

// Initiate application. 
app.use(function(req, res, next) {
	console.log(`Received ${req.method} request for '${req.url}'`);
	next();
});

// Choose where you would like to server static files from. 
app.use(express.static("./")); 

// app.use(cors());

app.listen(3000);


console.log("Express app running on port 3000");

module.exports = app;

// Database connection 
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert'); 
var mongoose = require('mongoose');

// DB Connection 
var url = "mongodb://107.170.24.17"
mongoose.connect(url, function(error) {
	if(error) {
		console.log(error); 
	}
});

// Schema Definition 
var Schema = mongoose.Schema; 
var UserSchema = new Schema({
	first_name: String, 
	last_name: String, 
	email: String 
}); 

// Model Definition 
var User = mongoose.model('user', UserSchema); 
var instance = new User(); 
console.log(instance);
console.log(User)
instance.first_name = "Rodney";
instance.email = "rodneywells01@gmail.com"; 
instance.last_name = "Swag";
instance.save(function(err) {
	if(err) {
		console.log(err); 
	} else {
		console.log("Success!");	
	}
});
// console.log(User);
User.find({}, function(err, docs) {
	if (err) {
		console.log(err); 
	} else {
		// console.log(docs);
	}
});

// Schemas
// var  