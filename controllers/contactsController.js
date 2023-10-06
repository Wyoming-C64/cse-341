// GET Controller

const mongoDb = require('../db/connect'); // Must connect to DB if not already.
const {ObjectId} = require('mongodb');

/////// GET ///////
const getData = async (req, res, next) => {
  /*
    #swagger.summary = 'Return all contacts.'
    #swagger.description = 'Returns all contacts in the collection, no filtering.'
  */
  
  const result = await mongoDb.getDb()
    .db('ml341_user-db')
    .collection('contacts')
    .find();
  
    // Convert result to an array, THEN call a function to send data to frontend.
  result.toArray()
  .then( (lists) => {
    /*
      #swagger.responses[200] = {
        description: "All contacts successfully fetched and returned in an array.",
        schema: [{
          _id: '650f75b50809019a9a2fb6fe',
          firstName: 'Mike',
          lastName: 'Lewis',
          email: 'mikelewis@email.com',
          favoriteColor: 'Redd',
          birthday: 'May 5'
        }]
      }
    */
    res.setHeader('Content-Type', 'application/json');  
    res.status(200).json(lists); 
    
  })
  .catch( (err) => {
    /*
      #swagger.responses[500] = {
        description: 'ERROR - Internal server or database error.'
      }
    */
    res.status(500).send({
      message: err.message || 'Unknown error while accessing database.',
    });
  });
};

const getOne = async (req, res, next) => {
  /*  #swagger.summary = 'Get a single contact.'
      #swagger.description = 'Returns a single contact identified by ID.'
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'A valid and unique ID for the contact.',
        type: 'objectId',
        format: 'hex',
      }
  */

  const myObjId = new ObjectId(req.params.id);
  console.log(myObjId);

  const result = await mongoDb.getDb()
    .db('ml341_user-db')
    .collection('contacts')
    .findOne( {"_id": myObjId })
    .catch( (err) => {
      /*
      #swagger.responses[500] = {
        description: 'ERROR - Internal server or database error.'
      }
    */
      res.status(500).send({
        message: err.message || 'Internal server or database error.',
      })
    });
  
  if (result) {
    /*
      #swagger.responses[200] = {
        description: "A single contact with matching ID successfully fetched and returned.",
        schema: {
          _id: '650f75b50809019a9a2fb6fe',
          firstName: 'Mike',
          lastName: 'Lewis',
          email: 'mikelewis@email.com',
          favoriteColor: 'Redd',
          birthday: 'May 5'
        }
      }
    */
    res.setHeader('Content-Type', 'application/json');  
    res.status(200).json(result); 
  } else {
    /*
      #swagger.responses[404] = {
        description: 'Not Found.'
      }
    */
    res.status(404).send('Not found.');  
  }
  
}

/////// POST ///////
const postData = async (req, res) => {
  /*  #swagger.summary = 'Add a single contact.'
      #swagger.description = 'Adds a single contact using information provided in a JSON body.'
      #swagger.parameters['jsonObj'] = {
        in: 'body',
        description: 'A valid JSON object with applicable data elements populated.',
        type: 'object',
        format: 'json',
        schema: {
          $firstName: 'Test',
          $lastName: 'User',
          $email: 'test_user@email.com',
          $favoriteColor: 'Green',
          $birthday: 'January 1'
        }
      }
  */
  const contact = req.body;
  if (
    contact.firstName && 
    contact.lastName &&
    contact.email &&
    contact.favoriteColor &&
    contact.birthday
  ) {
    
    const dbResult = mongoDb.getDb()
      .db('ml341_user-db')
      .collection('contacts')
      .insertOne( req.body );

    dbResult.then( 
      (resultData) => {
        /*
          #swagger.responses[201] = {
            description: "A single contact is added with the data given. Return result includes the assigned ID number.",
            schema: {
              acknowledged: true,
              insertedId: '<hex-string>'
            }
          }
        */
        console.log("Added document.") 
        res.setHeader('Content-Type', 'application/json'); 
        res.status(201).json(resultData);  // 201 CREATED
      }
    )
    .catch( (err) => {
      /*
        #swagger.responses[500] = {
          description: 'Internal server or database error.'
        }
      */
      res.status(500).send({
        message: err.message || 'Internal server or database error.',
      });

    });
  } else {
    /*
      #swagger.responses[400] = {
        description: 'Bad/Missing data error.'
      }
    */
  }
    
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
        responseText: "Success",
        responseCode: 204
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
  const myObjId = new ObjectId(req.params.id);
  const dbResult = mongoDb.getDb()
    .db('ml341_user-db')
    .collection('contacts')
    .deleteOne(
      {"_id": myObjId }
  );   
  dbResult.then( 
    (resultData) => {
      console.log("Delete document " + req.params.id) 
      res.setHeader('Content-Type', 'application/json'); 
      res.status(200).json(resultData);
    }
  );
};

module.exports = {
  getData,
  getOne,
  postData,
  putData,
  deleteData
};