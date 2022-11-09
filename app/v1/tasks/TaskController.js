const taskService = require('./TasksService');

exports.create = async (req, res) => {
    const payload = req.body;
    try {

        const { error, data } = await taskService.create(payload);
        if (error) return createErrorResponse(res, error, 400);
        return createSuccessResponse(res, data, 200, "Task queued");

    } catch (err) {
        console.log(err)
        res.send({ status: "Error" })
    }
}

exports.update = async (req, res) => {
    const {id, uid} = req.params;
    const payload = req.body;
console.log("payload", payload)
    try {
const query = {_id: id, user_id: uid}
        const { error, data}= await taskService.update({query, payload})

  if(error) return createErrorResponse(res, error, 400);

        return createSuccessResponse(res, data, 201, "task updated");
    } catch (err) {
        console.log(err)
        return createErrorResponse(res, "error updating task", 400);
    }
}
exports.delete = async (req, res) => {
    const {id, uid} = req.params;
    try {
console.log("id", id, "uid", uid)
        const { error, data } = await taskService.delete({ id, uid});

        if (error) return createErrorResponse(res, error, 400);

        return createSuccessResponse(res, 'task deleted', 204, "task deleted");
    } catch (err) {
        console.log(err.message)
        return createErrorResponse(res, "error deleting task", 400);
    }
}
exports.getAll = async (req, res) => {
    const { uid } = req.params;
    const {page, limit} = req.query;
const query = {page, limit}
    try {

        const { error, data } = await taskService.getAll({user_id: uid , query});

        if (error) return createErrorResponse(res, error, 400);

        return createSuccessResponse(res, data, 201, "successful");
    } catch (err) {
        console.log(err.message)
        return createErrorResponse(res, "error getting tasks", 400);
    }
}
exports.getOne = async (req, res) => {
    const {uid, id} = req.params;
console.log("uid", uid, "id", id)
    try{
        const {error, data} = await taskService.getOne({user_id:uid, id});

        if (error) return createErrorResponse(res, error, 400);

        return createSuccessResponse(res, data, 201, "successful");
    }catch(err){
        console.log(err.message)
        return createErrorResponse(res, err.message, 400);
    }
}