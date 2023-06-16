const mongoose =require('mongoose')
const dataMiningSchema = new mongoose.Schema({
  total:{
    type: String,
    required:true
  },
},{
  timestamps:true
})

const dataMining = mongoose.model("dataMining",dataMiningSchema);
module.exports = dataMining;