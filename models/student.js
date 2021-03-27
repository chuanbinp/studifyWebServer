const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  matricNo: {
    type: String,
    required: true
  },
  tutorialGrp: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  }
}, { collection: 'Student'})

module.exports = mongoose.model('Student', studentSchema)