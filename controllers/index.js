// ROOT Controller
const About = require('../about');

const defaultRoute = async(req, res) => {
  res.setHeader('Content-Type', 'text/html');  // Set the header to tell the client what to expect.
  res.status(200);
  res.send(
    "<!DOCTYPE html>" +
    "<html>" +
    " <head>" +
    "   <title>" + About.name + " version " + About.version + "</title>" +
    " </head>" +
    " <body>" +
    "   <pre>" + About.name + " version " + About.version + "</pre>" +
    " </body>" +
    "</html>"
  );
}

module.exports = {
  defaultRoute
};