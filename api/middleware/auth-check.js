module.exports =  (req, res, next) => {
    return req.user ? next() : res.redirect('/auth/login');
};