var mongoose = require('mongoose');

//userSchema
var userSchema = mongoose.Schema({
	gebruikersnaam:{
		type: String,
		required: true
	},
	paswoord:{
		type: String,
		required: true
	}
}, {collection: 'gebruikers'});

var User = module.exports = mongoose.model('User', userSchema);