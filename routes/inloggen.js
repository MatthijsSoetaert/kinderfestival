var express = require('express');
var router = express.Router();

// Require controller modules.
var inloggen_controller = require('../controllers/inloggenController');

/* GET login page. */
router.get('/inloggen', inloggen_controller.inloggen_get);

/* POST login page */
router.post('/inloggen', inloggen_controller.inloggen_post);


module.exports = router;