const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);
const express = require('express');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const rentals = require('./routes/rentals');
const movies = require('./routes/movies'); 
const users = require('./routes/users');
const auth = require('./routes/auth');
const app = express();
const config = require('config');

if(!config.get('jwtPrivateKey')){
    console.log('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1)
}

mongoose.connect('mongodb://localhost/vidly')
    .then(()=> console.log('Connected to db'))
    .catch(err=> console.log('Could not connect' ));

app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customers', customers);  
app.use('/api/rentals',rentals);
app.use('/api/movies',movies);
app.use('/api/users',users);
app.use('/api/auth',auth);

const port = process.env.PORT || 3000 ;
app.listen(port, () => console.log(`Listening to port ${port}`));