// ROOT ROUTES

const routes = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swaggerDoc.json');

const rootCtrl = require('../controllers');
const contacts = require('./contacts');

// API Documentation
routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));


// All other routes
routes.get('/', rootCtrl.defaultRoute);
routes.use('/contacts', contacts);

module.exports = routes;