const express = require('express')
const router = express.Router()
const Assignment = require('../models/assignment.js')
const Question = require('../models/question')

// Getting all
router.get('/', getAllAssignments, async (req, res) => {
  try {
    res.json(res.assignments)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Creating one
router.post('/', async (req, res) => {
    const asg = new Assignment({
      name: req.body.name,
      questionIds: req.body.questionIds,
    })
    try {
      const newAssignment = await asg.save()
      res.status(201).json(newAssignment)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

// Updating One
router.patch('/:id', getAssignment, async (req, res) => {
    res.assignment.name = req.body.name
    res.assignment.questionIds = req.body.questionIds

    try {
      const updatedAssignment = await res.assignment.save()
      res.json(updatedAssignment)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

// Deleting One
router.delete('/:id', getAssignment, async (req, res) => {
    try {
      await res.assignment.remove()
      res.json({ message: 'Deleted Assignment' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

async function getAssignment(req, res, next) {
    let assignment
    try {
        assignment = await Assignment.findById(req.params.id)
        if (assignment == null) {
        return res.status(404).json({ message: 'Cannot find assignment' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.assignment = assignment
    next()
}

async function getAllAssignments(req, res, next) {
    let assignments

    try {
        assignments = await Assignment.find().lean()
        if (assignments == null) {
            return res.status(404).json({ message: 'Cannot find assignments' })
        }
        
        await Promise.all(assignments.map(async (asg) => {
                asg["questions"] = []
        }))
 
        await Promise.all(assignments.map(async (asg) => {
            
            await Promise.all(asg.questionIds.map(async (qId) => {
                var qns = await Question.findById(qId)
                asg.questions.push(qns)
            }))

        }))

        res.assignments = assignments

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    next()
}

module.exports = router