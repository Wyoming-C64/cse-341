// GET Controller

const mongoDb = require('../db/connect'); // Must connect to DB if not already.
const {ObjectId} = require('mongodb');

const defaultRoute = async(req, res) => {
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

const getData = async (req, res, next) => {
  const result = await mongoDb.getDb().db('ml341_user-db').collection('contacts').find();
  // Convert result to an array, THEN call a function to send data to frontend.
  result.toArray().then(        
    (lists) => {      
      res.setHeader('Content-Type', 'application/json');  // Set the header to tell the client what to expect.
      res.status(200).json(lists);                        // Set HTTP status and return all results from the database.
    }
  );
};

const getOne = async (req, res, next) => {
  const myObjId = new ObjectId(req.params.id);
  // Fetch a single document from the DB, based on the Object ID.
  const result = await mongoDb.getDb().db('ml341_user-db').collection('contacts').findOne( {"_id": myObjId });
  res.setHeader('Content-Type', 'application/json');  // Set the header to tell the client what to expect.
  res.status(200).json(result);                       // Set HTTP status and return only the matching result from the database.
}


module.exports = {
  defaultRoute,
  getData,
  getOne
};