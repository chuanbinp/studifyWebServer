const mongoose = require('mongoose')

const assignmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  assignmentType: {
    type: String,
    required: true
  },
  questionIds: {
    type: [String],
    required: true
  }
}, { collection: 'Assignment'})

module.exports = mongoose.model('Assignment', assignmentSchema)