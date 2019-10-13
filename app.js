const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
const routes = require('./api/routes');
const { errors } = require('./api/middleware');

// read .env, connect db, setup password
require('./api/config');

// create app
const app = express();
const PORT = process.env.PORT || 3000;

// middleware and engine and cookies
app.set('view engine', 'ejs');
app.use(bodyParser.json());
const params = { maxAge: 864e5, keys: [process.env.COOKIE_KEY] };
app.use(cookieSession(params));
app.use(passport.initialize());
app.use(passport.session());


// routes and route middleware
app.use('/assets', express.static('assets'));
app.get('/', routes.publicRoutes);
app.use('/auth', routes.authRoutes);
app.use('/profile', routes.profileRoutes);


// handle 404 and other errors
app.use(errors.notFound);
app.use(errors.handleErrors);


app.listen(PORT, () => {
    console.log(`Running on the port ${PORT}`);
});