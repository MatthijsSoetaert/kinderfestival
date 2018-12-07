var express = require('express');
var router = express.Router();

// Require controller modules.
var nieuwsbrief_controller = require('../controllers/nieuwsbriefController');

/* Lijst met alle nieuwsbrieven tonen */
router.get('/nieuwsbrieven', nieuwsbrief_controller.nieuwsbrieven_list);

/* GET registratie page. */
router.get('/nieuwsbrief/registratie', nieuwsbrief_controller.nieuwsbrief_registratie_get);

/* POST registratie page */
router.post('/nieuwsbrief/registratie', nieuwsbrief_controller.nieuwsbrief_registratie_post);

/*nieuwsbrief verwijderen */
router.get('/nieuwsbrief/verwijderen/:email', nieuwsbrief_controller.nieuwsbrief_verwijderen);

module.exports = router;