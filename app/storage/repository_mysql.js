'use strict';
const path = require('path');
const YAML = require('yamljs');
const mysqldb = require('mysql');
const { logger } = require('../../utils/logger');

const DEFAULT_POOL = 'audit_wms';
const ROLE_NO_CONNECTION = 'no connection';

class MysqlRepository {
    static instance; db = {};

    constructor() { 
        this.createConnection();
    }

    static getInstance() {
        if(!MysqlRepository.instance) {
            MysqlRepository.instance = new MysqlRepository;
        }
        return MysqlRepository.instance;
    }

    async createConnection() {
        this.db = await this.getConnection();
    }

    async getConnection() {
        try {
            let db = {};
            let arrayConns = [];
            const dirPath = path.join(__dirname, '../../config.yml');
            const config = YAML.load(dirPath);
            if (config.db.mysql && config.db.mysql.length > 0) {
                arrayConns = arrayConns.concat(config.db.mysql);
            }
            if(arrayConns.length > 0) {
                for (const c of arrayConns) {
                    db[c.nameconn] = {};
                    var pool  = mysqldb.createPool({
                      host              :process.env.DB_HOST || c.host,
                      port              :process.env.DB_PORT || c.port,
                      user              :process.env.DB_USERNAME || c.username,
                      password          :process.env.DB_PASSWORD || c.password,
                      database          :process.env.DB_DATABASE || c.database,
                      // socketPath        :process.env.DB_SOCKET || undefined,
                      connectionLimit   :c.connectionLimit,
                      multipleStatements:c.multipleStatements,
                    });
                    logger.info('[[ pool ]]', pool);
                    db[c.nameconn] = { conn: pool }
                }
            } else {
                logger.warning('[[ pool ]]', "No hay ninguna base de datos vinculada");
            }
            return db;
        } catch (e) {
            logger.warning('[[ pool ]]', e);
            return {};
        }
    }

    async persistenceConnection() {
        let statusConnection = false;
        if(!statusConnection) {
            logger.info("Reintentando conectarse a la base de datos");
            this.db = await this.getConnection();
        }
    }

    async execute(stringFn, parameters = [], options = {},db = null, nameconn = DEFAULT_POOL, intent = 2) {
        try {
            const pool = (db||this.db)[nameconn].conn;
            const { showDataPacked } = options;
            const readQuery = () => new Promise((resolve, reject) => {
              logger.info(':: inicio de execute', new Date);
              pool.getConnection(function(err, connection) {
                if (err) {
                  if (intent < 0) return reject(err);
                  return reject(ROLE_NO_CONNECTION);
                }
                connection.query(stringFn, parameters, function (error, results, fields) {
                  logger.info(':: fin de execute', new Date);
                  connection.release();
                  if (error) return reject(error);
                  resolve(
                    JSON.parse(JSON.stringify(
                      showDataPacked ? results : results[0]
                    ))
                  );
                });
              });
            });
            
            return await readQuery();
        } catch (e) {
            console.log('vuelve a intentar', e === ROLE_NO_CONNECTION);
            if (e === ROLE_NO_CONNECTION) {
                await this.persistenceConnection(e,nameconn);
            }
            if (intent < 0) {
                throw e;
            } else {
                return await this.execute(stringFn, parameters, options, (db||this.db), nameconn, intent -1);
            }
        }
    }

    async executeMany(queries = [], options = {}, db = null, nameconn = DEFAULT_POOL) {
        try {
            const pool = (db||this.db)[nameconn].conn;

            const readQuery = () => new Promise((resolve, reject) => {
                logger.info(':: inicio de execute', new Date);
                pool.getConnection(function(err, connection) {
                    if (err) return reject(err);

                    const results = {};
                    connection.beginTransaction((beginTransactionError) => {
                        if (beginTransactionError !== null) {
                            reject(beginTransactionError);
                        };

                        for (const q of queries) {
                            const { id, query, parameters } = q;
                            connection.query(query, parameters, 
                              (queryError, queryResults, fields) => {
                                if (queryError !== null) {
                                    try {
                                        connection.rollback((rollbackError) => reject(rollbackError));
                                    } catch (rollbackError) {
                                        reject(rollbackError);
                                    }
                                }
                                results[id] = {
                                    result: queryResults,
                                    fields: fields,
                                };
                            });
                        }

                        connection.commit((commitError) => {
                            if (commitError !== null) {
                                reject(commitError);
                            }
                            logger.info(':: fin de execute', new Date);
                            resolve(results);
                        });
                    });
                });
            });
            return await readQuery();
        } catch (e) {
            throw e;
        }
    }

    readOutValues(result) {
        const values = {};
        const flatResult = (Array.isArray(result) ? result: [result]).flatMap( arr => arr);
        flatResult.map( obj => {
            const keys = Object.keys(obj).filter(a => (a||'').includes('@'));
            keys.map( key => values[key.replace('@', '')] = obj[key]);
        });
        return values;
    }
}

module.exports = {
    database  : MysqlRepository.getInstance(),
    outFormat : {},
    mysqldb  : mysqldb,
};