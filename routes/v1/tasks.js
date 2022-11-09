var express = require('express');
var router = express.Router();
const taskController = require('../../app/v1/tasks/TaskController');
const taskValidator = require('../../app/v1/tasks/TaskValidator');

router.post('/',taskValidator.create, taskController.create );
router.put('/:id/:uid/',taskValidator.update, taskController.update);
router.delete('/:id/', taskValidator.delete, taskController.delete);
router.get('/', taskController.getAll);
router.get('/:id/', taskController.getOne);
module.exports = router;
