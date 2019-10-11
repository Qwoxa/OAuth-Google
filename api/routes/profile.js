const router = require('express').Router();
const authCheck = require('../middleware/auth-check');
const profileController = require('../controllers/profile');

router.get('/', authCheck, profileController.getProfile)

module.exports = router;
