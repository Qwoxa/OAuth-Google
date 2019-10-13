// read .env file
require('dotenv').config();

// setup passport.js settings
require('./passport-setup');

// connect mognodb
require('./connect-db');