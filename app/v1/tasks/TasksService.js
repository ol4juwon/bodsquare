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
exports.getAll = async({user_id, query: pqeury})=>{
    console.log(user_id, pqeury)
    let {page, limit} = pqeury;
    page = parseInt(page);
	limit = parseInt(limit);
	const query = {
		page,
		limit,
		sort: {
			createdAt: -1,
		}
	};
    const tasks = await Tasks.paginate({user_id}, query);
    return {data: tasks};

}
exports.getOne = async({user_id,id })=>{
    const task = await Tasks.findOne({_id: id, user_id});
    if(!task) return {error: "task not found"};
    return {data: task};
}

exports.create = async ({title, description, time, status, user_id}) => {
try{
 
    const newTask = new Tasks({ title, description, time, status, user_id});
    await newTask.save();
    return {data: newTask };
}
catch(error){
    return {error: error}
}     
}