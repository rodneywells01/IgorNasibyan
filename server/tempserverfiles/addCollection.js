/* CHANGE */
var modelName = 'Award';
var numInsertions = 1;



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
	var schema = mongoose.Schema({
		username: String,
		password: String
	});


	var Model = mongoose.model('User', schema); 
	var i = 0;
	for (i = 0; i < numInsertions; i++ ) {
		var document = new Model({
			username: "rodneywells01",
			password: "justham9",			
		});	

		document.save(function(err, document) {
			if(err) return console.error(err); 
			else {
				console.log("Save successful!");
				// console.log(paper);			
			}
		});
	}

	
});
