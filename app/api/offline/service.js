
const util = require('../../../common/util/magic');
const enum_ = require('../../../common/util/enum');
const { validateToken } = require("../../../utils/ServiceToken");

exports.DontAppUserKey = async (req, res, next = console.error) => {
    try {
        if (!!req.headers.authorization) {
            const token        = req.headers.authorization.replace('Bearer ','');
            const validate     = await validateToken(token);

            if(validate.status) {
                req.headers['middleware-user-data'] = validate.userData;
                next(); return;
            } else {
                return res.status(enum_.CODE_UNAUTHORIZED).send(
                    await util.ResponseService('Failure', enum_.CODE_UNAUTHORIZED, validate.message , ''));
            }
        } else {
            return res.status(enum_.CODE_UNAUTHORIZED).send(
                await util.ResponseService('Failure', enum_.CODE_UNAUTHORIZED, 'Acceso no autorizado' , ''));
        }
    } catch (error) {
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(
            await util.ResponseService(STATUS_FAILURE, enum_.CRASH_LOGIC, err, ''));
    }
}