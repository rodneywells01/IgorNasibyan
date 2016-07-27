var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');

// DB/Models/Routes
var dbConnection = require('./dbConnection.js');
var models = require('./models.js')(dbConnection);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app = require('./routes.js')(app, models, multer);

// Direct Server Configuration. 
app.use(function(req, res, next) {
	// res.header("Access-Control-Allow-Origin", "http://localhost");
 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");        
	console.log(`Received ${req.method} request for '${req.url}'`);
	next();
});
app.use(express.static("../")); 
module.exports = app;