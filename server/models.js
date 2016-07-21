module.exports = function(mongoose) {
	var contactSchema = mongoose.Schema({
		email: String,
		location: String,
		mobilePhone: String,
		homePhone: String, 
		socialYouTube: String,
		socialFacebook: String,
		socialTwitter: String,
		socialLinkedIn: String
	});
	var ContactModel = mongoose.model('Contact', contactSchema); 

	var newspaperSchema = mongoose.Schema({
		title: String,
		fileName: String,
		description: String
	});
	var NewspaperModel = mongoose.model('Newspaper', newspaperSchema); 

	var awardsSchema = mongoose.Schema({
		title: String,
		fileName: String,
		description: String
	});
	var AwardsModel = mongoose.model('Award', awardsSchema); 

	var models = {
		'AwardsModel': AwardsModel,
		'NewspaperModel': NewspaperModel,
		'ContactModel': ContactModel
	};

	return models;
}