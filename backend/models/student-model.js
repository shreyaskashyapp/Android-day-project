const mongoose = require('mongoose');
const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  softwareTesting: {
    type: String
  },
  fileStructures: {
    type: String
  },
  dataMining: {
    type: String
  },
  webTechnology: {
    type: String
  },
}, {
    timestamps: true
  }
);
const Students= mongoose.model("Students",studentSchema);
module.exports = Students