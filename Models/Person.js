let mongoose = require("mongoose");

//Create a person having this prototype:
let peapleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
 email: {
    type: String,
    required: true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  avatar:{
    type:String,
  },
  date:{

    type:Date,
    default:Date.now()
  }
});

module.exports = Person = mongoose.model("Person", peapleSchema);