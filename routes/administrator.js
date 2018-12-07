var express = require('express');
var router = express.Router();

// Require controller modules.
var administrator_controller = require('../controllers/administratorController');
var aantalinschrijvingen_controller = require('../controllers/aantalinschrijvingenController')

/* Lijst met alle administrators tonen */
router.get('/administrators', administrator_controller.administrators_list);

/* GET registratie page. */
router.get('/administrator/registratie', administrator_controller.administrator_registratie_get);

/* POST registratie page */
router.post('/administrator/registratie', administrator_controller.administrator_registratie_post);

/* POST administrator verwijderen */
router.get('/administrator/verwijderen/:id', administrator_controller.administrator_verwijderen);

/* GET beheervenster */
router.get('/administrator/beheer', administrator_controller.administrator_beheer);

router.get('/inschrijving/aantallen', aantalinschrijvingen_controller.aantalinschrijvingen_get);


module.exports = router;