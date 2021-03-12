const express = require('express')
const router = express.Router()
const CampaignResult = require('../models/campaignResult.js')

// Getting all
router.get('/', generateScoring, async (req, res) => {
  try {
      res.json(res.campaignResults)
      console.log("Get All Campaign Results")
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Creating one
router.post('/', async (req, res) => {
    const cResult = new CampaignResult({
      userId: req.body.userId,
      intro: req.body.intro,
      re: req.body.re,
      sd: req.body.sd,
      sv: req.body.sv,
      sm: req.body.sm,
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
    res.campaignResult.intro = req.body.intro
    res.campaignResult.re = req.body.re
    res.campaignResult.sd = req.body.sd
    res.campaignResult.sv = req.body.sv
    res.campaignResult.sm = req.body.sm

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

// Scoring method
var scoringMechanism = {
  "0": 0,
  "easy": 0,
  "medium": 1,
  "hard": 2
}

async function generateScoring(req, res, next) {
  let campaignResults

  try {
      campaignResults = await CampaignResult.find().lean()
      if (campaignResults == null) {
          return res.status(404).json({ message: 'Cannot find Campaign Results' })
      }
      
      await Promise.all(campaignResults.map(async (cr) => {
              cr["introScore"] = 0
              cr["reScore"] = 0
              cr["sdScore"] = 0
              cr["svScore"] = 0
              cr["smScore"] = 0
      }))

      await Promise.all(campaignResults.map(async (cr) => {
 
          await Promise.all(cr.intro.map(async (rating) => {
              cr.introScore = cr.introScore + scoringMechanism[rating]    
          }))

          await Promise.all(cr.re.map(async (rating) => {
            cr.reScore = cr.reScore + scoringMechanism[rating]    
          }))

          await Promise.all(cr.sd.map(async (rating) => {
            cr.sdScore = cr.sdScore + scoringMechanism[rating]    
          }))

          await Promise.all(cr.sv.map(async (rating) => {
            cr.svScore = cr.svScore + scoringMechanism[rating]    
          }))

          await Promise.all(cr.sm.map(async (rating) => {
            cr.smScore = cr.smScore + scoringMechanism[rating]    
          }))

          cr.introScore = cr.introScore/7
          cr.reScore = cr.reScore/7
          cr.sdScore = cr.sdScore/7
          cr.svScore = cr.svScore/7
          cr.smScore = cr.smScore/7
      }))

      res.campaignResults = campaignResults

  } catch (err) {
      return res.status(500).json({ message: err.message })
  }
  next()
}

module.exports = router