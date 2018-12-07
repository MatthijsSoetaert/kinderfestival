var mongoose = require('mongoose');

var inschrijvingSchema = mongoose.Schema({
	voornaamKind:{
		type: String,
		required: true
	},
	achternaamKind:{
		type: String,
		required: true
	},
	leeftijdKind:{
		type: Number,
		required: true
	},
	extra:{
		type: String,
		required: false
	},
	voornaamVoogd:{
		type: String,
		required: true
	},
	achternaamVoogd:{
		type: String,
		required: true
	},
	emailVoogd:{
		type: String,
		required: true
	},	
	gsmVoogd:{
		type: String,
		required: true
	}
}, {collection: 'inschrijvingen'});

var Inschrijving = module.exports = mongoose.model('Inschrijving', inschrijvingSchema);