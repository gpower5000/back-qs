const util = require('../../../common/util/magic');
const enum_ = require('../../../common/util/enum');
const bcrypt = require("bcryptjs");
const userOrm = require('../../storage/ormo/user_orm');
const excelHelper = require('../../../utils/excel.helper');

const STATUS_SUCCESS = 'Success';
const STATUS_FAILURE = 'Failure';
const fs = require('fs');

exports.SaveUser = async (req, res) => {
    let status = STATUS_SUCCESS, errorCode = '', message = '', data = '', statusCode = 0, resp = {};
    try {
        let hashedPassword = null;
        const {
            user, password, name, patherName, motherName,
            socialReason, typeUser, roleId, state
        } = req.body;
        const { code: userCreation } = req.headers['middleware-user-data'];
        if (password !== "" && password !== null) {
            hashedPassword = bcrypt.hashSync(password);
        }
        if (
            user != "" && user != null && hashedPassword != "" && hashedPassword != null
            && (typeUser == '1' ? (name != "" && name != null && patherName != "" && patherName != null && motherName != "" && motherName != null) : true)
            && typeUser != "" && typeUser != null && roleId != "" && roleId != null
            && userCreation != "" && userCreation != null && state != "" && state != null
        ) {
            let valid = await userOrm.ValidateUser(user, password, typeUser, roleId, 'I');
            console.log('>>> validacion ok', valid);
            if (valid && valid.err) {
                status = STATUS_FAILURE, errorCode = valid.err.code, message = valid.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            } else {
                if (valid === 'OK') {
                    respOrm = await userOrm.SaveUser(user, hashedPassword, name, patherName, motherName,
                        socialReason, state, typeUser, roleId, userCreation);
                    if (respOrm && respOrm.err) {
                        status = STATUS_FAILURE, errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
                    } else {
                        console.log(respOrm)
                        if (respOrm.p_result == '1') {
                            message = 'Registro exitoso', data = { status: true }, statusCode = enum_.CODE_OK;
                        } else {
                            status = STATUS_FAILURE, errorCode = enum_.ID_NOT_FOUND, message = 'No se pudo guardar el usuario', statusCode = enum_.CODE_OK;
                        }
                    }
                } else {
                    status = STATUS_FAILURE, errorCode = enum_.ID_NOT_FOUND, message = valid, statusCode = enum_.CODE_OK;
                }
            }
        } else {
            status = STATUS_FAILURE, errorCode = enum_.FAIL_CONVERTED_UUID_TO_STRING, message = 'Error, todos los campos son obligatorios', statusCode = enum_.CODE_OK;
        }
        resp = await util.ResponseService(status, errorCode, message, data);
        return res.status(statusCode).send(resp);
    } catch (err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await util.ResponseService(STATUS_FAILURE, enum_.CRASH_LOGIC, err, ''));
    }
}

exports.GetUserById = async (req, res) => {
    try {
        const { id } = req.query;
        if (id !== '' && id !== null) {
            let data = await userOrm.GetUserById(id);
            if (data.err) {
                return res.status(enum_.CODE_BAD_REQUEST).send(
                    await util.ResponseService(STATUS_FAILURE, data.err.code, data.err.messsage, ''));
            } else {
                return res.status(enum_.CODE_OK).send(
                    await util.ResponseService(STATUS_SUCCESS, '', 'Success Response', data));
            }
        } else {
            return res.status(enum_.CODE_OK).send(
                await util.ResponseService(STATUS_FAILURE, enum_.ID_NOT_FOUND, 'Error, todos los campos son obligatorios', ''));
        }
    } catch (err) {
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(
            await util.ResponseService(STATUS_FAILURE, enum_.CRASH_LOGIC, err, ''));
    }
}

