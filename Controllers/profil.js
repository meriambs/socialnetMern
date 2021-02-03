const  Profile = require('../Models/Profile');
const User = require ('../Models/User');
const sayProfil = async (req, res) => {

     try{
         const profile = await Profile.findOne({user:req.user.id}).populate('user',['name','avatar']);

         if(!profile){
             return res.status(400).json({msg: 'there is no profile for this user'});

         }
         res.json(profile);
     }catch(err){
         console.error(err.message);
         res.status(500).send('server error')
     }

    return res.send('Post page')
}

module.exports = {
    sayProfil,
}