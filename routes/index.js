const routes = require('express').Router();
const controller = require('../controllers/controller');

routes.get('/', controller.defaultRoute);
routes.get('/contacts', controller.getData);
routes.get('/contacts/:id', controller.getOne);



module.exports = routes;