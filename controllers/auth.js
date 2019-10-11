const getLogin = (req, res, next) => {
    res.render('login');
};

const googleRedirect = (req, res, next) => {
    res.redirect('/profile');
};

const logout = (req, res, next) => {
    req.logout();
    res.redirect('/');
};


module.exports = {
    getLogin,
    googleRedirect,
    logout
};