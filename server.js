// Database connection 
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert'); 
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
console.log(bodyParser);


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
var url = "mongodb://107.170.24.17:27017/test";
mongoose.connect(url, function(error) {
	if(error) {
		console.log("Mongoose connection error");
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
// app.use(express.json()); 
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
	console.log(fileNames)
	res.json(fileNames);
});

// EDIT ROUTES
app.post('/updateNewspaper', function(req,res) {
	NewspaperModel.findById(req.body.id, function(err, element) {		
		updateElement(element, err, req.body, res);
	})
});

app.post('/updateAward', function(req,res) {
	console.log("Made it to server!");
	AwardsModel.findById(req.body.id, function(err, element) {		
		updateElement(element, err, req.body, res);
	})
});

app.post('/updateContact', function(req,res) {
	ContactModel.findById(req.body.id, function(err, element) {		
		updateElement(element, err, req.body, res);
	})
});


function updateElement(element, err, data, res) {
	if (err) { res.json(err); }

	// Update all keys
	Object.keys(data).forEach(function(key) {
		element[key] = data[key];
	});
	
	// Save element. 
	element.save(function(err) {
		if(err) { res.json(err); }
		res.json(element); 
	});	
}

function deleteElement(element, err, res) {

}

function insertElement(element, err, res) {

}
		

/* END DATA ROUTES */

app.listen(3000);
console.log("Express app running on port 3000");
module.exports = app;
