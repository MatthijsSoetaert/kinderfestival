var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Zorgt voor de compressie
var compression = require('compression');

// Zorgt voor bescherming tegen gekende vulnerabilities
var helmet = require('helmet');

// Zorgt voor gebruik sessions
var session = require("express-session");

// Bodyparser voor HTML form
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

// login database 
var passport = require('passport');

var app = express();

// ROUTES OPROEPEN
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var praktischRouter = require('./routes/praktisch');
var locatieRouter = require('./routes/locatie');
var inschrijvenRouter = require('./routes/inschrijven');
var inlogRouter = require('./routes/inloggen');
var uitlogRouter = require('./routes/uitloggen');
var administratorRouter = require('./routes/administrator');
var nieuwsbriefRouter = require('./routes/nieuwsbrief');

//Set up mongoose connection inschrijving
var mongoose = require('mongoose');
var mongoDB = 'mongodb://dbUser:dbPassword0@ds119374.mlab.com:19374/kinderfestival';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

// SESSIONS + BODYPARSER MIDDLEWARE
// Sessions gebruiken
app.use(session({
    secret: "randomSessionSecret",
    resave: false,				// Zorgt voor saving session zelfs indien onveranderd
    saveUninitialized: true,	// Zorgt voor storing session indien uninitialized 
	cookie: {
        secure: false,	//HTTPS nodig
        maxAge: 3600000 //1 hour
    }
}));
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// Passport Config
require('./config/passport')(passport);
// Passport Middleware voor sessions
app.use(passport.initialize());
app.use(passport.session());

// Compressie en beveiliging 
app.use(compression());
app.use(helmet());


// Globale variabele definiëren om view te veranderen bij inloggen
app.get('*', function(req, res, next){
	res.locals.user = req.user;
	next();
});

// BOOTSTRAP GEBRUIKEN
app.use('/bootstrapcss', express.static(__dirname + '/node_modules/bootstrap/dist/css/'))
app.use('/bootstrapjs', express.static(__dirname + '/node_modules/bootstrap/dist/js/'))
app.use('/popperjs', express.static(__dirname + '/node_modules/popper.js/dist/'))

// ROUTERS GEBRUIKEN
app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', praktischRouter);
app.use('/', locatieRouter);
app.use('/', inschrijvenRouter);
app.use('/', inlogRouter);
app.use('/', uitlogRouter);
app.use('/', administratorRouter);
app.use('/', nieuwsbriefRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
