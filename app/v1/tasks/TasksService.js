const Tasks = require("./TasksModel");

exports.update = async ({query,payload}) => {
console.log('query', query);
    const task = await Tasks.findOneAndUpdate(
        query,
        { $set: payload},
        {
            new: true,
        }
        );
console.log('task', task)
        if(!task) return {error: "task not found"};
   
    return { data: { task }};
  
} 
exports.delete = async ({id,uid: user_id}) => {
    console.log("19: id", id, "uid", user_id)
    const task = await Tasks.findOneAndDelete({_id: id, user_id});
    console.log("task", task)
    if(!task) return {error: "task not found"};
    return {data: 'deleted'};

}
exports.getAll = async({user_id, query})=>{
    console.log(user_id, query)
    if(!query){
    query = {
            page : 1,
            limit:10,
            sort: {
                createdAt: -1,
            }
        };
    }else{
        query.page = parseInt(query.page);
        query.limit = parseInt(query.limit);
    }
    // let {page, limit} = query;
    // page = parseInt(page);
	// limit = parseInt(limit);

    const tasks = await Tasks.paginate({user_id}, query);
    // console.log(tasks)
    return {data: tasks};

}
exports.getOne = async({user_id,id })=>{
    const task = await Tasks.findOne({_id: id, user_id});
    if(!task) return {error: "task not found"};
    return {data: task};
}

exports.create = async ({title, description, time, status, user_id}) => {
try{
 const message ={text: {title, description, time, status, user_id}};
    // const newTask = new Tasks({ title, description, time, status, user_id});
 await send('newTask', message);

    // await newTask.save();
    return {data : message };
}
catch(error){
    return {error: error}
}     
}