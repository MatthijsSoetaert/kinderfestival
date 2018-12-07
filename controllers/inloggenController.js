var express = require('express');
var bcrypt = require('bcryptjs');
var passport = require('passport');

// MODELLEN OPROEPEN
var User = require('../models/user');

/* GET inloggen page. */
exports.inloggen_get = function(req, res) {  
    res.render('inloggen');
};

/* POST inloggen page */
exports.inloggen_post = [
		
	// Process request
	passport.authenticate('local', {
		successRedirect:'/administrator/beheer',
		failureRedirect:'/inloggen'
	})
];