exports.UpdateUserById = async (req, res) => {
    let status = STATUS_SUCCESS, errorCode = '', message = '', data = '', statusCode = 0, resp = {};
    try {
        let hashedPassword = null;
        const { id: user } = req.params;
        const {
            password, name, patherName, motherName,
            socialReason, typeUser, roleId, state
        } = req.body;
        const { code: userModification } = req.headers['middleware-user-data'];
        console.log('>>> que fue user userModification', userModification);

        if (password !== "" && password !== null) {
            hashedPassword = bcrypt.hashSync(password);
        }
        console.log((typeUser == '1' ? true : (socialReason != "" && socialReason != null)));
        if (
            user != "" && user != null && hashedPassword != "" && hashedPassword != null
            && (typeUser == '1' ? (name != "" && name != null && patherName != "" && patherName != null && motherName != "" && motherName != null) : true)
            && typeUser != "" && typeUser != null && roleId != "" && roleId != null
            && userModification != "" && userModification != null && state != "" && state != null
        ) {
            let valid = await userOrm.ValidateUser(user, password, typeUser, roleId, 'U');
            console.log('>>> validacion ok', valid);
            if (valid && valid.err) {
                status = STATUS_FAILURE, errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            } else {
                if (valid === 'OK') {
                    respOrm = await userOrm.UpdateUserById(user, hashedPassword, name, patherName, motherName,
                        socialReason, state, typeUser, roleId, userModification);
                    if (respOrm && respOrm.err) {
                        status = STATUS_FAILURE, errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
                    } else {
                        console.log(respOrm)
                        if (respOrm.p_result == '1') {
                            message = 'Actualización Exitosa', data = { status: true }, statusCode = enum_.CODE_OK;
                        } else {
                            status = STATUS_FAILURE, errorCode = enum_.ID_NOT_FOUND, message = 'No se pudo actualizar el usuario', statusCode = enum_.CODE_OK;
                        }
                    }
                } else {
                    status = STATUS_FAILURE, errorCode = enum_.ID_NOT_FOUND, message = valid, statusCode = enum_.CODE_OK;
                }
            }
        } else {
            status = STATUS_FAILURE, errorCode = enum_.FAIL_CONVERTED_UUID_TO_STRING, message = 'Error, todos los campos son obligatorios', statusCode = enum_.CODE_OK;
        }
        resp = await util.ResponseService(status, errorCode, message, data);
        return res.status(statusCode).send(resp);
    } catch (err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await util.ResponseService(STATUS_FAILURE, enum_.CRASH_LOGIC, err, ''));
    }
}

exports.DeleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { user, typeUser } = req.body;
        const { code: userModification } = req.headers['middleware-user-data'];

        if (id != "" && id != null && user != "" && user != null && typeUser != "" && typeUser != null && userModification != "" && userModification != null) {
            let data = await userOrm.DeleteUserById(user, typeUser, userModification);
            if (data.err) {
                return res.status(enum_.CODE_BAD_REQUEST).send(
                    await util.ResponseService(STATUS_FAILURE, data.err.code, data.err.messsage, ''));
            } else {
                return res.status(enum_.CODE_OK).send(
                    await util.ResponseService(STATUS_SUCCESS, '', 'Success Response', data));
            }
        } else {
            return res.status(enum_.CODE_OK).send(
                await util.ResponseService(STATUS_FAILURE, enum_.ID_NOT_FOUND, 'Error, todos los campos son obligatorios', ''));
        }
    } catch (err) {
        console.log('>>>> err', err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(
            await util.ResponseService(STATUS_FAILURE, enum_.CRASH_LOGIC, err, ''));
    }
}

