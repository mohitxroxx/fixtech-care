const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  category: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    max: 50,
  },
  fname: {
    type: String,
    required: true,
    max: 50,
  },
  mname: {
    type: String,
    required: true,
    max: 50,
  },
  lname: {
    type: String,
    required: true,
    max: 50,
  },
  bname: {
    type: String,
    required: true,
    max: 50,
  },
  contact: {
    type: String,
    required: true,
    min: 8,
  },
  city:{
    type:String,
    required:true,
  },
  state:{
    type:String,
    required:true,
  },
  zip:{
    type:String,
    min:4,
    max:10,
  },
  refcount: {
    type: Number,
    default: 0,
  },
  refid: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date, default: Date.now
  }
})


module.exports = mongoose.model("Registered user", userSchema)



// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   country: String,
//   category: String,
//   email: {
//     type: String,
//     unique: true,
//   },
//   fname: String,
//   mname: String,
//   lname: String,
//   bname: String,
//   contact: String,
//   city: String,
//   state: String,
//   zip: String,
//   refcount: {
//     type: Number,
//     default: 0,
//   },
//   refid: {
//     type: String,
//     unique: true,
//   }
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;
