var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require('body-parser');

// DB/Models/Routes
var dbConnection = require('./dbConnection.js');
var models = require('./models.js')(dbConnection);
require('./routes.js')(app, models);

// Direct Server Configuration. 
app.use(function(req, res, next) {
	console.log(`Received ${req.method} request for '${req.url}'`);
	next();
});
app.use(express.static("../")); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(cors());

module.exports = app;