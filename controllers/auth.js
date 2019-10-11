const getLogin = (req, res, next) => {
    res.render('login');
};

const googleRedirect = (req, res, next) => {
    console.log(req.params);
    res.json(req.body);
};

const logout = (req, res, next) => {
    res.json({ msg: 'logout' });
};


module.exports = {
    getLogin,
    googleRedirect,
    logout
};