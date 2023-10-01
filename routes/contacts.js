// CONTACTS ROUTES

const routes = require('express').Router();

const contactController = require('../controllers/contactsController');

routes.get('/', contactController.getData);
routes.get('/:id', contactController.getOne);
routes.post('/', contactController.postData);
routes.put('/:id', contactController.putData);
routes.delete('/:id', contactController.deleteData);

module.exports = routes;