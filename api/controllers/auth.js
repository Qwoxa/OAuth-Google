const passport = require('passport');

const getLogin = (req, res, next) => {
    if (req.user) res.redirect('/');
    res.render('login', { user: req.user });
};

const authGoogle = passport.authenticate('google', {
    scope: ['profile']
});

const googleRedirect = passport.authenticate('google', {
    failureRedirect: '/login'
});

const redirectAfterCb = (req, res, next) => {
    res.redirect('/profile');
};

const logout = (req, res, next) => {
    req.logout();
    res.redirect('/');
};


module.exports = {
    getLogin,
    authGoogle,
    googleRedirect,
    redirectAfterCb,
    logout
};