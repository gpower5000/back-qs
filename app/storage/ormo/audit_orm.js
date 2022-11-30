const { logger } = require('../../../utils/logger');
const { database } = require('../repository_mysql');

exports.StartCloseAuditProcess = async (container_id, facility_code, usuario, proceso) => {
    try {
        let result = null;
        const params = [
            p_container_id = container_id,
            p_facility_code = facility_code,
            p_usuario = usuario,
            p_proceso = proceso,
        ];
        result = await database.execute(
            `CALL SP_SATQS_CONTAINER_OBLPN_INIT_CLOSE(?,?,?,?, @p_result); SELECT @p_result;`,
            params, { showDataPacked: true }
        );

        console.log("usuariooooo ", usuario)
        const { p_result } = database.readOutValues(result);
        console.log("*****************", p_result)
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


exports.InsertInventaryBox = async (
    container_id, container_nbr, container_url,
    invent_id, invent_url, create_user, create_ts, facility_id, facility_code,
    item_id, item_code, item_url,
    localtion_id, location_code, priority_date,
    curr_qty, orig_qty, pack_qty,
    status_id, expiry_date,
    batch_number_id, batch_number_code, batch_number_url,
    invn_attr_id, invn_attr_code, invn_attr_url,
    serial_nrb_set, user_created
) => {
    try {
        const params = [
            p_container_id = container_id,
            p_container_nbr = container_nbr,
            p_container_url = container_url,
            p_invent_id = invent_id,
            p_invent_url = invent_url,
            p_create_user = create_user,
            p_create_ts = create_ts,
            p_facility_id = facility_id,
            p_facility_code = facility_code,
            p_item_id = item_id,
            p_item_code = item_code,
            p_item_url = item_url,
            p_localtion_id = localtion_id,
            p_location_code = location_code,
            p_priority_date = priority_date,
            p_curr_qty = curr_qty,
            p_orig_qty = orig_qty,
            p_pack_qty = pack_qty,
            p_status_id = status_id,
            p_expiry_date = expiry_date,
            p_batch_number_id = batch_number_id,
            p_batch_number_code = batch_number_code,
            p_batch_number_url = batch_number_url,
            p_invn_attr_id = invn_attr_id,
            p_invn_attr_code = invn_attr_code,
            p_invn_attr_url = invn_attr_url,
            p_serial_nrb_set = serial_nrb_set,
            p_user_created = user_created
        ];

        result = await database.execute(
            `CALL SP_SATQS_CONTAINER_OBLPN_DTL_INS(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @p_result); SELECT @p_result;`,
            params, { showDataPacked: true }
        );

        const { p_result } = database.readOutValues(result);

        return p_result;

    } catch (err) {
        logger.warning(" err box_orm.InsertInventaryBox = ", err);
        return { err: { code: 123, message: 'Problemas en obtener insertar Inventario de SKUs' } }
    }
}