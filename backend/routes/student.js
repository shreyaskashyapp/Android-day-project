const Students = require('../models/student-model');
const router = require('express').Router();

router.route('/').get((req,res) => {
  Students.find()
    .then(data => res.json(data))
    .catch(err => res.status(200).json("error "+err))
})

router.route('/add').post((req,res) => {
  const name = req.body.name;
  const softwareTesting= req.body.softwareTesting;
  const fileStructures= req.body.fileStructures;
  const dataMining= req.body.dataMining;
  const webTechnology=req.body.webTechnology;

  const newStudent = new Students({name,softwareTesting,fileStructures,dataMining,webTechnology})
  newStudent.save()
    .then(() => res.json("New student data added succesfully"))
    .catch(err => res.status(200).json("error "+err))
});

module.exports =router;