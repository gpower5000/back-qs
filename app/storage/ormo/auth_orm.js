const { CYAN_LOG } = require('../../../common/util/enum');
const { logger } = require('../../../utils/logger');
const { database } = require('../repository_mysql');

exports.GetUserData = async (user, password, deviceId = '') => {
    try {
        let result = null;
        const params = [
            code = user,
            password = password
        ];
        result = await database.execute(`CALL SP_SATQS_LOGIN_GET(?,?)`, params);
        return result;
    } catch (err) {
        return await { err: { code: 123, messsage: err } }
    }
}

exports.GetByCode = async (user) => {
    try {
        let result = null;
        const params = [
            code = user
        ];
        result = await database.execute(`CALL SP_SATQS_USUARIO_BY_CODE(?)`, params);
        // console.log("Salida de ****** ",result);
        return result;
    } catch (err) {
        console.log("Salida CATCH ****** ",err);
        return { err: { code: err.parent.sqlState, messsage: err.parent.sqlMessage } }
    }
}

exports.CloseSession = async (user, deviceId) => {
    try {
        let result = null;
        const params = {
            code: user,
            deviceId: deviceId
        };
        result = await database.execute(`BEGIN GES_PKG_API.SP_CERRAR_SESION(:code,:deviceId); END;`, params);
        return true;
    } catch (err) {
        return { err: { code: err.parent.sqlState, messsage: err.parent.sqlMessage } }
    }
}