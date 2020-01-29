const express = require("express");
const router = express.Router();
var models = require("../models");
var fs = require("fs");
var multer  = require('multer');


var storage = multer.diskStorage({
  destination: 'uploads',
  filename: function (req, file, cb) {
    console.log("lllllllllllllll"+file)
      switch (file.mimetype) {
          case 'image/jpeg':
              ext = '.jpeg';
              break;
          case 'image/png':
              ext = '.png';
              break;
      }
      cb(null, file.originalname + ext);
  }
});

 
var upload = multer({ storage: storage }).single('image')




 router.post('/', function (req, res) {

  console.log(JSON.stringify(req.body.image)) // form fields
console.log(req.file) // form files
console.log(req.body.file) // form files

    console.log(req.body.image)
    upload(req, res, function (err) {
      if (err) {
       console.log(err)
      }
      res.send(req.body.file);
      // Everything went fine
    })
  })



module.exports = router;