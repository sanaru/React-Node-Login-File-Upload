// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const passport = require('passport');
const config = require('./db');

const users = require('./routes/user');
var dotenv = require('dotenv').config();
var _ = require('lodash');
var path = require('path');
var multer = require('multer');


mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

const app = express();
// app.use(passport.initialize());
// require('./passport')(passport);
app.use(express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/app_client/build/index.html'));
});

PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});