const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/User');

var _ = require('lodash');
var path = require('path');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        let fileName = file.originalname.split('.');
        let extension = fileName[fileName.length-1];
        fileName.splice(-1,1);
        fileName = fileName.join('');
      cb(null, fileName + '-' + Date.now()+'.'+extension);
    }
});
var upload = multer({storage: storage});

var fileFilter = function(req, file, cb) {
// supported image file mimetypes
    var allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];

    if (_.includes(allowedMimes, file.mimetype)) {
        // allow supported image files
        cb(null, true);
        } else {
        // throw error for invalid files
        cb(new Error('Invalid file type. Only jpg, png and gif image files are allowed.'));
    }
};


router.post('/register', function(req, res) {
    User.findOne({
        mobile: req.body.mobile
    }).then(user => {
        if(user) {
            return res.status(400).json({
                message: 'Mobile Number is already Registered'
            });
        } else {
            const newUser = new User({
                name: req.body.name,
                mobile: req.body.mobile,
                profilePicture: req.body.profilePicture
            });
            bcrypt.genSalt(10, (err, salt) => {
                newUser
                .save()
                .then(user => {
                    res.json(user)
                });
            });
        }
    });
});

router.get('/dashboard', (req, res) => {
    User.find({mobile:req.query.userId})
    .then((result, err) => {
        if (err) {
            return console.dir(err);
        }
       res.status(200).send(result);
    });
});

router.post('/upload', upload.single('avatar'), (req, res, next) => {
    var data = {};
    data.fileUrl = req.protocol+'://'+req.hostname+':'+PORT+'/'+req.file.filename;
    res.json({reqFile:req.file, data:data});
});

module.exports = router;