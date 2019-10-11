const mongoose = require('mongoose');

// connect mongodb
const DB_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(process.env.DB_URI, DB_OPTIONS)
.then(() => console.log('DB connected'))
.catch(console.error.bind('DB connection error'));
