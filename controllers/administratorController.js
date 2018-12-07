const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var async = require('async');
var bcrypt = require('bcryptjs');

// MODELLEN OPROEPEN
var User = require('../models/user');

/* Lijst met alle administrators tonen */
exports.administrators_list = function(req, res, next) {

	// Indien ingelogd, doorgaan naar pagina
	if (req.isAuthenticated()){
		User.find()
			.sort([['gebruikersnaam', 'ascending']])
			.exec(function (err, list_administrators) {
			if (err) { return next(err); }
			//Successful, so render
			res.render('administrators_list', { title: 'Administrator List', administrators_list: list_administrators });
		});
	}
	// Indien niet ingelogd, naar inlogpagina
	else res.redirect('/inloggen');

};

/* administrator verwijderen */

exports.administrator_verwijderen = [

	// Process request
    (req, res, next) => {
		console.log('delete');

		// Indien niet ingelogd, doorgaan naar inlogpagina
		if (!req.isAuthenticated())res.redirect('/inloggen');
        
		// Indien ingelogd
		else {
			
			//administrator verwijderen			
			User.findByIdAndRemove({_id:req.params.id}, function (err){
				if(err){res.redirect('/administrators');}
			});
			
			res.redirect('/administrators');
			
        }
    }
    
];


/* GET beheer page. */
exports.administrator_beheer = function(req, res, next) {    

	// Indien ingelogd, doorgaan naar pagina
	if (req.isAuthenticated()) res.render('beheerVenster');
	// Indien niet ingelogd, naar inlogpagina
	else res.redirect('/inloggen');  
};


/* GET registratie page. */
exports.administrator_registratie_get = function(req, res, next) {    
	// Controleren of gebruiker ingelogd is

	// Indien ingelogd, doorgaan naar pagina
	if (req.isAuthenticated()) res.render('administrator_registratie');
	// Indien niet ingelogd, naar inlogpagina
	else res.redirect('/inloggen');  
};

/* POST registratie page */
exports.administrator_registratie_post = [
	
	// Process request after validation and sanitization.
    (req, res, next) => {
		
        // Extract the validation errors from a request.
        const errors = validationResult(req);
		
		// Validate fields.
		

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('administrator_registratie');
            return;
        }
        else {
            // Data from form is valid.
			
			/// REGISTRATIE AANMAKEN///
			var user = new User();
			// request informatie uit velden
			user.gebruikersnaam = req.body.gebruikersnaam;
			user.paswoord = req.body.paswoord;
			
			// Paswoord omzetten in hash
			bcrypt.genSalt(10, function(err, salt){
				bcrypt.hash(user.paswoord, salt, function(err, hash){
					if(err){
						console.log(err);
					}
					user.paswoord = hash;
				
					// Registratie in databank
					user.save(function (err){
						if(err){return next(err);}
					});
				});
			});
				
			/// TERUG NAAR ADMINISTRATOR LIJST
			res.redirect('/administrators');
			
        }
    }

];
