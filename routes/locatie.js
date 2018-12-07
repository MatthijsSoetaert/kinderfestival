var express = require('express');
var router = express.Router();

/* GET locatie page. */
router.get('/locatie', function(req, res, next){
	res.render('locatie');
});

module.exports = router;