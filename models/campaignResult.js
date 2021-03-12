const mongoose = require('mongoose')

const campaignResultSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  intro: {
    type: [String],
    required: true
  },
  re: {
    type: [String],
    required: true
  },
  sd: {
    type: [String],
    required: true
  },
  sv: {
    type: [String],
    required: true
  },
  sm: {
    type: [String],
    required: true
  },
}, { collection: 'CampaignResult'})

module.exports = mongoose.model('CampaignResult', campaignResultSchema)