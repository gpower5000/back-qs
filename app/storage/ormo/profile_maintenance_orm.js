const { logger } = require('../../../utils/logger');
const { database } = require('../repository_mysql');

exports.GetAllProfile = async (page_number, page_size) => {
    try {
        let result = null;
        const params = [
            p_pagenumber = page_number,
            p_pagesize = page_size
        ];
        result = await database.execute(`CALL SP_SATQS_ADM_API_ROL_GET(?,?)`, params);
        return result;
    } catch (err) {
        console.log(" err orm = ", err);
        return await { err: { code: err.parent.sqlState, messsage: err.parent.sqlMessage } }
    }
}

exports.SaveProfile = async (rolDescription, usuario) => {
    try {
        let result = null;
        const params = [
            p_rol_id = 0,
            p_rol_description = rolDescription,
            p_usuario = usuario,
            p_proceso = 'I'
        ];
        /*  (P_PROCESO = I) PARA INSERT */
        result = await database.execute(
            `CALL SP_SATQS_ADM_API_ROL_INS_UPD_DEL(?,?,?,?, @p_rol_id_out, @p_result);
            select @p_rol_id_out;SELECT @p_result;`, params, { showDataPacked: true }
        );

        const values = database.readOutValues(result);

        if (values.p_result === -1) {
            logger.warning("Error al grabar datos SaveProfile");
            return {
                STATUS_RECORD: false,
                ID_RECORD: values.p_rol_id_out
            };
        }
        return {
            STATUS_RECORD: true,
            ID_RECORD: values.p_rol_id_out
        };
    } catch (err) {
        return {
            STATUS_RECORD: false, ID_RECORD: -1
        };
    }
};

exports.UpdateProfile = async (rolId, rolDescription, usuario) => {
    try {
        let result = null;
        const params = [
            p_rol_id = rolId,
            p_rol_description = rolDescription,
            p_usuario = usuario,
            p_proceso = 'U'
        ];
        console.log('>>>> params UpdateProfile', params);
        result = await database.execute(
            `CALL SP_SATQS_ADM_API_ROL_INS_UPD_DEL(?,?,?,?, @p_rol_id_out, @p_result);
            select @p_rol_id_out; select @p_result;`, params, { showDataPacked: true }
        ); //(P_PROCESO = U) UPDATE
        const values = database.readOutValues(result);
        if (values.p_result === -1) {
            logger.warning("Error al grabar datos UpdateProfile");
            return {
                STATUS_RECORD: false,
                ID_RECORD: values.p_rol_id_out
            };
        }
        return {
            STATUS_RECORD: true,
            ID_RECORD: values.p_rol_id_out
        };
    } catch (err) {
        return {
            STATUS_RECORD: false, ID_RECORD: -1
        };
    }
};

exports.GetProfileById = async (id) => {
    try {
        let result = null;
        const params = [
            p_rol_id = id
        ];
        result = await database.execute(`CALL SP_SATQS_ADM_API_ROL_POP(?)`, params);
        return result;
    } catch (err) {
        return await { err: { code: err.parent.sqlState, messsage: err.parent.sqlMessage } }
    }
}

exports.DeleteProfileByID = async (id, user_update) => {
    try {
        let result = null;
        const params = [
            p_rol_id = id,
            p_rol_description = '',
            p_usu_modificacion = user_update,
            p_proceso = 'D'
        ];
        result = await database.execute(
            `CALL SP_SATQS_ADM_API_ROL_INS_UPD_DEL(?,?,?,?, @p_rol_id_out, @p_result);
            SELECT @p_rol_id_out;SELECT @p_result;`, params, { showDataPacked: true }
        ); // (P_PROCESO = D) DELETE
        const values = database.readOutValues(result);
      return values.p_result;
    } catch (err) {
        console.log(" err profile_maintenance.DeleteProfileByID = ", err);
        return await { err: { code: 123, message: err } };
    }
}

/**
 * Datos para los Vistas por Rol 
 */
exports.GetAllModules = async () => {
    try {
        let result = null;

        result = await database.execute(`CALL SP_SATQS_ADM_VISTA_GET()`);
        return result;
    } catch (err) {
        return await { err: { code: 123, messsage: err } };
    }
};

exports.GetAllModulesByRol = async (rolId) => {
    try {
        let result = null;
        const params = [
            p_rol_id = rolId
        ];

        result = await database.execute(`CALL SP_SATQS_ADM_VISTA_ROL_GET(?)`, params);
        return result;
    } catch (err) {
        return await { err: { code: 123, messsage: err } };
    }
};

exports.DeleteViewsByRol = async (rolId, user) => {
    try {
        let result = null;
        const params = [
            p_rol_id = rolId,
            p_user_modificacion = user
        ];
        console.log('>>> params', params);
        result = await database.execute(`CALL SP_SATQS_ADM_VISTA_ROL_DEL(?,?, @p_result); 
        SELECT @p_result;`, params, { showDataPacked: true }
        );
        const values = database.readOutValues(result);
        console.log("SALIDA DE VALUES ", values)
        if (values.p_result === -1) {
            return { STATUS_RECORD: false };
        }
        if (values.p_result === 1) {
            return { STATUS_RECORD: true };
        }
    } catch (err) {
        console.log('>>> err', err);
        return { STATUS_RECORD: true };
    }
};

exports.SaveRolView = async (viewId, roleId, actionInsert, actionUpdate, actionDelete, actionSearch, user) => {
    try {
        let result = null;
        const params = [
            p_vista_id = viewId,
            p_rol_id = roleId,
            p_action_I = actionInsert,
            p_action_U = actionUpdate,
            p_action_D = actionDelete,
            p_action_S = actionSearch,
            p_usuario = user
        ];
        console.log("para metros de SaveRolView ",params)
        result = await database.execute(
            `CALL SP_SATQS_ADM_VISTA_ROL_INS(?,?,?,?,?,?,?, @p_rol_id_out, @p_result);
            SELECT @p_rol_id_out;SELECT @p_result;`, params, { showDataPacked: true }
        ); // (P_PROCESO = D) DELETE
        console.log("SALIDA ",result)
        const values = database.readOutValues(result);
        if (result ==-1) {
            return {
                STATUS_RECORD: false,
                ID_RECORD: result.p_vista_rol_id
            };
        }
        return {
            STATUS_RECORD: true,
            ID_RECORD: result.p_vista_rol_id
        };
    } catch (err) {
        console.log("en el TRY  ",err)
        return {
            STATUS_RECORD: false, ID_RECORD: -1
        };
    }
}