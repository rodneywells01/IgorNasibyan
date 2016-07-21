// DB Connection 
var mongoose = require('mongoose')

var url = "mongodb://107.170.24.17:27017/test";
mongoose.connect(url, function(error) {
	if(error) {
		console.log("Mongoose connection error");
		console.log(error); 
	} else {
		console.log("DB Connection successful!");
	}
});

module.exports = mongoose;