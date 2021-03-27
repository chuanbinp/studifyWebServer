const express = require('express')
const router = express.Router()
const Resource = require('../models/resource.js')

// Getting all
router.get('/', async (req, res) => {
  try {
      const resources = await Resource.find()
      res.json(resources)
      console.log("Get All Resources")
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting by category
router.get('/campaignvideo', async (req, res) => {
  try {
      const resources = await Resource.findOne({
        category: req.query.category,
      })
      res.json(resources)
      console.log("Get a specific category Resource")
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Creating one
router.post('/', async (req, res) => {
    const resrc = new Resource({
      name: req.body.name,
      category: req.body.category,
      difficulty: req.body.difficulty,
      url: req.body.url
    })
    try {
      const newResource = await resrc.save()
      res.status(201).json(newResource)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

// Updating One
router.patch('/:id', getResource, async (req, res) => {
    res.resource.name = req.body.name
    res.resource.category = req.body.category
    res.resource.difficulty = req.body.difficulty
    res.resource.url = req.body.url

    try {
      const updatedResource = await res.resource.save()
      res.status(201).json(updatedResource)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

// Deleting One
router.delete('/:id', getResource, async (req, res) => {
    try {
      await res.resource.remove()
      res.status(201).json({ message: 'Deleted Resource' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

async function getResource(req, res, next) {
    let resource
    try {
        resource = await Resource.findById(req.params.id)
        if (resource == null) {
        return res.status(404).json({ message: 'Cannot find resource' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.resource = resource
    next()
}

module.exports = router