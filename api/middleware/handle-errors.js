module.exports.notFound = (req, res, next) => {
   res.status(404).render('errors', {
      message: 'Oops, Not Found..',
      statusCode: 404
   });
};

module.exports.handleErrors = (err, req, res, next) => {
    if (err.headerSent) {
      return next(err);
    }
    
    const statusCode = err.statusCode || 500;
    res.status(statusCode).render('errors', {
      message: err.message,
      statusCode
    });
};
