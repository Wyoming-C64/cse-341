const About = require('../about');
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: About.version,      
    title: About.name,    
    description: About.name + ' v' + About.version + ' by ' + About.author +' for BYU-I CSE-341: Web Services',
  },
  host: 'localhost:8080',   
  basePath: '/',  
  schemes: ['http'],   
  consumes: ['application/json'], 
  produces: ['application/json'], 
  tags: [       
    {
      name: 'id',        
      description: 'The ID token for a particular contact record in the database.',
    },
    
  ],
};

const outputFile = './swagger/swaggerDoc.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);