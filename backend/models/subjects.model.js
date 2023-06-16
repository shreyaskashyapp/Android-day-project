const mongoose= require('mongoose');
const subjectSchema = new mongoose.Schema({
  softwareTesting:{
    type:String
  },
  fileStructures:{
    type:String
  },
  dataMining:{
    type:String
  },
  webTechnology:{
    type:String
  },
},
{
  timestamps:true
})
const Subjects = mongoose.model("Subjects",subjectSchema)
module.exports =Subjects;