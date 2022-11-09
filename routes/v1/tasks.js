var express = require('express');
var router = express.Router();
const taskController = require('../../app/v1/tasks/TaskController');
const taskValidator = require('../../app/v1/tasks/TaskValidator');

router.post('/login',taskValidator.login, taskController.login );
router.post('/signup',taskValidator.signup, taskController.signup);
module.exports = router;
