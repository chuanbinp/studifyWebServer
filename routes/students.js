const express = require('express')
const router = express.Router()
const Student = require('../models/student.js')

// Getting all
router.get('/', async (req, res) => {
  try {
      const students = await Student.find()
      res.json(students)
      console.log("Get All Students")
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Creating one
router.post('/', async (req, res) => {
    const stud = new Student({
      name: req.body.name,
      matricNo: req.body.matricNo,
      tutorialGrp: req.body.tutorialGrp,
      username: req.body.username,
      password: req.body.password,
    })
    try {
      const newStudent = await stud.save()
      res.status(201).json(newStudent)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

// Updating One
router.patch('/:id', getStudent, async (req, res) => {
    res.student.name = req.body.name
    res.student.matricNo = req.body.matricNo
    res.student.tutorialGrp = req.body.tutorialGrp
    res.student.username = req.body.username
    res.student.password = req.body.password

    try {
      const updatedStudent = await res.student.save()
      res.json(updatedStudent)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

// Deleting One
router.delete('/:id', getStudent, async (req, res) => {
    try {
      await res.student.remove()
      res.json({ message: 'Deleted Student' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

async function getStudent(req, res, next) {
    let student
    try {
        student = await Student.findById(req.params.id)
        if (student == null) {
        return res.status(404).json({ message: 'Cannot find student' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.student = student
    next()
}

module.exports = router