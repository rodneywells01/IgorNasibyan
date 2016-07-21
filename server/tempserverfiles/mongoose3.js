var express = require("express");
var cors = require("cors");
var app = express();

app.use(function(req, res, next) {
	console.log(`Received ${req.method} request for '${req.url}'`);
	next();
});
// Choose where you would like to server static files from. 
app.use(express.static("./")); 
app.use(cors());

// BEGIN DATA ROUTES. 
app.get("/contact-information", function(req, res) {
	// Call res.json(data) to send back data. 
	var data; 


	res.json(data);
});

app.listen(3000);
console.log("Express app running on port 3000");
module.exports = app;

// Database connection 
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert'); 
var mongoose = require('mongoose');

// DB Connection 
var url = "mongodb://107.170.24.17";
mongoose.connect(url, function(error) {
	if(error) {
		console.log(error); 
	}
});


// Courtesy of http://mongoosejs.com/docs/
// Plus http://blog.modulus.io/getting-started-with-mongoose

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

	// Define Schema. 
	var kittySchema = mongoose.Schema({
		name: String // Property 'name' 
	}); 

	kittySchema.methods.speak = function() {
		var greeting = this.name ? "Meow name is " + this.name : "I don't have a name :("; 
		console.log(greeting); 
	};

	// Compile Schema into model. 
	var Kitten = mongoose.model('Kitten', kittySchema); 

	// Model is a class you use to make documents. 
	// Each kitten will be a kitten with properities as declared in Schema. 

	var silence = new Kitten({ name: 'Silence' });
	console.log(silence.name); // Silence

	var fluffy = new Kitten({ name: 'Fluffy'}); 
	fluffy.speak(); 

	// At this point, nothing has been saved yet to MongoDB
	// Any document can be saved by calling its save method. 
	fluffy.save(function(err, fluffy) {
		if(err) return console.error(err); 
		fluffy.speak(); 

		// Display all kittens we've seen. 
		Kitten.find(function(err, kittens) {
			if(err) return console.error(err); 
			console.log("Here are the kittens you have seen so far:"); 
			console.log(kittens);
		});

	});

	
	// Kitten.find({ name: /^Fluff/ }, callback); 


});