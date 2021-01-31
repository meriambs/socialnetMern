
const Person = require('../Models/Person');
const { body, validationResult } = require('express-validator');
const gravatar = require ('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
//GET :  RETURN ALL USERS :
const findUsers= async(res,req)=>{
    const returnUser = await Person.find();
    return res.send(returnUser)
}


// POST :  ADD A NEW USER TO THE DATABASE :

 const createUser = async  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


const {name , email , password} = req.body 
try{
  //see i fuser exists:
  let foundperson = await Person.findOne({email});
  if(foundperson){
   return  res.status(400).json({errors :[{msg:'user alredy exist'}]});

  }
  
//get user gravtar:
const avatar = gravatar.url(email,{
  s:'200',
  r:'pg',
  d:'mm'
})

//create an instance of the user :
newUser = new Person({
  name,email,avatar,password
});
//encrypt password 
const salt = await bcrypt.genSaltSync(10);
newUser.password = await bcrypt.hash(password , salt);
 const savedUser= await newUser.save();
// return res.json(savedUser);
//return jsonwebtoken : 
const payload ={
  newUser:{
    id:use._id
  }
}
jwt.sign(payload,
  config.get(process.env.jwtSecret),
{expiresIn:360000} ,
(err,token)=>{
  if(err)throw err;
  res.json({token});
}
);

}catch(err){
  //something goen wron git's becose of the server
  console.error(err.message);
  res.status(500).send('Server error')
}   
  }

   //PUT : EDIT A USER BY ID 
const findandUpdate = async ( req , res)=>{
const updatedPerson = await Person.findOneAndUpdate({_id:req.params.id},req.body,{new:true})
return res.send(updatedPerson)
}


  //   DELETE : REMOVE A USER BY ID 
  const deleteUser = async (req,res)=>{
    const deltedPerson = await Person.findByIdAndRemove({_id:req.params.id});
    return res.send(deltedPerson)
}


module.exports = {
    findUsers,
 createUser,
    findandUpdate,
    deleteUser
}