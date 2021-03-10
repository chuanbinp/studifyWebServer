require('dotenv').config()

const express = require('express')
const app = express()
const bodyparser = require('body-parser') 
const mongoose = require('mongoose')
Admin = mongoose.mongo.Admin

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true , dbName: "SSAD"})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

console.log(process.env.DATABASE_URL)

app.use(express.json())

// Body-parser middleware 
app.use(bodyparser.urlencoded({extended:false})) 
app.use(bodyparser.json()) 

// CORS
const cors = require('cors')
const whitelist = [
    'http://localhost:3000'
  ];
const corsOptions = {
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        // ERROR HERE
        callback(new Error('Not allowed by CORS'));
      }
    },
};
app.use(cors(corsOptions));

app.set('trust proxy', 1);

const questionsRouter = require('./routes/questions')
const assignmentsRouter = require('./routes/assignments')
const resourcesRouter = require('./routes/resources')
const studentsRouter = require('./routes/students')
const campaignResultsRouter = require('./routes/campaignResults')
const assignmentResultsRouter = require('./routes/assignmentResults')

app.use('/questions', questionsRouter)
app.use('/assignments', assignmentsRouter)
app.use('/resources', resourcesRouter)
app.use('/students', studentsRouter)
app.use('/campaignResults', campaignResultsRouter)
app.use('/assignmentResults', assignmentResultsRouter)


app.listen(5000, () => console.log('Server Started'))