exports.GetAllTypeUser = async (req, res) => {
    try {
        let data = await userOrm.GetAllTypeUser();
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
}

exports.GetAllState = async (req, res) => {
    try {
        let data = await userOrm.GetAllState();
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
}

exports.GenerateExcelReport = async (req, res) => {
    try {
        let data = await userOrm.GetAllUser();
        if (data.err) {
            return res.status(enum_.CODE_BAD_REQUEST).send(
                await util.ResponseService(STATUS_FAILURE, data.err.code, data.err.messsage, ''));
        }
        if (data.length === 0) {
            return res.status(enum_.CODE_BAD_REQUEST).send(
                await util.ResponseService(STATUS_FAILURE, '', '', ''));
        }

        let rowHeads = [
            { id: 'USUARIO', as: 'USUARIO' },
            { id: 'NOMBRE', as: 'NOMBRE' },
            { id: 'APE_PATERNO', as: 'APE_PATERNO' },
            { id: 'APE_MATERNO', as: 'APE_MATERNO' },
            { id: 'TIPO_USUARIO', as: 'TIPO_USUARIO' },
            { id: 'ROL', as: 'ROL' },
            { id: 'ESTADO', as: 'ESTADO' },
            { id: 'USUARIO_CREACION', as: 'USUARIO_CREACION' },
            { id: 'FECHA_CREACION', as: 'FECHA_CREACION' },
            { id: 'USUARIO_MODIFICACION', as: 'USUARIO_MODIFICACION' },
            { id: 'FECHA_MODIFICACION', as: 'FECHA_MODIFICACION' },
        ]
        let wsCols = [
            { wpx: 120 },
            { wpx: 150 },
            { wpx: 150 },
            { wpx: 150 },
            { wpx: 100 },
            { wpx: 100 },
            { wpx: 120 },
            { wpx: 150 },
            { wpx: 120 },
            { wpx: 150 },
            { wpx: 150 }
        ]

        let wsData = [rowHeads.map(a => a.as)];

        data.forEach(item => {
            let row = [];
            rowHeads.forEach(head => {
                let field = !!item[head.id] ? item[head.id] : null;
                row.push(field);
            });
            wsData.push(row);
        });

        let nameFile = __dirname + '/../../../public/files/' + (new Date).getTime() + '.xlsx';
        let buff = await excelHelper.createExcelFile(
            nameFile,
            [{
                namePage: 'Consolidado de Usuarios',
                colswidth: wsCols,
                data: wsData,
            }]
        );
        res.download(nameFile, '', (err) => {
            setTimeout(() => {
                fs.unlinkSync(nameFile);
            }, 1000);
        });
    } catch (err) {
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(
            await util.ResponseService(STATUS_FAILURE, enum_.CRASH_LOGIC, err, ''));
    }
}

/* Guarda locales x Usuario*/
exports.SaveUserStore = async (req, res) => {
    let status = 'Success', errorCode = '', message = '', data = '', statusCode = 0, resp = {};
    try {
        const { usuario, cod_local, estado, flag_principal, usu_creacion } = req.body;
        console.log('Parametros de TIendas por USUARIO', req.body);
        //const { code: usuario } = req.headers['middleware-user-data'];

        if (usuario !== "" && usuario != null
            && cod_local !== "" && cod_local != null && estado !== "" && estado != null && flag_principal !== "" && flag_principal != null) {

            respOrm = await userOrm.SaveUserStore(usuario, cod_local, estado, flag_principal, usu_creacion);
            if (respOrm && respOrm.err) {
                status = 'Failure', errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            } else {
                if (respOrm != 1) {
                    message = 'Registro exitoso', data = { status: true }, statusCode = enum_.CODE_OK;
                } else {
                    status = 'Failure', errorCode = enum_.ID_NOT_FOUND, message = 'No se pudo guardar Los Datos', statusCode = enum_.CODE_OK;
                }
            }
        } else {
            status = 'Failure', errorCode = enum_.FAIL_CONVERTED_UUID_TO_STRING, message = 'Error, todos los campos son obligatorios', statusCode = enum_.CODE_OK;
        }
        resp = await util.ResponseService(status, errorCode, message, data);
        return res.status(statusCode).send(resp);
    } catch (err) {
        console.log('>>> err', err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await util.ResponseService('Failure', enum_.CRASH_LOGIC, err, ''));
    }
}

exports.UpdateUserByWMS = async (req, res) => {
  let status = 'Success', errorCode = '', message = '', data = '', statusCode = 0, resp = {};
    try {
        const {
            usuario,
            user_id, user_url,
            facily_id, facility_code,
            company_id, company_code,
            auth_user_id, username, 
            wms_is_active, wms_univ_id_1 } = req.body;

        if (usuario !== "" && usuario != null) {
            respOrm = await userOrm.UpdateUserByWms(
                usuario,
                user_id, user_url,
                facily_id, facility_code,
                company_id, company_code,
                auth_user_id, username, 
                wms_is_active, wms_univ_id_1 );
            
            console.log('::: Respuesta de UpdateUserByWms', respOrm);
            if (respOrm && respOrm.err) {
                status = 'Failure', errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            } else {
                if (respOrm != 1) {
                    message = 'Registro exitoso', data = { status: true }, statusCode = enum_.CODE_OK;
                } else {
                    status = 'Failure', errorCode = enum_.ID_NOT_FOUND, message = 'No se pudo guardar Los Datos', statusCode = enum_.CODE_OK;
                }
            }
        } else {
            status = 'Failure', errorCode = enum_.FAIL_CONVERTED_UUID_TO_STRING, message = 'Error, todos los campos son obligatorios', statusCode = enum_.CODE_OK;
        }
        resp = await util.ResponseService(status, errorCode, message, data);
        return res.status(statusCode).send(resp);
    } catch (err) {
        console.log('>>> err', err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await util.ResponseService('Failure', enum_.CRASH_LOGIC, err, ''));
    }
}
