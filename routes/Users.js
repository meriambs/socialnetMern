var express = require('express');
var router = express.Router();
const { findUsers,createUser,findandUpdate,deleteUser} = require('../Controllers/users');
// ...rest of the initial code omitted for simplicity.
const { body, validationResult } = require('express-validator');

/* GET users listing. */
 router.get('/', findUsers);
// router.get('/:id', findUsers);

/* POST users listing. */

router.post(
  '/',
   body('name').not().isEmpty(),
  // username must be an email
  body('email').isEmail(),
  // password must be at least 5 chars long
  body('password').isLength({ min: 5 }),createUser
);

// // update 

router.put('/:id',findandUpdate);

// //delete

 router.delete('/:id',deleteUser);

module.exports = router;
