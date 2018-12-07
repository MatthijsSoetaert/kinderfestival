const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var async = require('async');

// MODELLEN OPROEPEN
var Nieuwsbrief = require('../models/nieuwsbrief');
var Inschrijving = require('../models/inschrijving');

/* Lijst met alle inschrijvingen tonen */
exports.inschrijvingen_list = function(req, res, next) {
 

	// Indien ingelogd, doorgaan naar pagina
	if (req.isAuthenticated()){
		Inschrijving.find()
			.sort([['achternaamKind', 'ascending']])
			.exec(function (err, list_inschrijvingen) {
			if (err) { return next(err); }
			//Successful, so render
			res.render('inschrijvingen_list', { title: 'Inschrijvingen List', inschrijvingen_list: list_inschrijvingen });
		});
	}
	// Indien niet ingelogd, naar inlogpagina
	else res.redirect('/inloggen');
};

/* GET inschrijven page. */
exports.inschrijven_get = function(req, res) {       
    res.render('inschrijven');
};

/* POST inschrijven page */
exports.inschrijven_post = [

	// Validate fields.
	body('voornaamKind').isLength({ min: 1 }).trim().withMessage('Veld moet ingevuld zijn'),
	body('achternaamKind').isLength({ min: 1 }).trim().withMessage('Veld moet ingevuld zijn'),
	body('leeftijdKind').isLength({ min: 1 }).trim().withMessage('Veld moet ingevuld zijn')
        .isNumeric().withMessage('Leeftijd mag geen letters bevatten'),
	body('voornaamVoogd').isLength({ min: 1 }).trim().withMessage('Veld moet ingevuld zijn'),
    body('achternaamVoogd').isLength({ min: 1 }).trim().withMessage('Veld moet ingevuld zijn'),
	body('emailVoogd').isLength({ min: 1 }).trim().withMessage('Veld moet ingevuld zijn'),
	body('gsmVoogd').isLength({ min: 1 }).trim().withMessage('Veld moet ingevuld zijn')
        .isNumeric().withMessage('GSM-nummer mag geen letters bevatten'),
	body('extra').trim().withMessage('Veld moet niet ingevuld zijn'),
	
    // Sanitize fields (trim verwijdert whiteSpace aan beide kanten van string).
    sanitizeBody('voornaamKind').trim().escape(),
    sanitizeBody('achternaamKind').trim().escape(),
	sanitizeBody('leeftijdKind').trim().escape(),
    sanitizeBody('voornaamVoogd').trim().escape(),
	sanitizeBody('achternaamVoogd').trim().escape(),
    sanitizeBody('emailVoogd').trim().escape(),
    sanitizeBody('gsmVoogd').trim().escape(),
	sanitizeBody('extra').trim().escape(),
	
	// Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('inschrijven');
            return;
        }
        else {
            // Data from form is valid.
			
			/// INSCHRIJVING AANMAKEN///
			var inschrijving = new Inschrijving();
			// request informatie uit velden
			inschrijving.voornaamKind = req.body.voornaamKind;
			inschrijving.achternaamKind = req.body.achternaamKind;
			inschrijving.leeftijdKind = req.body.leeftijdKind;
			inschrijving.extra = req.body.extra;
			if(inschrijving.extra == "")
				inschrijving.extra = "GEEN EXTRA INFORMATIE";
			inschrijving.voornaamVoogd = req.body.voornaamVoogd;
			inschrijving.achternaamVoogd = req.body.achternaamVoogd;
			inschrijving.gsmVoogd = req.body.gsmVoogd;
			inschrijving.emailVoogd = req.body.emailVoogd;
									
			//opslaan in databank
			inschrijving.save(function (err){
				if(err){return next(err);}
			});
			
			/// NIEUWSBRIEF EMAIL AANMAKEN
			// request informatie uit velden (enkel indien persoon expliciet inschrijft)
			if (Boolean(req.body.nieuwsbrief)){
				var nieuwsbrief = new Nieuwsbrief();
				nieuwsbrief.email = inschrijving.emailVoogd;
				nieuwsbrief.save(function (err){
				if(err){return next(err);}
			});
		}				
			// Indien ingelogd, doorgaan naar pagina
			if (req.isAuthenticated())res.redirect('/inschrijvingen');
			else res.redirect('/');
			
        }
    }

];

