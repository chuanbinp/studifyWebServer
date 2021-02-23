const express = require('express')
const router = express.Router()
const CampaignResult = require('../models/campaignResult.js')

// Getting all
router.get('/', async (req, res) => {
  try {
      const campaignResults = await CampaignResult.find()
      res.json(campaignResults)
      console.log("Get All Campaign Results")
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Creating one
router.post('/', async (req, res) => {
    const cResult = new CampaignResult({
      userId: req.body.userId,
      easyRE: req.body.easyRE,
      easySD: req.body.easySD,
      easySV: req.body.easySV,
      easySM: req.body.easySM,
      medRE: req.body.medRE,
      medSD: req.body.medSD,
      medSV: req.body.medSV,
      medSM: req.body.medSM,
      advRE: req.body.advRE,
      advSD: req.body.advSD,
      advSV: req.body.advSV,
      advSM: req.body.advSM
    })
    try {
      const newCampaignResult = await cResult.save()
      res.status(201).json(newCampaignResult)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

// Updating One
router.patch('/:id', getCampaignResult, async (req, res) => {
    res.campaignResult.userId = req.body.userId
    res.campaignResult.easyRE = req.body.easyRE
    res.campaignResult.easySD = req.body.easySD
    res.campaignResult.easySV = req.body.easySV
    res.campaignResult.easySM = req.body.easySM
    res.campaignResult.medRE = req.body.medRE
    res.campaignResult.medSD = req.body.medSD
    res.campaignResult.medSV = req.body.medSV
    res.campaignResult.medSM = req.body.medSM
    res.campaignResult.advRE = req.body.advRE
    res.campaignResult.advSD = req.body.advSD
    res.campaignResult.advSV = req.body.advSV
    res.campaignResult.advSM = req.body.advSM
    try {
      const updatedCampaignResult = await res.campaignResult.save()
      res.json(updatedCampaignResult)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

// Deleting One
router.delete('/:id', getCampaignResult, async (req, res) => {
    try {
      await res.campaignResult.remove()
      res.json({ message: 'Deleted Campaign Result' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

async function getCampaignResult(req, res, next) {
    let campaignResult
    try {
        campaignResult = await CampaignResult.findById(req.params.id)
        if (campaignResult == null) {
        return res.status(404).json({ message: 'Cannot find Campaign Result' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.campaignResult = campaignResult
    next()
}

module.exports = router