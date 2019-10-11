const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const cookieSession = require('cookie-session');
require('dotenv').config();
require('./config/passport-setup');

const app = express();

// connect mongodb
const DB_URI = 'mongodb://localhost:27017/oauth';
const DB_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(DB_URI, DB_OPTIONS)
.then(() => console.log('DB connected'))
.catch(console.error.bind('DB connection error'));


// middleware and engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());

// cookie
app.use(cookieSession({
   maxAge: 864e5,
   keys: [process.env.COOKIE_KEY]
}));
app.use(passport.initialize());
app.use(passport.session());


// route middleware
app.use('/assets', express.static('assets'));
app.get('/', (req, res) => {
   res.render('home');
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