const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const authRoutes = require('./api/routes/auth');
const profileRoutes = require('./api/routes/profile');
const cookieSession = require('cookie-session');

// read .env, connect db, setup password
require('dotenv').config();
require('./api/utils/connect-db');
require('./api/config/passport-setup');

// create app
const app = express();

// middleware and engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());


// cookies
app.use(cookieSession(
   {
      maxAge: 864e5,
      keys: [process.env.COOKIE_KEY]
   }
));
app.use(passport.initialize());
app.use(passport.session());


// routes and route middleware
app.use('/assets', express.static('assets'));
app.get('/', (req, res) => {
   res.render('home', { user: req.user });
});
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);


// handle errors
app.use((err, req, res, next) => {
   if (err.headerSent) {
      next(err);
   }
   
   const statusCode = err.statusCode || 500;
   res.status(statusCode).json({
      error: {
         message: err.message,
         statusCode
      }
   });
});


app.listen(process.env.PORT, () => {
    console.log(`Running on the port ${process.env.PORT}`);
});