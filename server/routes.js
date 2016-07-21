var fs = require("fs");

module.exports = function(app, models) {
	// BEGIN DATA ROUTES. 
	app.get("/contact-information", function(req, res) {
		// Call res.json(data) to send back data. 	
		models.ContactModel.find(function(err, docs) {
			if(err) return console.error(err); 	
			res.json(docs);
		});
	});

	app.get('/newspapers', function(req, res) {
		models.NewspaperModel.find(function(err, docs) {
			if(err) return console.error(err); 	
			res.json(docs);
		});
	});

	app.get('/awards', function(req, res) {
		models.AwardsModel.find(function(err, docs) {
			if(err) return console.error(err); 	
			res.json(docs);
		});
	});

	app.get('/artcollection', function(req,res) {
		var fileNames = fs.readdirSync('../app/images/artwork');
		res.json(fileNames);
	});

	// EDIT ROUTES
	app.post('/updateNewspaper', function(req,res) {
		models.NewspaperModel.findById(req.body.id, function(err, element) {		
			updateElement(element, err, req.body, res);
		})
	});

	app.post('/updateAward', function(req,res) {
		models.AwardsModel.findById(req.body.id, function(err, element) {		
			updateElement(element, err, req.body, res);
		})
	});

	app.post('/updateContact', function(req,res) {
		models.ContactModel.findById(req.body.id, function(err, element) {		
			updateElement(element, err, req.body, res);
		})
	});

	return app;
}

function updateElement(element, err, data, res) {
	if (err) { res.json(err); }

	// Update all keys
	Object.keys(data).forEach(function(key) {
		element[key] = data[key];
	});
	
	// Save element. 
	element.save(function(err) {
		if(err) { res.json(err); }
		res.json(element); 
	});	
}

function deleteElement(element, err, res) {

}

function insertElement(element, err, res) {

}