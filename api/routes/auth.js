const router = require('express').Router();
const { authController : ctrl } = require('../controllers');

router.get('/login', ctrl.getLogin);

router.get('/google', ctrl.authGoogle);

router.get('/google/redirect', ctrl.googleRedirect, ctrl.redirectAfterCb);

router.get('/logout', ctrl.logout);

module.exports = router;
