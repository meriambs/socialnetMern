const User  = require('../Models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//@route    GET  api/auth
//@desc     test route
//@access   Private

const sayauth = async (req, res) => {
  try{
      const user = await User.findById(req.user.id).select('_password');
      res.json(user)
  }catch(err){
console.error(err.message);
 res.status(400).send('server error')
  }
}
//@route    POST  api/auth
//@desc     authenticate user and get toke
//@access   Public
 const createAuth = async  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


const { email , password} = req.body 
try{
  //see i fuser exists:
  let user = await User.findOne({email});
  if(!user){
   return  res.status(400).json({errors :[{msg:'invalid credentials'}]});

  }
const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }
       //ici pour la securtie mettre le mm message ce qui permet de ne pas indiquer si le profil existe ou le mdp existe deja et on peut le piquer s
  

//return jsonwebtoken : 
const payload = {
        user: {
          id: user.id,
        },
      };
jwt.sign(payload,
 config.get("jwtSecret"),
        { expiresIn: 360000 },
(err,token)=>{
  if(err)throw err;
  return res.json({token});
}
);

}catch(err){
  //something goen wron git's becose of the server
  console.error(err.message);
  res.status(500).send('Server error')
}   
  }

module.exports = {
    createAuth,
    sayauth,
}