const mongoose = require('mongoose')

const assignmentResultSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  avatar :{
    type: String,
    required: true
  },
  assignmentId: {
    type: String,
    required: true
  },
  score: {
    type: String,
    required: true
  },
  wrongQuestionIds: {
    type: [String],
    required: true
  }
}, { collection: 'AssignmentResult'})

module.exports = mongoose.model('AssignmentResult', assignmentResultSchema)