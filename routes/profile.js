const router = require('express').Router();

// TODO extract middleware
const authCheck = (req, res, next) => {
    return req.user ? next() : res.redirect('/auth/login');
};

// TODO adjust menu
// TODO extract controller
router.get('/', authCheck, (req, res) => {
    res.render('profile', req.user);
})

module.exports = router;