/* GET 1 specifieke inschrijving page. */
exports.inschrijving_get = function(req, res) {
	
 

	// Indien ingelogd, doorgaan naar pagina
	if (req.isAuthenticated()){
		Inschrijving.findById(req.params.id, function(err, inschrijving){
			// Indien id niet gevonden
			if(err){res.redirect('/inschrijvingen')}
			
			res.render('inschrijving', {
				// Inschrijving meegeven
				inschrijving:inschrijving
			});
		});
	}
	// Indien niet ingelogd, naar inlogpagina
	else res.redirect('/inloggen');
};

/* GET 1 specifieke inschrijving AANPASSEN page. */
exports.inschrijving_aanpassen_get = function(req, res) {

	// Indien ingelogd, doorgaan naar pagina
	if (req.isAuthenticated()){
		Inschrijving.findById(req.params.id, function(err, inschrijving){
			// Indien id niet gevonden
			if(err){res.redirect('/inschrijvingen')}
			
			res.render('inschrijving_aanpassen', {
				// Inschrijving meegeven
				inschrijving:inschrijving
			});
		});
	}
	// Indien niet ingelogd, naar inlogpagina
	else res.redirect('/inloggen');
};

/* POST 1 specifieke inschrijving AANPASSEN page */
exports.inschrijving_aanpassen_post = [

	// Validate fields.
	body('voornaamKind').isLength({ min: 1 }).trim().withMessage('Veld moet ingevuld zijn'),
	body('achternaamKind').isLength({ min: 1 }).trim().withMessage('Veld moet ingevuld zijn'),
	body('leeftijdKind').isLength({ min: 1 }).trim().withMessage('Veld moet ingevuld zijn')
        .isNumeric().withMessage('Leeftijd mag geen letters bevatten'),
	body('voornaamVoogd').isLength({ min: 1 }).trim().withMessage('Veld moet ingevuld zijn'),
    body('achternaamVoogd').isLength({ min: 1 }).trim().withMessage('Veld moet ingevuld zijn'),
	body('emailVoogd').isLength({ min: 1 }).trim().withMessage('Veld moet ingevuld zijn'),
	body('gsmVoogd').isLength({ min: 1 }).trim().withMessage('Veld moet ingevuld zijn')
        .isNumeric().withMessage('GSM-nummer mag geen letters bevatten'),
	
    // Sanitize fields (trim verwijdert whiteSpace aan beide kanten van string).
    sanitizeBody('voornaamKind').trim().escape(),
    sanitizeBody('achternaamKind').trim().escape(),
	sanitizeBody('leeftijdKind').trim().escape(),
    sanitizeBody('voornaamVoogd').trim().escape(),
	sanitizeBody('achternaamVoogd').trim().escape(),
    sanitizeBody('emailVoogd').trim().escape(),
    sanitizeBody('gsmVoogd').trim().escape(),
	sanitizeBody('extra').trim().escape(),
	
	// Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.redirect('/inschrijvingen');
            return;
        }
        else {
            // Data from form is valid.
			
			/// INSCHRIJVING AANMAKEN///
			var inschrijving = {};
			// request informatie uit velden
			inschrijving.voornaamKind = req.body.voornaamKind;
			inschrijving.achternaamKind = req.body.achternaamKind;
			inschrijving.leeftijdKind = req.body.leeftijdKind;
			inschrijving.extra = req.body.extra;
			if(inschrijving.extra == "")
				inschrijving.extra = "GEEN EXTRA INFORMATIE";
			inschrijving.voornaamVoogd = req.body.voornaamVoogd;
			inschrijving.achternaamVoogd = req.body.achternaamVoogd;
			inschrijving.gsmVoogd = req.body.gsmVoogd;
			inschrijving.emailVoogd = req.body.emailVoogd;
									
			//opslaan in databank
			Inschrijving.findByIdAndUpdate({_id:req.params.id}, inschrijving, {}, function (err){
				if(err){return next(err);}
			});
			
			res.redirect('/inschrijvingen/'+inschrijving._id);
			
        }
    }

];

/* POST 1 specifieke inschrijving VERWIJDEREN page */

exports.inschrijving_verwijderen_post = [

	// Process request
    (req, res, next) => {
		console.log('delete');
	 
		// Indien niet ingelogd, doorgaan naar inlogpagina
		if (!req.isAuthenticated())res.redirect('/inloggen');
        
		// Indien ingelogd
		else {
			
			//inschrijving verwijderen			
			Inschrijving.findByIdAndRemove({_id:req.params.id}, function (err){
				if(err){res.redirect('/inschrijvingen');}
			});
			
			res.redirect('/inschrijvingen');
			
        }
    }
    
];







