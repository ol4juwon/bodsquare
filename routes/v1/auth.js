var express = require('express');
var router = express.Router();
const authController = require('../../app/v1/auth/AuthController');
const authValidator = require('../../app/v1/auth/AuthValidator');

router.post('/login',authValidator.login, authController.login );
router.post('/signup',authValidator.signup, authController.signup);
module.exports = router;
