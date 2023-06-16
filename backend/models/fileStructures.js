const mongoose =require('mongoose')
const fileStructuresSchema = new mongoose.Schema({
  total:{
    type: String,
    required:true
  },
},{
  timestamps:true
})

const fileStructures = mongoose.model("fileStructures",fileStructuresSchema);
module.exports = fileStructures;