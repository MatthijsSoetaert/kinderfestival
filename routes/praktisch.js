var express = require('express');
var router = express.Router();

/* GET praktisch page. */
router.get('/praktisch', function(req, res){
	res.render('praktisch');
});

module.exports = router;