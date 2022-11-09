const queue = require('../startups/queue');
const Tasks =  require('../app/v1/tasks/TasksModel');
const handleIncoming = (message) =>{
const task = new Tasks(message.text);
task.save();}
queue
  .receive('newTask', handleIncoming)
  .catch(console.error);
