module.exports = {

  find: (req, res, model) => {
    model.find(req.query)
      .then(dbItem => res.json(dbItem))
      .catch(err => {
        console.error(err);
        res.status(500).json(err);
      })
  },

  findById: (req, res, model) => {
    model.findById(req.params.id)
      .then(dbItem => res.json(dbItem))
      .catch(err => {
        console.error(err);
        res.status(500).json(err);
      })
  },

  populate: (req, res, model) => {
    model.findById(req.params.id).populate(req.params.field)
      .then(dbItem => res.json(dbItem))
      .catch(err => {
        console.error(err);
        res.status(500).json(err);
      })
  },

  delete: (req, res, model) => {
    model.deleteOne(req.params)
      .then(() => res.json('deleted'))
      .catch(err => {
        console.error(err);
        res.status(500).json(err);
      })
  },

  put: (req, res, model) => {
    model.findByIdAndUpdate(req.params.id, { [req.params.method]: req.body })
      .then(dbItem => res.json(dbItem))
      .catch(err => {
        console.error(err);
        res.status(500).json(err);
      })
  }
}