
const User = require('../Models/User');
const { body, validationResult } = require('express-validator');
const gravatar = require ('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("config");


//@route    POST  api/users
//@desc     Register User
//@access   Public
// const dotenv = require('dotenv');
// dotenv.config({path:__dirname + '/config/.env'})
//GET :  RETURN ALL USERS :
const findUsers= async(res,req)=>{
    const returnUser = await User.find();
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
//   //see i fuser exists:
   let user = await User.findOne({email});
   if(user){
    return  res.status(400).json({errors :[{msg:'user alredy exist'}]});

   }
  
  
// // //get user gravtar:
  const avatar = gravatar.url(email,{
    s:'200',
    r:'pg',
    d:'mm'
  })

// // //create an instance of the user :
  user = new User({
    name,email,avatar,password
  });
// // //encrypt password 
  const salt = await bcrypt.genSaltSync(10);
  user.password = await bcrypt.hash(password , salt);
  //  const savedUser=
    await user.save();
    // res.json(savedUser);
    // res.send('user registered')
// //return jsonwebtoken : 
 const payload = {
        user: {
          id: user.id,
        },
      };
      //Create token for usuer with id the payload

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

}catch(err){
   //something goen wron git's becose of the server
   console.error(err.message);
   res.status(500).send('Server error')
 }   }
   

//    //PUT : EDIT A USER BY ID 
 const findandUpdate = async ( req , res)=>{
 const updatedPerson = await User.findOneAndUpdate({_id:req.params.id},req.body,{new:true})
 return res.send(updatedPerson)
 }


//   //   DELETE : REMOVE A USER BY ID 
   const deleteUser = async (req,res)=>{
     const deltedPerson = await User.findByIdAndRemove({_id:req.params.id});
     return res.send(deltedPerson)
 }


module.exports = {
    findUsers,
 createUser,
    findandUpdate,
    deleteUser
}