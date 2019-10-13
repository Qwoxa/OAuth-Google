const router = require('express').Router();
const { publicController : ctrl } = require('../controllers');

router.get('/', ctrl.getHome);

module.exports = router;
