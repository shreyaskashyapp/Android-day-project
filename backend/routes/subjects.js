const Subjects = require("../models/subjects.model")
const router = require('express').Router()

router.route('/').get((req,res)=>{
  Subjects.find()
    .then(data => res.json(data))
    .catch(err => res.status(200).json("error "+err))
})

router.route('/add').post((req,res) =>{
  const softwareTesting= req.body.softwareTesting;
  const fileStructures= req.body.fileStructures;
  const dataMining= req.body.dataMining;
  const webTechnology=req.body.webTechnology;

  const newData = new Subjects({softwareTesting,fileStructures,dataMining,webTechnology})
  newData.save()
    .then(() => res.json("New data added succesfully"))
    .catch(err => res.status(200).json("error "+err)) 
})

module.exports = router
