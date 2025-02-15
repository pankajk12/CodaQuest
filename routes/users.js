var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const connect =  mongoose.connect("mongodb://localhost:27017/Codaquestdb");

// Check database connected or not
connect.then(() => {
  console.log("Database Connected Successfully");
})
.catch(() => {
  console.log("Database cannot be Connected");
})

// Create Schema
const SigninSchema = new mongoose.Schema({
  name: {
      type:String,
      required: true
  },
  email:{
    type:String,
    required: true
  },
  password: {
      type: String,
      required: true
  }
});

// collection part
const collection = new mongoose.model("Codaquestusers", SigninSchema);

module.exports = collection;
