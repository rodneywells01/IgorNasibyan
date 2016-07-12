// Database connection 
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert'); 
var mongoose = require('mongoose');

/* Begin Schema/Model Definition */
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
var newspaperSchema = mongoose.Schema({
	title: String,
	fileName: String,
	description: String
});
var NewspaperModel = mongoose.model('Newspaper', newspaperSchema); 
var awardsSchema = mongoose.Schema({
	title: String,
	fileName: String,
	description: String
});
var AwardsModel = mongoose.model('Award', awardsSchema); 
/* END Schema/Model Definition */

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

var fs = require("fs");
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

app.get('/newspapers', function(req, res) {
	NewspaperModel.find(function(err, docs) {
		if(err) return console.error(err); 	
		res.json(docs);
	});
	console.log(res);
});

app.get('/awards', function(req, res) {
	AwardsModel.find(function(err, docs) {
		if(err) return console.error(err); 	
		res.json(docs);
	});
	console.log(res);
});

app.get('/artcollection', function(req,res) {
	var fileNames = fs.readdirSync('./app/images/artwork');
	console.log(fileNames);
});

/* END DATA ROUTES */

app.listen(3000);
console.log("Express app running on port 3000");
module.exports = app;
