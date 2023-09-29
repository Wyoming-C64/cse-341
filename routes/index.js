const routes = require('express').Router();
const controller = require('../controllers/controller');

routes.get('/', controller.defaultRoute);
routes.get('/contacts', controller.getData);



module.exports = routes;