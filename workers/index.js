const queue = require('../startups/queue');
const Tasks =  require('../app/v1/tasks/TasksModel');
const handleIncoming = (message) =>{
  console.log("handling new task",message)
const task = new Tasks(message);
task.save();}
queue
  .receive('newTask', handleIncoming)
  .catch(console.error);
