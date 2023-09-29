const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

/* 

The above replaces the following code with an environment file (.env):

const mongoDBIP = 'AAA.BBB.CCC.DDD'; // IP or FQDN URL Address of MongoDB server.
const mongoDBPort = 27017;

// Connection string provided by Mongo. Replace user and password as needed. 
// This gets moved to .env as MONGODB_URI which is used below. 

const mongoURL = 'mongodb+srv://<username>:<password>@ml341.b99aley.mongodb.net/`;  

// It is insecure to distribute credentials as part of source on GitHub, 
// therefore be sure that .env file is ignored for git tracking to prevent 
// pushing it to the repository.

*/

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Database is already initialized.');
    return callback(null, _db);
  }
  // Magic sauce below. Create the DB connection because it didn't exist.
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Database is not initialized!');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};