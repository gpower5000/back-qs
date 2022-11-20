'use strict';

const apiServices = require('../app/api/controller');

const routers = (app) =>{
    app.use('/api/v1/auditoria/',apiServices);
};

module.exports = routers;