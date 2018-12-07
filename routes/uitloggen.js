var express = require('express');
var router = express.Router();

/* GET home page. + UITLOGGEN */
router.get('/uitloggen', function(req, res, next){
	// Controleren of gebruiker ingelogd is
	console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
	// Indien ingelogd, uitloggen en naar homepagina gaan
	if (req.isAuthenticated()) req.logout();
	res.redirect('/');
});

module.exports = router;
