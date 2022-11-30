'use strict';
require('dotenv').config();

const YAML = require('yamljs');
const config = YAML.load('./config.yml');

const server = require('./server');

server.listen(config.port);
console.log('Servidor escuchando en puerto ' + config.port);

server.on('error', err => {
    console.error(err);
});