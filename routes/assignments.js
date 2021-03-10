const express = require('express')
const router = express.Router()
const Assignment = require('../models/assignment.js')
const question = require('../models/question.js')
var Question = require('../models/question.js')

// Getting all
router.get('/', getAllAssignments, async (req, res) => {
  try {
    res.json(res.assignments)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting a specific question from assignment, pass in level=1 in query string to obtain first question
router.get('/question/:id', async (req, res) => {
  try {
    let assignment = await Assignment.findById(req.params.id)
    if (assignment == null) {
      return res.status(404).json({ message: 'Cannot find assignment' })
    }
    res.status(200).send(
      assignment.questionIds[req.query.level-1]
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

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
      res.status(201).json(updatedAssignment)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

// Deleting One
router.delete('/:id', getAssignment, async (req, res) => {
    try {
      await res.assignment.remove()
      res.status(201).json({ message: 'Deleted Assignment' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

// Creating assignment with random questions 
router.post('/player_create',  async (req, res ) => {
    try {
      questionIds = [];
      console.log(req.body);
      for (var question of req.body.data){
        console.log(question);
        selectedCategory = question.category;
        selectedDifficulty = question.difficulty; 
        const queriedQuestions = await Question.find({
          category: selectedCategory,
          difficulty: selectedDifficulty
        });
        var random = Math.floor(Math.random() * queriedQuestions.length)
        var selectedQuestion = queriedQuestions[random];
        console.log(selectedQuestion)
        questionIds.push(selectedQuestion._id);
      }
      try {
        const asg = new Assignment({
          name: "student created",
          questionIds: questionIds,
        })
        const newAssignment = await asg.save()
        res.status(201).json(newAssignment)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
      
    }
    catch (err) {
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