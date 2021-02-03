const jwt = require('jsonwebtoken');

const config = require("config");
const auth = (req, res, next) => {
  //Get token from header

  const token = req.header("x-auth-token");

  //Check if there is no token
  if (!token) {
    return res.status(400).json({ message: "no token , authorization denied" });
  }

  //Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "token is not valid" });
  }
};

module.exports = auth;


// const isAuth = async (req, res, next) => {
//   try {
//     const token = req.headers['x-auth-token'];
//     // Check for token
//     if (!token)
//       return res.status(401).send({ msg: 'No Token, authorization denied' });

//     const decoded = await jwt.verify(token, process.env.secretOrKey);

//     // Add User from payload
//     const foundperson = await Person.findById(decoded.id);
//     //Check for user
//     if (!foundperson) {
//       return res.status(401).send({ msg: 'authorization denied' });
//     }
//     // Create user
//     req.foundperson = foundperson;
//     next();
//   } catch (error) {
//     return res.status(400).json({ msg: 'Token is not valid' });
//   }
// };

// module.exports = isAuth;