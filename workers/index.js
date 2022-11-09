const Tasks = require("../app/v1/tasks/TasksModel");
const queue = require('../startups/queue');
const handleNewTask = async  (message) => {
    console.log('message', message);
    try{
    const task = new Tasks({
        title: message.text.title,
        description: message.text.description,
        time: message.text.time,
        status: message.text.status,
        user_id: message.text.user_id
    })
    await task.save();
}catch(err){
    console.log(err)

}
}

queue.receive('incoming', handleNewTask).then((res) => console.log("success",res)).catch((err) => console.log(err));