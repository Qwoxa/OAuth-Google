const router = require('express').Router();
const authController = require('../controllers/auth');

router.get('/login', authController.getLogin);

router.get('/google', authController.authGoogle);

router.get('/google/redirect', authController.googleRedirect, authController.redirectAfterCb);

router.get('/logout', authController.logout);

module.exports = router;
