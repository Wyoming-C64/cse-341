// ROOT ROUTES

const routes = require('express').Router();
const contacts = require('./contacts');

routes.get('/', rootCtrl.defaultRoute);
routes.use('/contacts', contacts);

module.exports = routes;