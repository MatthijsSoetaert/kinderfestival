var express = require('express');
var router = express.Router();

// Require controller modules.
var inschrijving_controller = require('../controllers/inschrijvingController');

/* Lijst met alle inschrijvingen tonen */
router.get('/inschrijvingen', inschrijving_controller.inschrijvingen_list);

/* GET inschrijven page. */
router.get('/inschrijven', inschrijving_controller.inschrijven_get);

/* POST inschrijven page */
router.post('/inschrijven', inschrijving_controller.inschrijven_post);

/* GET 1 specifieke inschrijving page. */
router.get('/inschrijvingen/:id', inschrijving_controller.inschrijving_get);

/* POST 1 specifieke inschrijving VERWIJDEREN page */
router.post('/inschrijvingen/:id', inschrijving_controller.inschrijving_verwijderen_post);

/* GET 1 specifieke inschrijving AANPASSEN page. */
router.get('/inschrijvingen/aanpassen/:id', inschrijving_controller.inschrijving_aanpassen_get);

/* POST 1 specifieke inschrijving AANPASSEN page */
router.post('/inschrijvingen/aanpassen/:id', inschrijving_controller.inschrijving_aanpassen_post);

module.exports = router;