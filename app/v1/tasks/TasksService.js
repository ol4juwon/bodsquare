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
exports.delete = async ({id, user_id}) => {}
exports.getAll = async({user_id})=>{

}
exports.getOne = async({id, user_id})=>{
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