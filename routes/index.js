// ROUTES

const routes = require('express').Router();

const getController = require('../controllers/getController');
const postController = require('../controllers/postController');
const putController = require('../controllers/putController');
const deleteController = require('../controllers/deleteController');

routes.get('/', getController.defaultRoute);
routes.get('/contacts', getController.getData);
routes.get('/contacts/:id', getController.getOne);

module.exports = routes;