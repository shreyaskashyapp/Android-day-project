const Fs = require('../models/fileStructures');
const router = require('express').Router();

router.route('/').get((req,res) => {
  Fs.find()
    .then(data => res.json(data))
    .catch(err => res.status(200).json("error "+err));
})

router.route('/add').post((req,res) => {
  const total = req.body.total;
  const newFs = new Fs({total})

  newFs.save()
    .then(() => res.json("New Total added"))
    .catch(err => res.status(200).json("error "+err));
})

module.exports=router;