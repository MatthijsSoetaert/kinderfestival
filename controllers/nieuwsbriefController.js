const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var async = require('async');
var bcrypt = require('bcryptjs');

// MODELLEN OPROEPEN
var Nieuwsbrief = require('../models/nieuwsbrief');

/* Lijst met alle nieuwsbrieven tonen */
exports.nieuwsbrieven_list = function(req, res, next) {
	// Controleren of gebruiker ingelogd is
	console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
	// Indien ingelogd, doorgaan naar pagina
	if (req.isAuthenticated()){
		Nieuwsbrief.find()
			.sort([['email', 'ascending']])
			.exec(function (err, list_nieuwsbrieven) {
			if (err) { return next(err); }
			//Successful, so render
			res.render('nieuwsbrieven_list', { title: 'Nieuwsbrieven List', nieuwsbrieven_list: list_nieuwsbrieven });
		});
	}
	// Indien niet ingelogd, naar inlogpagina
	else res.redirect('/inloggen');

};

/* GET registratie page. */
exports.nieuwsbrief_registratie_get = function(req, res, next) {    
	// Controleren of gebruiker ingelogd is
	console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
	// Indien ingelogd, doorgaan naar pagina
	if (req.isAuthenticated()) res.render('nieuwsbrief_registratie');
	// Indien niet ingelogd, naar inlogpagina
	else res.redirect('/inloggen');  
};

/* POST registratie page */
exports.nieuwsbrief_registratie_post = [
	
	// Process request after validation and sanitization.
    (req, res, next) => {
		
        // Extract the validation errors from a request.
        const errors = validationResult(req);
		
		// Validate fields.
		

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('nieuwsbrief_registratie');
            return;
        }
        else {
            // Data from form is valid.
			
			/// REGISTRATIE AANMAKEN///
			var nieuwsbrief = new Nieuwsbrief();
			// request informatie uit velden
			nieuwsbrief.email = req.body.email;
			
			//opslaan in databank
			nieuwsbrief.save(function (err){
				if(err){return next(err);}
			});
				
			/// TERUG NAAR nieuwsbrief LIJST
			res.redirect('/nieuwsbrieven');
			
        }
    }

];

/* nieuwsbrief verwijderen */

exports.nieuwsbrief_verwijderen = [

	// Process request
    (req, res, next) => {
		console.log('delete');
		// Controleren of gebruiker ingelogd is
		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
		// Indien niet ingelogd, doorgaan naar inlogpagina
		if (!req.isAuthenticated())res.redirect('/inloggen');
        
		// Indien ingelogd
		else {
			
			//administrator verwijderen			
			Nieuwsbrief.find({email:req.params.email}).remove().exec(function (err){
				if(err){res.redirect('/nieuwsbrieven');}
			});
			
			res.redirect('/nieuwsbrieven');
			
        }
    }
    
];
