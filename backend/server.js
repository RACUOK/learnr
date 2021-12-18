const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')

const connectDB = require('./config/connection')

const app = express()

app.use(cors)
app.use(express.json())

const PORT = process.env.PORT || 5000

// log requests
app.use(morgan('tiny'))

// db connection
connectDB()

app.listen(PORT, ()=> {
    console.log(`Server is running on port: ${PORT}`);
})
