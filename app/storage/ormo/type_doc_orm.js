const { logger } = require('../../../utils/logger');
const { database } = require('../repository_mysql');

exports.GetAllTypeDocument = async () => {
    try {
        let result = null;
        const params = [
            cursor= { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
        ];
        result = await database.execute(`CALL bd_auditoria_wms.SP_GES_TIP_DOC_GET(?)`, params); 
        return result;
    } catch (err) {
        return await { err: { code: 123, message: err } }
    }
}