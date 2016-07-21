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

	var contactPage = new ContactModel({
		email: "rodneywells01@gmail.com", 		
		location: "12685 Arbuckle Road",
		mobilePhone: "814-823-4579",
		homePhone: "814-739-9317", 
		socialYouTube: "www.youtube.com",
		socialFacebook: "www.facebook.com",
		socialTwitter: "www.twitter.com",
		socialLinkedIn: "www.linkedin.com"
	});

	contactPage.save(function(err, cpage) {
		if(err) return console.error(err); 
		
		console.log("Save success!"); 
		console.log(cpage); 

		ContactModel.find(function(err, cpage) {
			if(err) return console.error(err); 
			console.log("Contact pages found! Should only be one!"); 
			console.log(cpage); 
		});
	})

});