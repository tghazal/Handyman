var models = require("../models");
var express = require("express");
var jwt = require('jsonwebtoken');
var router = express.Router();
var helpers = require("./helpers/auth.helpers");
var routeHelpers = require("./helpers/route.helpers");


router.post("/login", function (req, res) {
  var user = {
    email: req.body.email,
    password: req.body.password
  }

  models.User.findOne({ email: user.email })

    .then(function (resp) {
      console.log("findOne")
      if (helpers.checkIfValidPass(resp, user.password)) {
        var expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);
        console.log("tokennnnn")
        res.json({
          token: jwt.sign({
            exp: parseInt(expiry.getTime() / 1000),
            name: resp.name,
            email: resp.email,
            scaryStuff: "OOGA BOOOGA"
          }, process.env.JWT_SECRET)
        });
      }
      else {
        routeHelpers.sendJsonError(res, new Error("WRONG PASSWORD"), 401);
      }
    })
    .catch(function (err) {
      routeHelpers.sendJsonError(res, err);
    })
});

// Create a new user
router.post("/register", function (req, res) {
  var user = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,

  }
  var salt = helpers.getSalt();

  var userInstance = {
    salt: salt,
    email: user.email,
    hash: helpers.getHash(salt, user.password),
    name: user.name,

  }

  models.User.create(userInstance)
    .then(user => {
      console.log('User created id:\n' + user.id + '\n');
      return user.id
    })
    .then(id => {
      createUserData(userInstance.name, userInstance.email, userData => {
        console.log('UserData created id:\n' + userData.id + '\n')
        res.json({ userData: userData, userId: id })
      })
    })
    .catch(err => res.status(422).json(err));
});

function createUserData(name, email, cb) {
  models.UserData.create({ firstName: name, email: email })
    .then(userData => {
      cb(userData);
    })
    .catch(err => res.status(422).json(err));
}

module.exports = router;
