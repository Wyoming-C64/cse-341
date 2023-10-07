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
    console.log(`GET ALL - OK`);
    res.setHeader('Content-Type', 'application/json');  
    res.status(200).json(lists); 
    
  })
  .catch( (err) => {
    /*
      #swagger.responses[500] = {
        description: 'Internal server or database error.'
      }
    */
    console.log(`GET ALL - ${err.message}`);
    res.status(500).send('Internal server or database error.');
  });
};

const getOne = async (req, res, next) => {
  /*  #swagger.summary = 'Get a single contact.'
      #swagger.description = 'Returns a single contact identified by `id`.'
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'A valid and unique ID for the contact.',
        type: 'string',
        format: 'hex'
      }
  */

  const paddedId = req.params.id.padStart(24,'0');
  const myObjId = new ObjectId(paddedId);
  const result = await mongoDb.getDb()
    .db('ml341_user-db')
    .collection('contacts')
    .findOne( {"_id": myObjId })
    .catch( (err) => {
      /*
      #swagger.responses[500] = {
        description: 'Internal server or database error.'
      }
    */
      console.log(`GET document ${paddedId}: 500 - ${err}`);
      res.status(500).send('Internal server or database error.');
      return false;
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
    console.log(`GET document ${paddedId}: 200 - OK`);
    res.setHeader('Content-Type', 'application/json');  
    res.status(200).json(result); 
  } else {
    /*
      #swagger.responses[404] = {
        description: 'Not Found.'
      }
    */
    console.log(`GET document ${paddedId}: 404 - Not found.`);
    if (!res.headersSent) {
      res.setHeader('Content-Type', 'application/json');  
      res.status(404).send('Not found.');  
    }
  }
  
}

/////// POST ///////
const postData = async (req, res) => {
  /*  #swagger.summary = 'Add a single contact.'
      #swagger.description = 'Adds a single contact using information provided in a JSON body.'
      #swagger.parameters['contact'] = {
        in: 'body',
        description: 'A valid JSON object with required data elements populated.',
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
            description: "Created - A single contact is added with the data given. Return result includes the assigned ID number.",
            schema: {
              acknowledged: true,
              insertedId: '<hex-string>'
            }
          }
        */
        console.log(`POST document: 201 - Created. New ID = ${resultData.insertedId}.`); 
        res.setHeader('Content-Type', 'application/json'); 
        res.status(201).json(resultData); 
      }
    )
    .catch( (err) => {
      /*
        #swagger.responses[500] = {
          description: 'Internal server or database error.'
        }
      */
      console.log(`POST document: 500 - ${err.message}.`);
      res.status(500).send('Internal server or database error.');

    });
  } else {
    /*
      #swagger.responses[400] = {
        description: 'Bad or missing data error.'
      }
    */
    console.log(`POST document: 400 - Bad or missing data error.`);
    res.status(400).send('Bad or missing data error.');
  }
    
};

/////// PUT ///////
const putData = async (req, res, next) => {
  let response = {};
  /*  #swagger.summary = 'Update a single contact.'
      #swagger.description = 'Updates a single contact identified by `id` using information provided in a JSON body.'
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'A valid and unique ID for the contact.',
        type: 'string',
        format: 'hex',
      } 
      #swagger.parameters['contact'] = {
        in: 'body',
        description: 'A valid JSON object populated with one or more data fields to be changed.',
        type: 'object',
        format: 'json',
        schema: {
          $firstName: 'NewName',
          $lastName: 'NewSurname',
          $email: 'new@email.com',
          $favoriteColor: 'New Color',
          $birthday: 'January 1'
        }
      }
  */
  const paddedId = req.params.id.padStart(24,'0');
  const myObjId = new ObjectId(paddedId);
  const dbResult = mongoDb.getDb()
    .db('ml341_user-db')
    .collection('contacts')
    .findOneAndUpdate(
      {"_id": myObjId },
      { $set : req.body }
  );   
  dbResult.then( 
    (resultData) => {
      response = resultData
              .lastErrorObject
              .updatedExisting ? {
        /*
          #swagger.responses[204] = {
            description: "Success - A single contact is updated with the data given. No data is returned other than this status.",
          }
        */
        code: 204,
        text: "Success (no content)"
      } : {
        /*
          #swagger.responses[404] = {
            description: "Not found.",
          }
        */
        code: 404,
        text: "Not found."
      };
      console.log(`PUT document ${paddedId}: ${response.code} - ${response.text}`); 
      res.setHeader('Content-Type', 'text/plain'); 
      res.status(response.code).send(response.text);
    }
  )
  .catch ( (err) => {
    /*
      #swagger.responses[500] = {
        description: "Internal server or database error.",
      }
    */
    console.log(`PUT document ${paddedId}: 500 - ${err}`);
    res.setHeader('Content-Type', 'text/plain'); 
    res.status(500).send("Internal server or database error.");
  });
  
};


/////// DELETE ///////
const deleteData = async (req, res, next) => {
  /*  #swagger.summary = 'Delete a single contact.'
      #swagger.description = 'Deletes a single contact identified by `id`. If `id` does not exist, no action is taken and no error occurs. Check the `deletedCount` attribute in the response to determine if a contact was actually deleted.'
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'A valid and unique ID for the contact.',
        type: 'string',
        format: 'hex',
      } 
  */
  const paddedId = req.params.id.padStart(24,'0');
  const myObjId = new ObjectId(paddedId);
  const dbResult = mongoDb.getDb()
    .db('ml341_user-db')
    .collection('contacts')
    .deleteOne(
      {"_id": myObjId }
  );   
  dbResult.then( 
    (resultData) => {
      /*
        #swagger.responses[200] = {
          description: " A single contact identified by `id` is deleted from the collection, if it exists. The response is an object containing an aknowledgement and the number of matching contacts deleted.",
          schema: {
            acknowledged: true,
            deletedCount: 1
          }
        }
      */
      console.log(`DELETE document ${paddedId}: 200 - Success - Documents deleted = ${resultData.deletedCount}`); 
      res.setHeader('Content-Type', 'application/json'); 
      res.status(200).json(resultData);
    }
  )
  .catch( (err) => {
    /*
      #swagger.responses[500] = {
        description: 'Internal server or database error.'
      }
    */
    console.log(`DELETE document ${paddedId}: 500 - ${err.message}`)
    res.status(500).send('Internal server or database error.');

  });
};


module.exports = {
  getData,
  getOne,
  postData,
  putData,
  deleteData
};