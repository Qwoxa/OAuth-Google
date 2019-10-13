const router = require('express').Router();
const { authCheck } = require('../middleware');
const { profileController : ctrl } = require('../controllers');

router.get('/', authCheck, ctrl.getProfile)

module.exports = router;
