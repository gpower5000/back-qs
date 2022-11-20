const { logger } = require('../../../utils/logger');
const { database } = require('../repository_mysql');

exports.StartCloseAuditProcess = async (container_id, facility_code, company_code, usuario, proceso) => {
    try {
        let result = null;
        const params = [
            p_container_id = container_id,
            p_facility_code = facility_code,
            p_company_code = company_code,
            p_usuario = usuario,
            p_proceso = proceso,
        ];
        result = await database.execute(
            `CALL SP_SATQS_CONTAINER_OBLPN_INIT_CLOSE(?,?,?,?,?, @p_result); SELECT @p_result;`,
            params, { showDataPacked: true }
        );

        const { p_result } = database.readOutValues(result);
      
        return p_result;

    } catch (err) {
        logger.warning(" err audit_orm.StartCloseAuditProcess = ", err);
        return { err: { code: 123, message: 'Problemas en obtener cartones' } }
    }
}

exports.UpdateCreateProductByLotes = async (container_id, facility_id, invent_id, item_id, batch_number_id, audit_qty, usuario) => {
    try {
        let result = null;
        const params = [
            p_container_id = container_id,
            p_facility_id = facility_id,
            p_invent_id = invent_id,
            p_item_id = item_id,
            p_batch_number_id = batch_number_id,
            p_audit_qty = audit_qty,
            p_usuario = usuario,
        ];
        result = await database.execute(
            `CALL SP_SATQS_CONTAINER_OBLPN_DTL_UPD_QTY(?,?,?,?,?,?,?,?, @p_result); SELECT @p_result;`,
            params, { showDataPacked: true }
        );

        const { p_result } = database.readOutValues(result);
      
        return p_result;

    } catch (err) {
        logger.warning(" err audit_orm.UpdateCreateProductByLotes = ", err);
        return { err: { code: 123, message: 'Problemas en obtener cartones' } }
    }
}

exports.CreateCorrelative = async (tabla, usuario) => {
    try {
        let result = null;
        const params = [
          p_tabla = tabla,
          p_usuario = usuario,
        ];
        result = await database.execute(
            `CALL SP_SATQS_CONTAINER_OBLPN_DTL_UPD_QTY(?,?, @p_result); SELECT @p_result;`,
            params, { showDataPacked: true }
        );

        const { p_result } = database.readOutValues(result);
      
        return p_result;

    } catch (err) {
        logger.warning(" err audit_orm.CreateCorrelative = ", err);
        return { err: { code: 123, message: 'Problemas en obtener cartones' } }
    }

}
