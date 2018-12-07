var mongoose = require('mongoose');

// nieuwsbrief Schema
var nieuwsbriefSchema = mongoose.Schema({
	email:{
		type: String,
		required: true
	}
}, {collection: 'nieuwsbrief'});

var Nieuwsbrief = module.exports = mongoose.model('Nieuwsbrief', nieuwsbriefSchema); 