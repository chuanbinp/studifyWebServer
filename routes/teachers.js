const express = require('express')
const router = express.Router()
const Teacher = require('../models/teacher.js')

router.post('/login', async (req, res) => {
    try {
      const authUser = await Teacher.findOne({username : req.body.username});
      
      if (!authUser){
        res.status(401).json({message: "Wrong username or password"})
      }
      else{
        if(authUser.password==req.body.password)
          res.status(201).json(authUser);
        else
         res.status(401).json({message: "Incorrect password"});
      }
      
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})

module.exports = router