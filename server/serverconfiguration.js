var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// DB/Models/Routes
var dbConnection = require('./dbConnection.js');
var models = require('./models.js')(dbConnection);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

passport.use(new LocalStrategy(
	function(username, password, done){
		console.log("Attempting Authentication");
		console.log("Username: " + username);
		console.log("Password: " + password);
		models.UserModel.findOne({ username: username}, function(err, user) {			
			console.log("Finished search!");
			console.log(user);
			if(err) {
				console.log(err);
				return done(err);
			} else if (!user) {
				return done(null, false); 
			} else if (user.password != password) {
				return done(null, false);
			}
			console.log("Success!");
			return done(null, user);
		});
	}
));

passport.serializeUser(function(user, cb) {
	console.log("let's get cereal");
	console.log(user);
  	cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
	console.log("decereal");
	console.log(id);
  	models.UserModel.findById(id, function (err, user) {
    	if (err) { return cb(err); }
    	cb(null, user);
  	});
});

app.use(passport.initialize());
app = require('./routes.js')(app, models, multer, passport);

// Direct Server Configuration. 
app.use(function(req, res, next) {
	// res.header("Access-Control-Allow-Origin", "http://localhost");
 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");        
	console.log(`Received ${req.method} request for '${req.url}'`);
	next();
});
app.use(express.static("../")); 

module.exports = app;