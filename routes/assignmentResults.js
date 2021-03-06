const express = require('express')
const router = express.Router()
const AssignmentResult = require('../models/assignmentResult.js')

// Getting all
router.get('/', async(req, res) => {
    try {
        const assignmentResults = await AssignmentResult.find()
        res.json(assignmentResults)
        console.log("Get All Assignment Results")
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Creating one
router.post('/', async(req, res) => {
    console.log(req.body.userId);
    console.log(req.body.userName);
    console.log(req.body.avatar);
    console.log(req.body.assignmentId);
    console.log(req.body.score);
    console.log(req.body.wrongQuestionIds);
    const asgResult = new AssignmentResult({
        userId: req.body.userId,
        userName: req.body.userName,
        avatar: req.body.avatar,
        assignmentId: req.body.assignmentId,
        score: req.body.score,
        avatar: req.body.avatar,
        wrongQuestionIds: req.body.wrongQuestionIds
    })
    try {
        console.log("Creating Assignment results :", asgResult);
        const newAssignmentResult = await asgResult.save()
        res.status(201).json(newAssignmentResult)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating One
router.patch('/:id', getAssignmentResult, async(req, res) => {
    res.assignmentResult.userId = req.body.userId
    res.assignmentResult.userName = req.body.userName
    res.assignmentResult.avatar = req.body.avatar
    res.assignmentResult.assignmentId = req.body.assignmentId
    res.assignmentResult.score = req.body.score
    res.assignmentResult.wrongQuestionIds = req.body.wrongQuestionIds

    try {
        const updatedAssignmentResult = await res.assignmentResult.save()
        res.json(updatedAssignmentResult)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One
router.delete('/:id', getAssignmentResult, async(req, res) => {
    try {
        await res.assignmentResult.remove()
        res.json({ message: 'Deleted Assignment Result' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getAssignmentResult(req, res, next) {
    let assignmentResult
    try {
        assignmentResult = await AssignmentResult.findById(req.params.id)
        if (assignmentResult == null) {
            return res.status(404).json({ message: 'Cannot find Assignment Result' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.assignmentResult = assignmentResult
    next()
}

module.exports = router
