var express = require('express');
var router = express.Router();
const authRouter = require('./auth');
const tasksRouter = require('./tasks');

router.use('/auth', authRouter);
router.use('/task', tasksRouter);

module.exports = router;
