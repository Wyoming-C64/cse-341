// ROOT ROUTES

const routes = require('express').Router();

const rootCtrl = require('../controllers');
routes.get('/', rootCtrl.defaultRoute);

module.exports = routes;