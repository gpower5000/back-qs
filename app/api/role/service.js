const util = require('../../../common/util/magic');
const enum_ = require('../../../common/util/enum');
const roleOrm = require('../../storage/ormo/role_orm');

const STATUS_SUCCESS = 'Success';
const STATUS_FAILURE = 'Failure';

exports.GetAllRole = async (req, res) => {
    try {
        let data = await roleOrm.GetAllRole();
        if (data.err) {
            return res.status(enum_.CODE_BAD_REQUEST).send(
                await util.ResponseService(STATUS_FAILURE, data.err.code, data.err.message, ''));
        } else {
            return res.status(enum_.CODE_OK).send(
                await util.ResponseService(STATUS_SUCCESS, '', 'Success Response', data));
        }
    } catch (err) {
        console.log('>>>> err', err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(
            await util.ResponseService(STATUS_FAILURE, enum_.CRASH_LOGIC, err, ''));
    }
}

exports.InsertFullUser = async (req, res) => {
  try {
      let data = await roleOrm.InsertFullUser();
      if (data.err) {
          return res.status(enum_.CODE_BAD_REQUEST).send(
              await util.ResponseService(STATUS_FAILURE, data.err.code, data.err.message, ''));
      } else {
          return res.status(enum_.CODE_OK).send(
              await util.ResponseService(STATUS_SUCCESS, '', 'Success Response', data));
      }
  } catch (err) {
      console.log('>>>> err', err);
      return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(
          await util.ResponseService(STATUS_FAILURE, enum_.CRASH_LOGIC, err, ''));
  }
}