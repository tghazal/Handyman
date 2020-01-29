const models = require('../../models');
const helpers = require('./helpers/ctrl.helpers');
const UserData = models.UserData;

module.exports = {
  find: (req, res) => helpers.find(req, res, UserData),
  findById: (req, res) => helpers.findById(req, res, UserData),
  populate: (req, res) => helpers.populate(req, res, UserData),
  delete: (req, res) => helpers.delete(req, res, UserData),
  put: (req, res) => helpers.put(req, res, UserData),
}
