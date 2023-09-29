// DELETE Controller

const mongoDb = require('../db/connect'); // Must connect to DB if not already.
const {ObjectId} = require('mongodb');

const deleteData = async (req, res, next) => {
  console.log(req.body);
  return true;
};


module.exports = {
  deleteData
};