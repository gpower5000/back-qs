
const path = require('path');
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const YAML = require('yamljs');
const dirPath = path.join(__dirname, '../config.yml');
const config = YAML.load(dirPath);
const env = require("./env");

function createToken(user, timeCreation) {
  return new Promise(resolve => {
    const payload = {
      code: user.USUARIO,
      nombre: user.NOMBRE,
      apepat: user.APE_PATERNO,
      apemat: user.APE_MATERNO,
      userId: user.USER_ID,
      currentFacilyCode: user.FACILITY_CODE,
      currentFacilyId: user.FACILY_ID,
      companyCode: user.COMPANY_CODE,
      companyId: user.COMPANY_ID,
      timeStamp: timeCreation
    };

    jwt.sign(payload, env.APP_KEY, (error, token) => {
      if (error) {
        resolve({ status: false });
      } else {
        resolve({ status: true, token, payload });
      }
    });
  });
}

function validateToken(token) {
  return new Promise(resolve => {
    jwt.verify(token, env.APP_KEY, (error, decoded) => {
      // console.log("decoded=",decoded)
      if (!decoded) resolve({ message: "Acceso no autorizado", status: false });
      delete decoded.iat;
      if (error) resolve({ message: "Acceso no autorizado", status: false });
      let userId = decoded.id;
      let timeStamp = decoded.timeStamp;
      resolve({
        message: "Acceso correcto",
        status: true,
        userData: decoded,
        token
      });
    });
  });
}

function generateKey() {
  const timestamp = (new Date()).getTime();
  const random = Math.round(Math.random(1)*5,0);
  const baseKey = base64Encode(timestamp+env.APP_SECRET);
  const dropLetter = baseKey.length-(random >= baseKey.length ? 0 : random);
  const subsLetter = baseKey.substring(1,dropLetter);

  return `$${subsLetter}${random}=`;
}

function createSecrets() {
  const key = generateKey();
  const user = AESEncode(config.wms.username, key);
  const pass = AESEncode(config.wms.password, key);
  const apis = AESEncode(config.wms.endpoint, key);

  return {
    wms: {
      key, user, pass, apis
    }
  };
}

function base64Encode(data) {
  return Buffer.from(data).toString('base64');
}

function base64Decode(data) {
  let buff = Buffer.from(data, "base64");
  let text = buff.toString("ascii");
  return text;
}

function AESEncode(str, key) {
  return CryptoJS.AES.encrypt(JSON.stringify(str), key).toString();
}

function AESDecode(chiperText, key) {
  try {
    const bytes = CryptoJS.AES.decrypt(chiperText || '', key);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(originalText);
  } catch (e) {
    return null;
  }
}

module.exports = {
  createToken,
  validateToken,
  generateKey,
  createSecrets,
  base64Encode,
  base64Decode,
  AESEncode,
  AESDecode
};