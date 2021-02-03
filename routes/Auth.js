var express = require('express');
var router = express.Router();
const { sayauth, createAuth } = require('../Controllers/auth');
const auth = require ('../middleware/auth');
const { body, validationResult } = require('express-validator');


/* GET home page. */
router.get('/',auth,sayauth);
//post 
router.post(
  '/',
//    body('name').not().isEmpty(), we dont need name becose it'zs loging part 
  // username must be an email
  body('email').isEmail(),
  // password must be at least 5 chars long
  body('password').exists(),createAuth
);
module.exports = router;