const express = require("express");
const router = express.Router();
var models = require("../models");
var fs = require("fs");
var multer = require('multer');
const ctrl = require('./controller');
const mongoose = require('mongoose');

// get user data using email
router.get("/getUserInfo/:email", function (req, res) {
  models.UserData.findOne({ email: req.params.email }).populate('myJobs')
    .then(dbModel => res.json(dbModel))
    .catch(err => {
      console.error(err);
      res.status(422).json(err)
    });
});

// get jobs by zipcode
router.get('/jobs/:zipcode', (req, res) => {
  console.log(req.params);
  models.Job.find({ 'address.zip': req.params.zipcode })
    .then(jobs => res.json(jobs))
    .catch(err => {
      res.status(500).json(err);
      console.error(err);
    })
});

// post a job
router.post('/jobs', (req, res) => {
  models.Job.create(req.body)
    .then(job => {
      console.log('Successfully saved the job.');
      res.json(job);
      return job;
    })
    // save the job to the user owner
    .then(job => {
      const id = req.body.owner;
      models.UserData.findById(id, (err, user) => {
        if (err) console.error(err);
        user.myJobs.push(job._id);
        user.save(err => {
          if (err) console.error(err);
          console.log('Successfully saved the job to the user owner.')
        })
      })
    })
    .catch(err => {
      res.status(500).json(err);
      console.error(err);
    })
})

// post user address
router.post("/updateAdress", function (req, res) {
  console.log("in routes update address " + req.body.address1)
  models.UserData.findOneAndUpdate({ _id: req.body.id }, { 'address.address1': req.body.address1, 'address.address2': req.body.address2, 'address.state': req.body.state, 'address.city': req.body.city, 'address.zip': req.body.zip })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

// post user skill
router.post("/updateSkills", function (req, res) {
  console.log("in routes update skills " + req.body.skills)
  console.log("iddddd" + req.body.id)
  models.UserData.findOneAndUpdate({ _id: req.body.id }, { skills: req.body.skills })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

// post user image
router.post("/saveimage", function (req, res) {
  console.log("in routes update image " + req.body.file)
  models.UserData.findOneAndUpdate({ email: req.body.email }, { image: req.body.file })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

router.post("/savebid", function (req, res) {

  let bids =
  {
    user: req.body.user,
    price: req.body.priceNumber,
    status: req.body.status,
  }
  console.log(bids)
  console.log(req.body.jobId)
  models.Job.findOneAndUpdate({ _id: req.body.jobId }, { bids: bids })
    .then(dbModel => console.log(dbModel))
    .then(() => {
      models.UserData.findOneAndUpdate({ _id: req.body.user }, { $push: { myBids: req.body.jobId } })
        .then(data => res.json("successfully submitted a bid"))
    })

    .catch(err => console.error(err));
});

router.get("/findbids/:id", function (req, res) {
  console.log(req.params.id)
  models.Job.findOne({ _id: req.params.id })
    .then( dbModel => res.json(dbModel))
    .catch(err => console.error(err));
});

// rest API
/*-------------------------------------------------------*/

// Job
router.get('/job', ctrl.Job.find);
router.get('/job/:id', ctrl.Job.findById);
router.get('/job/populate/:id/:field', ctrl.Job.populate);
router.delete('/job/delete', ctrl.Job.delete);
router.put('/job/update/:id/:method', ctrl.Job.put);
router.post('/job/post', ctrl.Job.post);

// UserData
router.get('/userData', ctrl.UserData.find);
router.get('/userData/:id', ctrl.UserData.findById);
router.get('/userData/populate/:id/:field', ctrl.UserData.populate);
router.delete('/userData/delete', ctrl.UserData.delete);
router.put('/userData/update/:id/:method', ctrl.UserData.put);

// Bid

router.put('/bid/confirm', (req, res) => {
  models.Job.findById(req.body.jobId)
    .then(job => {
      const bids = [...job.bids];
      bids.forEach(bid => {
        if (req.body.userId == bid.user) bid.status = 'active'
        else bid.status = 'denied'
      })
      return bids;
    })
    .then(bids => {
      models.Job.findByIdAndUpdate(req.body.jobId, { bids: bids }, { new: true })
        .then(job => res.json(job))
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
})

router.post("/savebid", function (req, res) {
  console.log("in routes update image " + req.body.id + "price" + req.body.price)
  let bids = { user: req.body.user, price: req.body.price, status: "pending" }
  console.log(bids)
  // models.jobs.findOneAndUpdate({ _id: req.body.id }, { bids: bids })
  //   .then(dbModel => res.json(dbModel))
  //   .catch(err => res.status(422).json(err));
});

// rest API
/*-------------------------------------------------------*/

// Job
router.get('/job', ctrl.Job.find);
router.get('/job/:id', ctrl.Job.findById);
router.get('/job/populate/:id/:field', ctrl.Job.populate);
router.delete('/job/delete', ctrl.Job.delete);
router.put('/job/update/:id/:method', ctrl.Job.put);
router.post('/job/post', ctrl.Job.post);

// UserData
router.get('/userData', ctrl.UserData.find);
router.get('/userData/:id', ctrl.UserData.findById);
router.get('/userData/populate/:id/:field', ctrl.UserData.populate);
router.delete('/userData/delete', ctrl.UserData.delete);
router.put('/userData/update/:id/:method', ctrl.UserData.put);

// Bids
router.get('/bids', (req, res) => {
  const jobIds = []
  req.query.jobIds.forEach(id => {
    const objectId = mongoose.Types.ObjectId(id);
    jobIds.push(objectId);
  })
  models.Job.find({
    '_id': {
      $in: jobIds
    }
  })
    .then(jobs => {
      res.send(jobs)
    })
    .catch(err => res.status(422).json(err));
})

module.exports = router;