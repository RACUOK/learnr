const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/connection');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

//log requests
app.use(morgan('tiny'));

//db connection
connectDB();

//load routes
const userRouter = require('./routes/users');

app.use('/users', userRouter);


app.listen(PORT, ()=>{
    console.log(`Server is running on port:${PORT}`);
})