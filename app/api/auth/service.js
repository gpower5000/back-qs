const magic = require('../../../common/util/magic');
const enum_ = require('../../../common/util/enum');
const authOrm = require('../../storage/ormo/auth_orm');

const bcrypt = require("bcryptjs");
const moment = require("moment");

const { createToken, validateToken, createSecrets } = require("../../../utils/ServiceToken");
const { isEmpty } = require("../../../utils/validator.helper");
const STATUS_SUCCESS = 'Success';
const STATUS_FAILURE = 'Failure';

exports.Health = async (req, res) => {
  console.log('req', 'Ingresando a /satqs/api/v1/auditoria/health');
  return res.status(enum_.CODE_OK).send(
    await magic.ResponseService(STATUS_SUCCESS, '', 'Success Response', { Project: 'SATQS_hello ',db_host: process.env.DB_HOST }));
};

exports.SignIn = async (req, res) =>{
    try{
        const user = req.body.user;
        const password = req.body.password;
        const deviceId = req.body.deviceId;

        const validateData = await authOrm.GetByCode(user);
        if(isEmpty(validateData))
            return res.status(200).send({ message: "Usuario y/o password incorrectos",status: false });
        const storedPass = validateData[0].PASSWORD;
        /* let claveEncryp=bcrypt.hashSync(password);
        console.log("Hola clave encriptada ",claveEncryp); */
        const pass = await checkPassword(password,storedPass);
        if (!pass)
            return res.status(200).send({ message: "Usuario y/o password incorrectos",status: false });
        const checkAuth = await authOrm.GetUserData(user, storedPass, deviceId);
        const authorize = createSecrets();
        // console.log("salidaddd ***** ",checkAuth);
        if (checkAuth.length === 0)
            return res.status(200).send({ message: "No tiene módulos asignados",status: false });
        //creamos una variable con la hora actual
        const timeCreation = moment().unix();
        //creamos el token
        const tokenMake = await createToken(checkAuth[0], timeCreation);
        // const tokenMake = await createToken(checkAuth, timeCreation);
        //validamos si se creó el token
        if (!tokenMake.status)
            return res.status(200).send({ message: "Ocurrió un error",status: false });
        //asignamos el token a la variable token
        let token = tokenMake.token;
        let payload = tokenMake.payload;
        // console.log("Imprimo tocken ",token);
        // console.log("Imprimo payloa",payload);
        //si todo esta ok, procede a dar acceso

        return res.status(200).send({
            message: "Acceso correcto",
            status: true,
            token: token,
            userData: payload,
            userModules: checkAuth,
            userAuthorizes: authorize
        });
    } catch(err) {
      console.log('err', err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(
            await magic.ResponseService(STATUS_FAILURE, enum_.CRASH_LOGIC, err, ''));
    }
}


async function checkPassword(password,storedPass) {
    return new Promise(resolve => {
        // console.log("pass********* ",password);
        // console.log("store pass******* ",storedPass);
        bcrypt.compare(password, storedPass, async (err, response) => {
            if (err) resolve(false);
            if (!response) resolve(false);
            resolve(true);
        });
    });
}

exports.Verify = async (req, res) =>{
    try {
        let token    = req.body.token;
        let deviceId = req.body.deviceId;
        const validate       = await validateToken(token);
        const user           = validate.userData.code;
        const validateData   = await authOrm.GetByCode(user);
        const password       = validateData[0].PASSWORD
        const checkAuth      = await authOrm.GetUserData(user,password,deviceId);
        validate.userModules = checkAuth;
        return res.status(200, validate);
    } catch (err) {
        return res.status(200, { message: "Ocurrió un error", status: false });
    }
}

exports.SignOut = async (req, res) => {
    try {
        const { code, type } = req.body;
        await authOrm.CloseSession(code, type);
    } catch (err) {}
    return res.status(200).send({ message: "Sesión cerrada", status: true });
}