const express = require('express')
const router = express.Router()
const Question = require('../models/question')

// Getting all
router.get('/', async (req, res) => {
  try {
      const questions = await Question.find()
      res.json(questions)
      console.log("Get All Questions")
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting one
router.get('/:id', getQuestion, async (req, res) => {
    try {
        res.json(res.question)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

// Creating one
router.post('/', async (req, res) => {
    const qns = new Question({
      question: req.body.question,
      category: req.body.category,
      difficulty: req.body.difficulty,
      options: req.body.options,
      answer: req.body.answer,
    })
    try {
      const newQuestion = await qns.save()
      res.status(201).json(newQuestion)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

// Updating One
router.patch('/:id', getQuestion, async (req, res) => {
    res.question.question = req.body.question
    res.question.category = req.body.category
    res.question.difficulty = req.body.difficulty
    res.question.options = req.body.options
    res.question.answer = req.body.answer
    try {
      const updatedQuestion = await res.question.save()
      res.status(201).json(updatedQuestion)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

// Deleting One
router.delete('/:id', getQuestion, async (req, res) => {
    try {
      await res.question.remove()
      res.status(201).json({ message: 'Deleted Question' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

async function getQuestion(req, res, next) {
    let question
    try {
        question = await Question.findById(req.params.id)
        if (question == null) {
        return res.status(404).json({ message: 'Cannot find question' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.question = question
    next()
}

module.exports = router