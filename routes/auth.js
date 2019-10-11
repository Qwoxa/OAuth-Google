const router = require('express').Router();
const authController = require('../controllers/auth');
const passport = require('passport');

router.get('/login', authController.getLogin);

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), authController.googleRedirect);

router.get('/logout', authController.logout);

module.exports = router;
