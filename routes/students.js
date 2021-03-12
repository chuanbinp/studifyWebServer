const express = require('express')
const router = express.Router()
const Student = require('../models/student.js')
var CampaignResult = require('../models/campaignResult.js')

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
    const newStudent = await stud.save().then(async (stud) => {
      await initStudentCampaignResult(stud, res)
      res.status(201).json(stud)
    })
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
    res.status(201).json(updatedStudent)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getStudent, async (req, res) => {
  try {
    await res.student.remove().then(async () => {
      await removeStudentCampaignResult(res.student._id, res)
      res.status(201).json({ message: 'Deleted Student' })
    })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Initialise new student's campaign results as -1 in CampaignResult collection
async function initStudentCampaignResult(student, res) {
  const cResult = new CampaignResult({
    userId: student._id,
    easyRE: "-1",
    easySD: "-1",
    easySV: "-1",
    easySM: "-1",
    medRE: "-1",
    medSD: "-1",
    medSV: "-1",
    medSM: "-1",
    advRE: "-1",
    advSD: "-1",
    advSV: "-1",
    advSM: "-1",
  })
  try {
    const newCampaignResult = await cResult.save()
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Delete student's campaign results using id
async function removeStudentCampaignResult(id, res) {
  let campaignResult
  try {
    campaignResult = await CampaignResult.findOne({ userId: id })
    await campaignResult.remove()
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

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