const { logger } = require('../../../utils/logger');
const { database } = require('../repository_mysql');

exports.GetAllUser = async () => {
    try {
        let result = null;
        result = await database.execute(`CALL SP_SATQS_ADM_USUARIO_XLS()`);
        return result;
    } catch (err) {
        console.log(" err orm = ", err);
        return await { err: { code: err.parent.sqlState, messsage: err.parent.sqlMessage } }
    }
}

exports.ValidateUser = async (user, password, typeUser, roleId, proceso) => {
    try {
        let result = null;
        const params = [
            p_usuario = user,
            p_clave = password,
            p_tipo_usuario = typeUser,
            p_rol_id = roleId,
            p_proceso = proceso
        ];
        result = await database.execute(
          `CALL SP_SATQS_ADM_API_USU_VAL(?,?,?,?,?, @p_result); SELECT @p_result;`,
          params, { showDataPacked: true }
        );
        const { p_result } = database.readOutValues(result);
      
        return p_result;
    } catch (err) {
        console.log(" err user_orm.ValidateUser = ", err);
        return await { err: { code: 123, message: err } }
    }
}

exports.SaveUser = async (
    user, password, name, patherName, motherName,
    socialReason, state, typeUser, roleId, userCreation
) => {
    try {
        let result = null;
        const params = [
            p_usuario = user,
            p_clave = password,
            p_nombre = name,
            p_ape_paterno = patherName,
            p_ape_materno = motherName,
            p_razon_social = socialReason,
            p_estado = state,
            p_tipo_usuario = typeUser,
            p_rol_id = roleId,
            p_usu_creacion = userCreation,
            p_tipo = '0'
        ];
        result = await database.execute(
          `CALL SP_SATQS_ADM_API_USU_INS_UPD(?,?,?,?,?,?,?,?,?,?,?, @p_result);
           SELECT @p_result;`, params, { showDataPacked: true }
        );//(P_TIPO = 0) CREACIÓN

        const values = database.readOutValues(result);

        return values;
    } catch (err) {
        console.log(" err user_orm.SaveUser = ", err);
        return await { err: { code: 123, message: err } };
    }
}

exports.GetUserById = async (user) => {
    try {
        let result = null;
        const params = [
            p_usuario = user
        ];
        result = await database.execute(`CALL SP_SATQS_ADM_USUARIO_GET(?)`, params);
        return result;
    } catch (err) {
        console.log(" err orm = ", err);
        return await { err: { code: err.parent.sqlState, messsage: err.parent.sqlMessage } }
    }
}

exports.UpdateUserById = async (
    user, password, name, patherName, motherName,
    socialReason, state, typeUser, roleId, userCreation
) => {
    try {
        let result = null;
        const params = [
            p_usuario = user,
            p_clave = password,
            p_nombre = name,
            p_ape_paterno = patherName,
            p_ape_materno = motherName,
            p_razon_social = socialReason,
            p_estado = state,
            p_tipo_usuario = typeUser,
            p_rol_id = roleId,
            p_usu_creacion = userCreation,
            p_tipo = '1'
        ];

        result = await database.execute(
          `CALL SP_SATQS_ADM_API_USU_INS_UPD(?,?,?,?,?,?,?,?,?,?,?, @p_result);
           SELECT @p_result;`, params, { showDataPacked: true }
        );//(P_TIPO = 1) MODIFICACIÓN

        const values = database.readOutValues(result);

        if (values.p_result == -1) {
            console.log("Error al grabar los datos ");
            return values.p_result;
        }
        return values;
    } catch (err) {
        console.log(" err user_orm.UpdateUserById = ", err);
        return await { err: { code: 123, message: err } };
    }
}

exports.DeleteUserById = async (user, typeUser, userModification) => {
    try {
        let result = null;
        const params = [
            p_usuario = user,
            p_tipo_usuario = typeUser,
            p_usu_modificacion = userModification,
            p_result = 0//{ type: oracledb.NUMBER, dir: oracledb.BIND_OUT, maxSize: 100 }
        ];
        result = await database.execute(`CALL SP_SATQS_ADM_API_USU_DEL(?,?,?,?)`, params);
        if (result == 1) {
            console.log("Error al Eliminar los datos");
            return "Error al Eliminar los datos";
        }
        return result;
    } catch (err) {
        console.log(" err user_orm.DeleteUserById = ", err);
        return await { err: { code: 123, message: err } };
    }
}

exports.GetAllTypeUser = async () => {
    try {
        let result = null;
        result = await database.execute(`CALL SP_SATQS_ADM_TIP_USU_GET()`);
        return result;
    } catch (err) {
        console.log(" err orm = ", err);
        return await { err: { code: err.parent.sqlState, messsage: err.parent.sqlMessage } }
    }
}

exports.GetAllState = async () => {
    try {
        return [
            { COD_STATE: '1', DESCRIPCION: 'ACTIVO' },
            { COD_STATE: '0', DESCRIPCION: 'INACTIVO' }
        ];
    } catch (err) {
        console.log(" err orm = ", err);
        return await { err: { code: err.parent.sqlState, messsage: err.parent.sqlMessage } }
    }
}

exports.SaveUserStore = async (usuario, cod_local, estado, flag_principal, usu_creacion
) => {
    try {
        let result = null;
        const params = [
            p_usuario = usuario,
            p_cod_local = cod_local,
            p_estado = estado,
            p_flag_principal = flag_principal,
            p_usu_creacion = usu_creacion,
            p_result = 0
        ];
        console.log("SALIDA SERVICE BEFORE params ", params);
        result = await database.execute(`CALL SP_SATQS_USU_LOCAL_INS(?,?,?,?,?,?)`, params);
        if (result == 1) {
            console.log("Error al grabar Usuario Local");
            return result
        }
        return result
    } catch (err) {
        console.log(" err guide_states_orm.SaveUserStore = ", err);
        return await { err: { code: 123, message: err } }
    }
}

exports.UpdateUserByWms = async (usuario, user_id, user_url, facily_id, facility_code,
  company_id, company_code, auth_user_id, username, wms_is_active, wms_univ_id_1
  ) => {
      try {
          let result = null;
          const params = [
            p_usuario = usuario,
            p_user_id = user_id,
            p_user_url = user_url,
            p_facily_id = facily_id,
            p_facility_code = facility_code,
            p_company_id = company_id,
            p_company_code = company_code,
            p_auth_user_id = auth_user_id,
            p_username = username,
            p_wms_is_active = wms_is_active,
            p_wms_univ_id_1 = wms_univ_id_1
          ];
          result = await database.execute(
            `CALL SP_SATQS_ADM_API_USU_UPD_WMS(?,?,?,?,?,?,?,?,?,?,?, @p_result);
            SELECT @p_result;`, params, { showDataPacked: true }
          );

          const values = database.readOutValues(result);

          if (values.p_result == 1) {
              logger.warning("Error al grabar datos UpdateUserByWms");
              return values.p_result;
          }
          return values.p_result;
      } catch (err) {
          logger.warning(" err user_orm.UpdateUserByWms = ", err);
          return { err: { code: 123, message: 'Problemas para actualizar credenciales' } }
      }
  }
