// GET Controller

const mongoDb = require('../db/connect'); // Must connect to DB if not already.
const {ObjectId} = require('mongodb');

/////// GET ///////
const getData = async (req, res, next) => {
  const result = await mongoDb.getDb()
    .db('ml341_user-db')
    .collection('contacts')
    .find();
  
    // Convert result to an array, THEN call a function to send data to frontend.
  result.toArray().then(        
    (lists) => {      
      res.setHeader('Content-Type', 'application/json');  
      res.status(200).json(lists); // 200 OK
    }
  );
};

const getOne = async (req, res, next) => {
  const myObjId = new ObjectId(req.params.id);
  // Fetch a single document from the DB, based on the Object ID.
  const result = await mongoDb.getDb()
    .db('ml341_user-db')
    .collection('contacts')
    .findOne( {"_id": myObjId });
  res.setHeader('Content-Type', 'application/json');  
  res.status(200).json(result);  // 200 OK          
}

/////// POST ///////
const postData = async (req, res) => {
  const dbResult = mongoDb.getDb().db('ml341_user-db').collection('contacts').insertOne(
    req.body
  );   
  dbResult.then( 
    (resultData) => {
      console.log(resultData) 
      res.setHeader('Content-Type', 'application/json'); 
      res.status(201).json(resultData);  // 201 CREATED
    }
  );
  
    
};

/////// PUT ///////
const putData = async (req, res, next) => {
  const myObjId = new ObjectId(req.params.id);
  const dbResult = mongoDb.getDb()
    .db('ml341_user-db')
    .collection('contacts')
    .findOneAndUpdate(
      {"_id": myObjId },
      { $set : req.body }
  );   
  dbResult.then( 
    (resultData) => {
      const response = resultData.ok === 1 ? {
        responseText: "OK",
        responseCode: 200
      } : {
        responseText: "Error updating document.",
        responseCode: 500
      };
      console.log(response) 
      res.setHeader('Content-Type', 'application/json'); 
      res.status(response.responseCode).json(response);
    }
  );
};


/////// DELETE ///////
const deleteData = async (req, res, next) => {
  console.log("DELETE");
  console.log(req.body);
  return true;
};

module.exports = {
  getData,
  getOne,
  postData,
  putData,
  deleteData
};