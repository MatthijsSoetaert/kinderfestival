var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var User = require('../models/user');

module.exports  = function(passport){
	
	// Local Strategy
	passport.use(new LocalStrategy({
		
		// Standaard namen veranderen
		usernameField: 'gebruikersnaam',
		passwordField: 'paswoord'
		
		},
		function(gebruikersnaam, paswoord, done){
		
			// Match gebruikersnaam
			User.findOne({gebruikersnaam:gebruikersnaam}, function(err, user){
				if(err) throw err;
				if(!user){
					return done(null, false);
				}
				// Match paswoord
				bcrypt.compare(paswoord, user.paswoord, function(err, isMatch){
					if(err) throw err;
					// Indien paswoord en gebruikersnaam correct
					if(isMatch){
						return done(null, user);
					} 
					// Indien paswoord en gebruikersnaam niet correct
					else{
						return done(null, false);
					}
				
				});
			});
		})
	);
	
	// Zorgt ervoor dat men ingelogd blijft (zelfde session)
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});
	
	
	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});
	

}