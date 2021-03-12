const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
  name: {
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
  }
}, { collection: 'Teacher'})

module.exports = mongoose.model('Teacher', teacherSchema)