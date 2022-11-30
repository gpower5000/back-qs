'use strict';

const express = require('express'),
    router = express.Router(),
    enum_ = require('../../common/util/enum');
// The following services were added for Hygen
const typeDoc = require('./type_doc/service');
const offline = require('./offline/service');
const role = require('./role/service');
const user = require('./user/service');
const profileMaintenance = require('./profile_maintenance/service');
const auth = require('./auth/service');
const box = require('./box/service');
const audit = require('./audit/service');
// The following describes were added for Hygen
console.log('[[ DATACENTER ]]');
console.log(enum_.CYAN_LOG, '[GET] = /');
// The following routers were added for Hygen
const authRoute = async (req, res, next = console.error) => (
    await offline.DontAppUserKey(req, res, next)
)

router.get('/health/', auth.Health);
/*** Login */
router.post('/login/', auth.SignIn);
router.get('/role', role.GetAllRole);
router.post('/user', authRoute, user.SaveUser);
router.get('/user/id', user.GetUserById);
router.delete('/user/:id', authRoute, user.DeleteUserById);
router.patch('/user/:id', authRoute, user.UpdateUserById);
router.get('/user/type-user', user.GetAllTypeUser);
router.get('/user/state', user.GetAllState);
router.get('/user/excel', user.GenerateExcelReport);
router.post('/user/store', user.SaveUserStore);/* Locales asignados por usuario */
router.post('/user/wms', user.UpdateUserByWMS);/* Actualizar las credenciales de wms del usuario creado */

router.get('/profile-maintenance', authRoute, profileMaintenance.GetAllProfile);
router.post('/profile-maintenance', authRoute, profileMaintenance.SaveProfile);
router.get('/profile-maintenance/id', profileMaintenance.GetProfileById);
router.delete('/profile-maintenance/:id', authRoute, profileMaintenance.DeleteProfileByID);
router.patch('/profile-maintenance/:id', authRoute, profileMaintenance.UpdateProfileByID);

router.post('/profile-maintenance/views-by-modules', authRoute, profileMaintenance.GetAllModules);
router.post('/profile-maintenance/views-by-rol', authRoute, profileMaintenance.GetAllModulesByRol);
router.post('/profile-maintenance/iu-rol', authRoute, profileMaintenance.InsertUpdateRolDetails);
router.get('/profile-maintenance/excel', profileMaintenance.GenerateExcelReport);

router.get('/box/get-container', authRoute, box.GetContainerOBLPN);
router.post('/box/iu-container', authRoute, box.InsertContainerOBLPN);
router.get('/box/get-inventary', authRoute, box.GetInventaryBox);

router.post('/audit/start-or-close-process', authRoute, audit.StartCloseAuditProcess);
router.patch('/audit/update-product-by-lotes', authRoute, audit.UpdateCreateProductByLotes);
router.post('/audit/create-correlative', authRoute, audit.CreateCorrelative);
router.post('/audit/tray-inventory', authRoute, audit.InsertInventaryBox);

router.get('/type-document', typeDoc.GetAllTypeDocument);

module.exports = router;