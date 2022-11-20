

const util = require('../../../common/util/magic');
const enum_ = require('../../../common/util/enum');
const boxOrm = require('../../storage/ormo/box_orm');
const { isEmpty } = require('../../../utils/validator.helper');

const STATUS_SUCCESS = 'Success';
const STATUS_FAILURE = 'Failure';

exports.GetContainerOBLPN = async (req, res) => {
    try {
        const { container_nbr, facility_code, company_code } = req.query;

        if (!isEmpty(container_nbr) && !isEmpty(facility_code) && !isEmpty(company_code)) {
            let data = await boxOrm.GetContainerOBLPN(container_nbr, facility_code, company_code);
            if (data.err) {
                return res.status(enum_.CODE_BAD_REQUEST).send(
                    await util.ResponseService(STATUS_FAILURE, data.err.code, data.err.messsage, ''));
            } else {
                return res.status(enum_.CODE_OK).send(
                    await util.ResponseService(STATUS_SUCCESS, '', 'Success Response', data));
            }
        } else {
            return res.status(enum_.CODE_BAD_REQUEST).send(
                await util.ResponseService(STATUS_FAILURE, enum_.FAIL_CONVERTED_UUID_TO_STRING, 'Error, todos los campos son obligatorios', ''));
        }
    } catch (err) {
        console.log('>>>> err', err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(
            await util.ResponseService(STATUS_FAILURE, enum_.CRASH_LOGIC, err, ''));
    }
};

exports.InsertContainerOBLPN = async (req, res) => {
    try {
        const {
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
            inventory_lock_set } = req.body;
        const { code: user_created } = req.headers['middleware-user-data'];

        console.log('req.body', req.body);
        console.log('user_createduser_createduser_created', user_created);

        let data = await boxOrm.InsertContainerOBLPN(
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
        );
        
        if (data.err) {
            return res.status(enum_.CODE_BAD_REQUEST).send(
                await util.ResponseService(STATUS_FAILURE, data.err.code, data.err.messsage, ''));
        } else {
            return res.status(enum_.CODE_OK).send(
                await util.ResponseService(STATUS_SUCCESS, '', 'Success Response', data));
        }

    } catch (err) {
        console.log('>>>> err', err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(
            await util.ResponseService(STATUS_FAILURE, enum_.CRASH_LOGIC, err, ''));
    }
};

exports.GetInventaryBox = async (req, res) => {
    try {
        const { container_id, facility_code } = req.query;

        if (!isEmpty(container_id) && !isEmpty(facility_code)) {
            let data = await boxOrm.GetInventaryBox(container_id, facility_code);
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
};
