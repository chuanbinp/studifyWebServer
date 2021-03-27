const mongoose = require('mongoose')

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  // difficulty: {
  //   type: String,
  //   required: true
  // },
  url: {
    type: String,
    required: true
  }
}, { collection: 'Resource' })

module.exports = mongoose.model('Resource', resourceSchema)