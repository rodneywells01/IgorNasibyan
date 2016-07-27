var fs = require("fs");

module.exports = function(app, models, multer) {
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
		models.NewspaperModel.findById(req.body._id, function(err, element) {		
			updateElement(element, err, req.body, res);
		})
	});

	app.post('/updateAward', function(req,res) {
		console.log(req.body);
		console.log(req.body.id);
		models.AwardsModel.findById(req.body._id, function(err, element) {	
			console.log(req.body);
			console.log(element);	
			updateElement(element, err, req.body, res);
		})
	});

	app.post('/updateContact', function(req,res) {
		models.ContactModel.findById(req.body.id, function(err, element) {		
			if (err) {
				console.log("ERROR: Could not find element in DB!");
				console.log(element);
			}
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
		deleteElement(models.NewspaperModel, req.body.id, res)
	});

	// Upload Routes
	app.post('/uploadAward', function(req, res) {
		saveFile("award", req, res, multer);
	});

	app.post('/uploadNewspaper', function(req, res) {
		console.log("Hit backend!");
		saveFile("newspaper", req, res, multer);
	});

	app.post('/uploadArt', function(req, res) {
		saveFile("artwork", req, res, multer);
	});

	return app;
}

function saveFile(area, req, res, multer) {
	var uploader = multer({
		storage: configureStorage(multer, area)
	}).single('file');

    uploader(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
         res.json({error_code:0,err_desc:null});
    });
} 

function configureStorage(multer, location) {
	return multer.diskStorage({
		destination: function(req, file, cb) {			
			cb(null, '../app/images/' + location + "/");
		},
		filename: function(req, file, cb) {
			var datetimestamp = Date.now();
			cb(null, file.originalname);
		}
	});
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
	Model.find({ _id: id}).remove(function(err, data) {
		if (err) { res.json(err) }
		res.json(data);
	});
}

function insertElement(Model, data, res) {
	var document = new Model(data);	
	document.save(function(err, data) {
		if(err) { res.json(err) };
		res.json(data); 
	});
}