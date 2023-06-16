const mongoose =require('mongoose')
const softwareTestingSchema = new mongoose.Schema({
  total:{
    type: String,
    required:true
  },
},{
  timestamps:true
})

const softwareTesting = mongoose.model("softwareTesting",softwareTestingSchema);
module.exports = softwareTesting;