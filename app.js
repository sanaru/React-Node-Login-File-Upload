// app.js
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const passport = require('passport');
const config = require('./db');

const users = require('./routes/user');
var dotenv = require('dotenv').config();
var _ = require('lodash');
var multer = require('multer');


mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

const app = express();
staticFilePath = path.join(__dirname, 'app_client/build');
// Serve static files from the React app
app.use(express.static(staticFilePath));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);
app.get('/api/hello', (req, res) => {return res.status(200).json({message:'hello'}).end()});
// app.get('/image', express.static(staticFilePath));
app.get('/image/:imageName', (req, res) => {
	res.sendFile(staticFilePath+'/'+req.params.imageName);
});
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname+'/app_client/build/index.html'));
});

PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});