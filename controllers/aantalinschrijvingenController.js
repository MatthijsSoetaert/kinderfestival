var Inschrijving = require('../models/inschrijving');

exports.aantalinschrijvingen_get = function(req,res,next){
    Inschrijving.count({},function(err, count){
        res.json(count);
    }); 
}