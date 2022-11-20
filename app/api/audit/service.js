

const util = require('../../../common/util/magic');
const enum_ = require('../../../common/util/enum');
const auditOrm = require('../../storage/ormo/audit_orm');
const { isEmpty } = require('../../../utils/validator.helper');

const STATUS_SUCCESS = 'Success';
const STATUS_FAILURE = 'Failure';

exports.StartCloseAuditProcess = async (req, res) => {
    try {
        const { container_id, facility_code, company_code, proceso } = req.body;
        const { code: usuario } = req.headers['middleware-user-data'];

        if (!isEmpty(container_id) && !isEmpty(facility_code) && !isEmpty(company_code) && !isEmpty(proceso)) {
            let data = await auditOrm.StartCloseAuditProcess(container_id, facility_code, company_code, usuario, proceso);
            if (data.err) {
                return res.status(enum_.CODE_BAD_REQUEST).send(
                    await util.ResponseService(STATUS_FAILURE, data.err.code, data.err.messsage, ''));
            } else {
                return res.status(enum_.CODE_OK).send(
                    await util.ResponseService(STATUS_SUCCESS, '', 'Success Response', data));
            }
        } else {
            return res.status(statusCode).send(
                await util.ResponseService(STATUS_FAILURE, enum_.FAIL_CONVERTED_UUID_TO_STRING, 'Error, todos los campos son obligatorios', ''));
        }
    } catch (err) {
        console.log('>>>> err', err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(
            await util.ResponseService(STATUS_FAILURE, enum_.CRASH_LOGIC, err, ''));
    }
}

exports.UpdateCreateProductByLotes = async (req, res) => {
  try {
      const { container_id, facility_id, invent_id, item_id, batch_number_id, audit_qty } = req.body;
      const { code: usuario } = req.headers['middleware-user-data'];

      if (
        !isEmpty(container_id) && !isEmpty(facility_code) && !isEmpty(facility_id) && !isEmpty(invent_id) &&
        !isEmpty(item_id) && !isEmpty(batch_number_id) && !isEmpty(audit_qty)
      ) {
          let data = await auditOrm.UpdateCreateProductByLotes(container_id, facility_id, invent_id, item_id, batch_number_id, audit_qty, usuario);
          if (data.err) {
              return res.status(enum_.CODE_BAD_REQUEST).send(
                  await util.ResponseService(STATUS_FAILURE, data.err.code, data.err.messsage, ''));
          } else {
              return res.status(enum_.CODE_OK).send(
                  await util.ResponseService(STATUS_SUCCESS, '', 'Success Response', data));
          }
      } else {
          return res.status(statusCode).send(
              await magic.ResponseService(STATUS_FAILURE, enum_.FAIL_CONVERTED_UUID_TO_STRING, 'Error, todos los campos son obligatorios', ''));
      }
  } catch (err) {
      console.log('>>>> err', err);
      return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(
          await util.ResponseService(STATUS_FAILURE, enum_.CRASH_LOGIC, err, ''));
  }
}

exports.CreateCorrelative = async (req, res) => {
  try {
      const { tabla } = req.body;
      const { code: usuario } = req.headers['middleware-user-data'];

      if (!isEmpty(tabla) ) {
          let data = await auditOrm.CreateCorrelative(tabla, usuario);
          if (data.err) {
              return res.status(enum_.CODE_BAD_REQUEST).send(
                  await util.ResponseService(STATUS_FAILURE, data.err.code, data.err.messsage, ''));
          } else {
              return res.status(enum_.CODE_OK).send(
                  await util.ResponseService(STATUS_SUCCESS, '', 'Success Response', data));
          }
      } else {
          return res.status(statusCode).send(
              await magic.ResponseService(STATUS_FAILURE, enum_.FAIL_CONVERTED_UUID_TO_STRING, 'Error, todos los campos son obligatorios', ''));
      }
  } catch (err) {
      console.log('>>>> err', err);
      return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(
          await util.ResponseService(STATUS_FAILURE, enum_.CRASH_LOGIC, err, ''));
  }
}
