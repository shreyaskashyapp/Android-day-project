const mongoose =require('mongoose')
const webTechnologySchema = new mongoose.Schema({
  total:{
    type: String,
    required:true
  },
},{
  timestamps:true
})

const webTechnology = mongoose.model("webTechnology",webTechnologySchema);
module.exports = webTechnology;