var express = require("express");
var app = express();

app.use(function(req, res, next) {
	console.log(`Received ${req.method} request for '${req.url}'`);
	next();
});

// Choose where you would like to server static files from. 
app.use(express.static("./")); 

// app.use(cors());

app.listen(3000);


console.log("Express app running on port 3000");

module.exports = app;