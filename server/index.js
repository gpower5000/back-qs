'use strict';

const path    = require('path');
const dirPath = path.join(__dirname, '../__info__/swagger.yml');
require('dotenv').config();

const express    = require('express');
const bodyParser = require('body-parser');
const server 		 = express();
const helmet 		 = require('helmet');
const cors       = require('cors');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load(dirPath);
server.use('/satqs/api/v1/auditoria/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

server.use(helmet());
server.use(cors());

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

// parse application/json
server.use(bodyParser.json({limit: '50mb'}));

require('../routes')(server);

module.exports = server;

