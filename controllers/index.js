// DELETE Controller

const mongoDb = require('../db/connect'); // Must connect to DB if not already.
const {ObjectId} = require('mongodb');

const defaultRoute = async(req, res) => {
  res.setHeader('Content-Type', 'text/html');  // Set the header to tell the client what to expect.
  res.status(200);
  res.send(
    "<!DOCTYPE html>" +
    "<html>" +
    " <head>" +
    "   <title>Mike's Contacts API version 0.3</title>" +
    " </head>" +
    " <body>" +
    "   <pre>Mike's Contacts API version 0.3</pre>" +
    " </body>" +
    "</html>"
  );
}

module.exports = {
  defaultRoute
};