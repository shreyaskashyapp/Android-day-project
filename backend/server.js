const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const bodyparser= require('body-parser')

require('dotenv').config();

const app= express()
app.use(cors())
app.use(bodyparser.json())

const uri=process.env.ATLAS_URI

mongoose.connect(uri,{useNewUrlParser:true})
const stRouter=require('./routes/st');
const fsRouter=require('./routes/fs');
const wtRouter=require('./routes/wt');
const dwRouter=require('./routes/dw');
const studentRouter=require('./routes/student')
const subjectRouter= require('./routes/subjects')

app.use('/st',stRouter);
app.use('/wt',wtRouter);
app.use('/fs',fsRouter);
app.use('/dw',dwRouter);
app.use('/student',studentRouter);
app.use('/subject',subjectRouter);
const connection=mongoose.connection;

connection.once('open',()=>{
  console.log("MongoDB connection is succesfully established")
})

app.listen(8080,()=>{
  console.log("Server is running on port 8080");
})