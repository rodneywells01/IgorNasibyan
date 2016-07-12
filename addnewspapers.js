// Database connection 
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert'); 
var mongoose = require('mongoose');

// DB Connection 
var url = "mongodb://107.170.24.17";
mongoose.connect(url, function(error) {
	if(error) {
		console.log(error); 
	} else {
		console.log("DB Connection successful!");
	}
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error! '));
db.once('open', function() {
	var newspaperSchema = mongoose.Schema({
		title: String,
		fileName: String,
		description: String
	});

	var newspaperModel = mongoose.model('Newspaper', newspaperSchema); 

	var newspaper = new newspaperModel({
		title: "DB Newspaper 3",
		fileName: "newpaper3.png",
		description: "This is a test description 3"
	});

	newspaper.save(function(err, paper) {
		if(err) return console.error(err); 
		else {
			console.log("Save successful!");
			console.log(paper);			
		}
	});
});
