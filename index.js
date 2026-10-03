require("dotenv").config()
const express = require('express')
const app = express()
const studentRoute = require('./routes/studentRoute')
const courseRoute = require('./routes/courseRoute')
const mongoDB = require('./config/mongoDB')

app.use(express.json())

// Connect Database
mongoDB()


app.use('/api/v1/students', studentRoute)
app.use('/api/v1/courses', courseRoute)


let PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})