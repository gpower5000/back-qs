const magic = require('../../../common/util/magic');
const enum_ = require('../../../common/util/enum');
const { database } = require("../../storage/repository_mysql");
const profileMaintenance = require('../../storage/ormo/profile_maintenance_orm');
const excelHelper = require('../../../utils/excel.helper');

const STATUS_SUCCESS = 'Success';
const STATUS_FAILURE = 'Failure';
const fs = require('fs');

const OUT_RESPONSE = {
    status: 'Success',
    statusCode: 200,
    errorCode: '',
    message: '',
    data: '',
    resp: {}
}

exports.GetAllProfile = async (req, res) => {
    try {
        const { page_number, page_size } = req.query;
        let data = await profileMaintenance.GetAllProfile(page_number, page_size);
        if (data.err) {
            return res.status(enum_.CODE_BAD_REQUEST).send(
                await magic.ResponseService(STATUS_FAILURE, data.err.code, data.err.messsage, ''));
        } else {
            return res.status(enum_.CODE_OK).send(
                await magic.ResponseService(STATUS_SUCCESS, '', 'Success Response', data));
        }
    } catch (err) {
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(
            await magic.ResponseService(STATUS_FAILURE, enum_.CRASH_LOGIC, err, ''));
    }
}

exports.GetProfileById = async (req, res) => {
    try {
        const { id } = req.query;
        console.log('>>salida req. 2', req.query)
        let data = await profileMaintenance.GetProfileById(id);
        if (data.err) {
            return res.status(enum_.CODE_BAD_REQUEST).send(
                await magic.ResponseService(STATUS_FAILURE, data.err.code, data.err.messsage, ''));
        } else {
            return res.status(enum_.CODE_OK).send(
                await magic.ResponseService(STATUS_SUCCESS, '', 'Success Response', data));
        }
    } catch (err) {
        console.log('>>>> err', err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(
            await magic.ResponseService(STATUS_FAILURE, enum_.CRASH_LOGIC, err, ''));
    }
}

exports.SaveProfile = async (req, res) => {
    let status = 'Success', errorCode = '', message = '', data = '', statusCode = 0, resp = {};
    try {
        const { perfil } = req.body;
        const { code: user } = req.headers['middleware-user-data'];

        if (perfil != "" && perfil != null && user != "" && user != null) {
            respOrm = await profileMaintenance.SaveProfile(perfil, user);
            if (respOrm && respOrm.err) {
                status = false, errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            } else {
                if (respOrm.STATUS_RECORD) {
                    message = 'Registro exitoso', data = { status: true }, statusCode = enum_.CODE_OK;
                } else {
                    status = false, errorCode = enum_.ID_NOT_FOUND, message = 'No se pudo guardar el perfil', statusCode = enum_.CODE_OK;
                }
            }
        } else {
            status = false, errorCode = enum_.FAIL_CONVERTED_UUID_TO_STRING, message = 'Error, todos los campos son obligatorios', statusCode = enum_.CODE_OK;
        }
        resp = await magic.ResponseService(status, errorCode, message, data);
        return res.status(statusCode).send(resp);
    } catch (err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure', enum_.CRASH_LOGIC, err, ''));
    }
}

exports.DeleteProfileByID = async (req, res) => {
    let status = 'Success', errorCode = '', message = '', data = '', statusCode = 0, resp = {};
    try {
        const { id } = req.params;
        const { code: user } = req.headers['middleware-user-data'];
        respOrm = await profileMaintenance.DeleteProfileByID(id, user);
        if (respOrm && respOrm.err) {
            status = false, errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
        } else {
            if (respOrm == 1) {
                message = 'Eliminación exitosa', data = { status: true }, statusCode = enum_.CODE_OK;
            } else {
                status = false, errorCode = enum_.ID_NOT_FOUND, message = 'No se pudo eliminar el perfil', statusCode = enum_.CODE_OK;
            }
        }
        resp = await magic.ResponseService(status, errorCode, message, data);
        return res.status(statusCode).send(resp);
    } catch (err) {
        console.log('>>>> err', err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(
            await magic.ResponseService(STATUS_FAILURE, enum_.CRASH_LOGIC, err, ''));
    }
}

exports.UpdateProfileByID = async (req, res) => {
    let status = 'Success', errorCode = '', message = '', data = '', statusCode = 0, resp = {};
    try {
        const { id } = req.params;
        const { perfil } = req.body;
        const { code: user } = req.headers['middleware-user-data'];

        if (perfil != "" && perfil != null && user != "" && user != null) {
            //  let valid = await profileMaintenance.ValidateProfile(id, perfil, 'U');
            respOrm = await profileMaintenance.UpdateProfile(id, perfil, user);
            if (respOrm && respOrm.err) {
                status = false, errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            } else {
                console.log(respOrm)
                if (respOrm.STATUS_RECORD) {
                    message = 'Actualización exitosa', data = { status: true }, statusCode = enum_.CODE_OK;
                } else {
                    status = false, errorCode = enum_.ID_NOT_FOUND, message = 'No se pudo actualizar el perfil', statusCode = enum_.CODE_OK;
                }
            }
        } else {
            status = false, errorCode = enum_.FAIL_CONVERTED_UUID_TO_STRING, message = 'Error, todos los campos son obligatorios', statusCode = enum_.CODE_OK;
        }
        resp = await magic.ResponseService(status, errorCode, message, data);
        return res.status(statusCode).send(resp);
    } catch (err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService(STATUS_FAILURE, enum_.CRASH_LOGIC, err, ''));
    }
}

exports.GetAllModules = async (req, res) => {
    try {
        const outResponse = { ...OUT_RESPONSE };
        let statusResponse = true;
        const respOrm = await profileMaintenance.GetAllModules();

        if (respOrm && respOrm.err) {
            statusResponse = false;
        } else {
            if (respOrm) { statusResponse = true; }
            else { statusResponse = false; }
        }

        if (statusResponse) {
            outResponse.message = STATUS_SUCCESS;
            outResponse.statusCode = enum_.CODE_OK;
            outResponse.data = respOrm;
        } else {
            outResponse.status = STATUS_FAILURE;
            outResponse.errorCode = respOrm.err.code;
            outResponse.message = respOrm.err.messsage;
            outResponse.statusCode = enum_.CODE_BAD_REQUEST;
        }

        let resp = await magic.ResponseService(outResponse.status, outResponse.errorCode, outResponse.message, outResponse.data);
        return res.status(enum_.CODE_OK).send(resp);
    } catch (err) {
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(
            await magic.ResponseService(STATUS_FAILURE, enum_.CRASH_LOGIC, err, ''));
    }
}

exports.GetAllModulesByRol = async (req, res) => {
    try {
        const outResponse = { ...OUT_RESPONSE };
        let statusResponse = true;
        const respOrm = await profileMaintenance.GetAllModulesByRol(req.body.rolId);

        if (respOrm && respOrm.err) {
            statusResponse = false;
        } else {
            if (respOrm) { statusResponse = true; }
            else { statusResponse = false; }
        }

        if (statusResponse) {
            outResponse.message = 'Success';
            outResponse.statusCode = enum_.CODE_OK;
            outResponse.data = respOrm;
        } else {
            outResponse.status = 'Failure';
            outResponse.errorCode = respOrm.err.code;
            outResponse.message = respOrm.err.messsage;
            outResponse.statusCode = enum_.CODE_BAD_REQUEST;
        }

        let resp = await magic.ResponseService(outResponse.status, outResponse.errorCode, outResponse.message, outResponse.data);
        return res.status(enum_.CODE_OK).send(resp);
    } catch (err) {
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(
            await magic.ResponseService(STATUS_FAILURE, enum_.CRASH_LOGIC, err, ''));
    }
}

exports.InsertUpdateRolDetails = async (req, res) => {
    try {
        const outResponse = {
            ...OUT_RESPONSE,
            message: 'Success',
            statusCode: enum_.CODE_OK,
            data: {
                STATUS_RECORD: false,
                MESSAGE_RECORD: 'Error en guardar el Perfil'
            }
        };

        const { rolId, rolDescription, modules, mode } = req.body;
        const { code } = req.headers['middleware-user-data'];

        if (!rolDescription) {
            outResponse.data = {
                STATUS_RECORD: false,
                MESSAGE_RECORD: 'Debe ingresar correctamente el Perfil'
            };
        } else {
            let STATUS_RECORD, ID_RECORD;
            if (mode === 'I') {
                const rptaSaveRol = await profileMaintenance.SaveProfile(rolDescription, code);
                STATUS_RECORD = rptaSaveRol.STATUS_RECORD;
                ID_RECORD = rptaSaveRol.ID_RECORD;
            } else {
                const rptaSaveRol = await profileMaintenance.UpdateProfile(rolId, rolDescription, code);
                STATUS_RECORD = rptaSaveRol.STATUS_RECORD;
                ID_RECORD = rptaSaveRol.ID_RECORD;
            }

            if (!STATUS_RECORD) {
                outResponse.data = {
                    STATUS_RECORD: false,
                    MESSAGE_RECORD: 'Error en guardar el Perfil'
                };
            } else {
                const rpta = await profileMaintenance.DeleteViewsByRol(ID_RECORD, code);
                if (!rpta.STATUS_RECORD) {
                    outResponse.data = {
                        STATUS_RECORD: false,
                        MESSAGE_RECORD: 'Error asignar las vistas al Perfil'
                    };
                } else {
                    for (const module of modules) {
                        const { MODULO_ID, VISTA_ID, actionInsert = null, actionUpdate = null, actionDelete = null, actionSearch = null } = module;
                        const rpta1 = await profileMaintenance.SaveRolView(
                            VISTA_ID, ID_RECORD, actionInsert, actionUpdate, actionDelete, actionSearch, code
                        );
                        if (!rpta1.STATUS_RECORD) {
                            throw 'Error en asignar las vistas al perfil'
                        }
                    }
                    outResponse.data = {
                        STATUS_RECORD: true,
                        MESSAGE_RECORD: 'Datos guardados correctamente'
                    };
                }
            }
        }

        let resp = await magic.ResponseService(outResponse.status, outResponse.errorCode, outResponse.message, outResponse.data);
        return res.status(enum_.CODE_OK).send(resp);
    } catch (err) {
        console.log('>>> err', err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(
            await magic.ResponseService(STATUS_FAILURE, enum_.CRASH_LOGIC, err, ''));
    }
}

exports.GenerateExcelReport = async (req, res) => {
    try {
        const { page_number, page_size } = req.query;
        let data = await profileMaintenance.GetAllProfile(page_number, page_size);
        if (data.err) {
            return res.status(enum_.CODE_BAD_REQUEST).send(
                await magic.ResponseService(STATUS_FAILURE, data.err.code, data.err.messsage, ''));
        }
        if (data.length === 0) {
            return res.status(enum_.CODE_BAD_REQUEST).send(
                await magic.ResponseService(STATUS_FAILURE, '', '', ''));
        }

        let rowHeads = [
            { id: 'ROL_ID', as: 'ROL_ID' },
            { id: 'DESCRIPCION_ROL', as: 'ROL' },
            { id: 'USU_CREACION', as: 'USU_CREACION' },
            { id: 'FEC_CREACION', as: 'FEC_CREACION' },
            { id: 'USU_MODIFICACION', as: 'USU_MODIFICACION' },
            { id: 'FEC_MODIFICACION', as: 'FEC_MODIFICACION' }
        ]
        let wsCols = [
            { wpx: 80 },
            { wpx: 120 },
            { wpx: 120 },
            { wpx: 200 },
            { wpx: 120 },
            { wpx: 200 },
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
                namePage: 'Mantenedor de Perfil',
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
            await magic.ResponseService(STATUS_FAILURE, enum_.CRASH_LOGIC, err, ''));
    }
}