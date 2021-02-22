require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
Admin = mongoose.mongo.Admin

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true , dbName: "SSAD"})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const questionsRouter = require('./routes/questions')
const assignmentsRouter = require('./routes/assignments')
const resourcesRouter = require('./routes/resources')
const studentsRouter = require('./routes/students')

app.use('/questions', questionsRouter)
app.use('/assignments', assignmentsRouter)
app.use('/resources', resourcesRouter)
app.use('/students', studentsRouter)

app.listen(3000, () => console.log('Server Started'))