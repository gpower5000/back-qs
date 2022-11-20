const { logger } = require('../../../utils/logger');
const { database } = require('../repository_mysql');

exports.GetAllRole = async (userId) => {
    try {
        const params = [
          p_user_id=userId
        ];
        // const rows = await database.execute(`
        //   SELECT * FROM bd_auditoria_wms.mybigtablex;`, params
        // );

       /* const rows = await database.execute(`
            SELECT * FROM bd_auditoria_wms.usuario;`, params
        );*/
         const rows = await database.execute(`CALL SP_SATQS_ADM_ROL_GET()`);//, params);
        return rows;
    } catch (err) {
        logger.warning('[[GetAllRole]]', err.code, err.message);
        return await { err: { code: 123, message: 'Can not get data' } };
    }
};

exports.InsertFullUser = async () => {
    try {
      const queries = [];
      // for (let index = 0; index < 10000; index++) {
      //   queries.push({
      //     id: 'insert'+index,
      //     query: 'CALL bd_auditoria_wms.sp_inserta_usuario(?, ?, ?, ?)',
      //     parameters: [50000+index, 'many'+Math.round(Math.random()*100,0), 'nombre'+Math.round(Math.random()*100,0), 'apellido'+Math.round(Math.random()*100,0)]
      //   });
      // }

      const results = await database.executeMany(queries);
        // const results = await database.executeMany([
        //     {
        //         id: 'insert1',
        //         query: 'CALL bd_auditoria_wms.sp_inserta_usuario(?, ?, ?, ?)',
        //         parameters: [20002, 'Pjuan', 'Juan', 'Perez'],
        //     },
        //     {
        //         id: 'insert2',
        //         query: 'CALL bd_auditoria_wms.sp_inserta_usuario(?, ?, ?, ?)',
        //         parameters: [20003, 'Pjose', 'Jose', 'Perez'],
        //     },
        //     {
        //         id: 'insert3',
        //         query: 'CALL bd_auditoria_wms.sp_inserta_usuario(?, ?, ?, ?)',
        //         parameters: [20004, 'PAurora', 'Aurora', 'Zambrano'],
        //     },
        //     // {
        //     //     id: 'delete',
        //     //     query: 'DELETE FROM user WHERE name = ?',
        //     //     parameters: ['jeff'],
        //     // },
        // ]);
        return results;
    } catch (err) {
        return await { err: { code: err.code, message: err.message } }
    }
}
