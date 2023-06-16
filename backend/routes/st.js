const St = require('../models/softwareTesting');
const router = require('express').Router();

router.route('/').get((req,res) => {
  St.find()
    .then(data => res.json(data))
    .catch(err => res.status(200).json("error "+err));
})

router.route('/add').post((req,res) => {
  const total = req.body.total;
  const newSt = new St({total})

  newSt.save()
    .then(() => res.json("New Total added"))
    .catch(err => res.status(200).json("error "+err));
})

module.exports=router;