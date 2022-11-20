'use strict';
require('dotenv').config();
const config = require('config-yml');
const server = require('./server');
const expressSwagger = require('express-swagger-generator')(server);

let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:' + config.port,
        basePath: '/api/v1',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./app/**/*.js'] //Path to the API handle folder
};

expressSwagger(options)

server.listen(config.port);
console.log('Servidor escuchando en puerto ' + config.port);
console.log('Start from app.js')

server.on('error', err => {
    console.error(err);
});