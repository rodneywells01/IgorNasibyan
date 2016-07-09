// Database connection 
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert'); 

var url = "mongodb://107.170.24.17"

MongoClient.connect(url, function(err, db){
	assert.equal(null, err); 
	console.log("Connected correctly to the server!");

	// insertDocuments(db, function() {
	// 	db.close();	
	// });

	findDocuments(db, function() {
		
	});	db.close();
});

var insertDocuments = function(db, callback) {
	// Get document collection 
	var collection = db.collection('documents'); 

	// Insert some documents. 
	collection.insertMany([
		{ a: 1}, {a: 2}, {a: 3}
	], function(err, result) {
		assert.equal(err, null); 
		assert.equal(3, result.result.n); 
		assert.equal(3, result.ops.length);
		console.log("Inserted 3 documents into the document collection"); 
		callback(result); 
	});
};

var findDocuments = function(db, callback) {
	var collection = db.collection('documents'); 

	collection.find({}).toArray(function(err, docs) {
		assert.equal(err, null);
		// assert.equal(2, docs.length); 
		console.log("Here are the docs:");
		console.log(docs);
		callback(docs);

		// var i = 0; 
		// var keys;
		// for (i=0; i < docs.length; i++) {
		// 	console.log(docs[i]);
		// 	console.log(Object.keys(docs[i]));
		// 	keys = Object.keys(docs[i]).slice(1);
		// 	console.log(keys);
		// }

	});
}

var updateDocument = function(db, callback) {
	// Get the documents collection 
	var collection = db.collection('documents')l 

	collection.updateOne({ a : 2}, { $set: { b : 1} }, function(err, result) {
		assert.equal(err, null);
		assert.equal(1, result.result.n); 
		console.log("Updated the document!");
		callback(result);
	});
};

var deleteDocument = function(db, callback) {
	// Get the documents collection 
	var collection = db.connection('documents');

	collection.deleteOne({a : 3}, function(err, result) {
		assert.equal(err, null); 
		assert.equal(1, result.result.n); 
		console.log("Removed the document with the field a equal to 3");
		callback(result); 
	});
}