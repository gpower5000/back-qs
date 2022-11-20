const util = require('../../../common/util/magic');
const enum_ = require('../../../common/util/enum');
const typeDocOrm = require('../../storage/ormo/type_doc_orm');

const STATUS_SUCCESS = 'Success';
const STATUS_FAILURE = 'Failure';

exports.GetAllTypeDocument = async (req, res) => {
    try {
        let data = await typeDocOrm.GetAllTypeDocument();
        console.log(data);
        if (data.err) {
            return res.status(enum_.CODE_BAD_REQUEST).send(
                await util.ResponseService(STATUS_FAILURE, data.err.code, data.err.messsage, ''));
        } else {
            return res.status(enum_.CODE_OK).send(
                await util.ResponseService(STATUS_SUCCESS, '', 'Success Response', data));
        }
    } catch (err) {
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(
            await util.ResponseService(STATUS_FAILURE, enum_.CRASH_LOGIC, err, ''));
    }
}