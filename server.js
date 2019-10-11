const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
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
app.use('/assets', express.static('assets'));
app.use('/auth', authRoutes);


// route middleware
app.get('/', (req, res) => {
    res.render('home');
});


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