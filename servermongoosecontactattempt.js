// Database connection 
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert'); 
var mongoose = require('mongoose');

var contactSchema = mongoose.Schema({
	email: String,
	location: String,
	mobilePhone: String,
	homePhone: String, 
	socialYouTube: String,
	socialFacebook: String,
	socialTwitter: String,
	socialLinkedIn: String
});
var ContactModel = mongoose.model('Contact', contactSchema); 

// DB Connection 
var url = "mongodb://107.170.24.17";
mongoose.connect(url, function(error) {
	if(error) {
		console.log(error); 
	} else {
		console.log("DB Connection successful!");
	}
});

// Server Instantiation. 
var express = require("express");
var cors = require("cors");
var app = express();

app.use(function(req, res, next) {
	console.log(`Received ${req.method} request for '${req.url}'`);
	next();
});
app.use(express.static("./")); 
app.use(cors());

// BEGIN DATA ROUTES. 
app.get("/contact-information", function(req, res) {
	// Call res.json(data) to send back data. 	
	ContactModel.find(function(err, docs) {
		if(err) return console.error(err); 	
		res.json(docs);
	});
	console.log(res);
	
});
app.listen(3000);
console.log("Express app running on port 3000");
module.exports = app;
