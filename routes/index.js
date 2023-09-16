const routes = require('express').Router();
const familyController = require('../controllers/familycontrol');
 
routes.get('/me', familyController.mikeRoute);
routes.get('/', familyController.cariRoute);
routes.get('/oldest-girl', familyController.melRoute);
routes.get('/oldest-boy', familyController.bradenRoute);
routes.get('/youngest-boy', familyController.chrisRoute);
routes.get('/youngest-girl', familyController.haelieRoute);

module.exports = routes;