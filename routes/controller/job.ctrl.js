const models = require('../../models');
const helpers = require('./helpers/ctrl.helpers');
const Job = models.Job;

module.exports = {
  find: (req, res) => helpers.find(req, res, Job),
  findById: (req, res) => helpers.findById(req, res, Job),
  populate: (req, res) => helpers.populate(req, res, Job),
  delete: (req, res) => helpers.delete(req, res, Job),
  put: (req, res) => helpers.put(req, res, Job),
  post: (req, res) => {
    Job.create(req.body)
      .then(job => {
        console.log('Successfully saved the job.');
        res.json(job);
        return job;
      })
      // save the job to the user owner
      .then(job => {
        const id = req.body.owner;
        models.UserData.update({ _id: id }, { $push: { myJobs: job._id } })
          .then(() => console.log('Saved job to the owner (user).'))
          .catch(err => console.error(err))
      })
      .catch(err => {
        res.status(500).json(err);
        console.error(err);
      })
  }
}