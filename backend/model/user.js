import mongoose from "mongoose";

const Schema = new mongoose.Schema;

const userSchema = new Schema({
  name:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true,
    minLength: 6,
  }
})