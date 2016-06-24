// http://expressjs.com/en/guide/database-integration.html#mongo
var MongoClient = require('mongodb').MongoClient;

var dbUrl = "";
var tableName = "";
MongoClient.connect(dbUrl, function(err, db) {
	if(err) {
		throw err;
	}
	db.collection(tableName).find().toArray(function(err, result) {
		if (err) {
			throw err; 
		}
		console.log(result); 
		// Seems like result holds your data. 
		// A note: Mongoose is an OOP framework for Mongo. 
	});
});