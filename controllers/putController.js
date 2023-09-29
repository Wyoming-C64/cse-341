// PUT Controller

const mongoDb = require('../db/connect'); // Must connect to DB if not already.
const {ObjectId} = require('mongodb');

const putData = async (req, res, next) => {
  console.log(reg.body);
  return true;
};


module.exports = {
  putData
};