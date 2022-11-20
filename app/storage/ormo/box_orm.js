const { logger } = require('../../../utils/logger');
const { database } = require('../repository_mysql');

exports.GetContainerOBLPN = async (container_nbr, facility_code, company_code) => {
    try {
        let result = null;
        const params = [
            p_container_nbr = container_nbr,
            p_facility_code = facility_code,
            p_company_code = company_code
        ];
        result = await database.execute(
            `CALL SP_SATQS_CONTAINER_OBLPN_GET(?,?,?);`, params
        );
        return result;
    } catch (err) {
        logger.warning(" err box_orm.GetContainerOBLPN = ", err);
        return { err: { code: 123, message: 'Problemas en obtener cartones' } }
    }
}

exports.InsertContainerOBLPN = async (
    container_id, container_url, create_user, create_ts,
    facility_id, facility_code, facility_url,
    company_id, company_code, company_url,
    container_nbr, container_type,
    status_id, vas_status_id,
    curr_location_id, curr_location_code, curr_location_url,
    prev_location_id, priority_date, pallet_id, rcvd_shipment_id,
    rcvd_ts, rcvd_user, pick_user, pack_user,
    putawaytype_id, ref_iblpn_nbr, ref_shipment_nbr,
    ref_po_nbr, ref_oblpn_nbr,
    first_putaway_ts, parcel_batch_flg,
    lpn_type_id, lpn_type_key,
    lpn_type_url, cart_posn_nbr, audit_status_id,
    qc_status_id, asset_id, asset_seal_nbr,
    rcvd_trailer_nbr, orig_container_nbr, pallet_position,
    inventory_lock_set, user_created
) => {
    try {
        let result = null;
        const params = [
            p_container_id = container_id,
            p_container_url = container_url,
            p_create_user = create_user,
            p_create_ts = create_ts,
            p_facility_id = facility_id,
            p_facility_code = facility_code,
            p_facility_url = facility_url,
            p_company_id = company_id,
            p_company_code = company_code,
            p_company_url = company_url,
            p_container_nbr = container_nbr,
            p_container_type = container_type,
            p_status_id = status_id,
            p_vas_status_id = vas_status_id,
            p_curr_location_id = curr_location_id,
            p_curr_location_code = curr_location_code,
            p_curr_location_url = curr_location_url,
            p_prev_location_id = prev_location_id,
            p_priority_date = priority_date,
            p_pallet_id = pallet_id,
            p_rcvd_shipment_id = rcvd_shipment_id,
            p_rcvd_ts = rcvd_ts,
            p_rcvd_user = rcvd_user,
            p_pick_user = pick_user,
            p_pack_user = pack_user,
            p_putawaytype_id = putawaytype_id,
            p_ref_iblpn_nbr = ref_iblpn_nbr,
            p_ref_shipment_nbr = ref_shipment_nbr,
            p_ref_po_nbr = ref_po_nbr,
            p_ref_oblpn_nbr = ref_oblpn_nbr,
            p_first_putaway_ts = first_putaway_ts,
            p_parcel_batch_flg = parcel_batch_flg,
            p_lpn_type_id = lpn_type_id,
            p_lpn_type_key = lpn_type_key,
            p_lpn_type_url = lpn_type_url,
            p_cart_posn_nbr = cart_posn_nbr,
            p_audit_status_id = audit_status_id,
            p_qc_status_id = qc_status_id,
            p_asset_id = asset_id,
            p_asset_seal_nbr = asset_seal_nbr,
            p_rcvd_trailer_nbr = rcvd_trailer_nbr,
            p_orig_container_nbr = orig_container_nbr,
            p_pallet_position = pallet_position,
            p_inventory_lock_set = inventory_lock_set,
            p_user_created = user_created
        ];

        result = await database.execute(
          `CALL SP_SATQS_CONTAINER_OBLPN_INS(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @p_result); SELECT @p_result;`,
          params, { showDataPacked: true }
        );

        const { p_result } = database.readOutValues(result);
      
        return p_result;
        
    } catch (err) {
        logger.warning(" err box_orm.InsertContainerOBLPN = ", err);
        return { err: { code: 123, message: 'Problemas en obtener insertar Cartones' } }
    }
}

exports.GetInventaryBox = async (container_id, facility_code) => {
  try {
      let result = null;
      const params = [
          p_container_id = container_id,
          p_facility_code = facility_code
      ];
      result = await database.execute(
          `CALL SP_SATQS_CONTAINER_OBLPN_DTL_GET(?,?);`, params
      );
      return result;
  } catch (err) {
      logger.warning(" err box_orm.GetInventaryBox = ", err);
      return { err: { code: 123, message: 'Problemas en obtener inventario de SKU' } }
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
