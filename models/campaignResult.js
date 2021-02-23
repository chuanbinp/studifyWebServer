const mongoose = require('mongoose')

const campaignResultSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  easyRE: {
    type: String,
    required: true
  },
  easySD: {
    type: String,
    required: true
  },
  easySV: {
    type: String,
    required: true
  },
  easySM: {
    type: String,
    required: true
  },
  medRE: {
    type: String,
    required: true
  },
  medSD: {
    type: String,
    required: true
  },
  medSV: {
    type: String,
    required: true
  },
  medSM: {
    type: String,
    required: true
  },
  advRE: {
    type: String,
    required: true
  },
  advSD: {
    type: String,
    required: true
  },
  advSV: {
    type: String,
    required: true
  },
  advSM: {
    type: String,
    required: true
  }
}, { collection: 'CampaignResult'})

module.exports = mongoose.model('CampaignResult', campaignResultSchema)