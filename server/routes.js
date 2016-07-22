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
		console.log(req.body);
		models.AwardsModel.findById(req.body.id, function(err, element) {		
			updateElement(element, err, req.body, res);
		})
	});

	app.post('/updateContact', function(req,res) {
		models.ContactModel.findById(req.body.id, function(err, element) {		
			updateElement(element, err, req.body, res);
		})
	});

	// Insert Routes
	app.post('/insertAward', function(req, res) {
		insertElement(models.AwardsModel, req.body, res)
	});

	app.post('/insertNewspaper', function(req, res) {
		insertElement(models.NewspaperModel, req.body, res)
	});

	// Delete Routes
	app.post('/deleteAward', function(req, res) {
		deleteElement(models.AwardsModel, req.body.id, res)
	});

	app.post('/deleteNewspaper', function(req, res) {
		console.log(req.body);
		deleteElement(models.NewspaperModel, req.body.id, res)
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

function deleteElement(Model, id, res) {
	console.log("In node! " + id);
	Model.find({ _id: id}).remove(function(err, data) {
		if (err) { res.json(err) }
		res.json(data);
	});
}

function insertElement(Model, data, res) {
	var document = new Model(data);	
	document.save(function(err, document) {
		if(err) { res.json(err) };
		res.json(data); 
	});
}