const taskService = require('./TasksService');

exports.create = async (req, res) => {
    const payload = req.body;
    try {

        const { error, data } = await taskService.create(payload);
        if (error) return createErrorResponse(res, error, 400);
        return createSuccessResponse(res, data, 200, "login success");

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

        const { error, data } = await taskService.delete({ id, uid});

        if (error) return createErrorResponse(res, error, 400);

        return createSuccessResponse(res, data, 204, "task deleted");
    } catch (err) {
        console.log(err)
        return createErrorResponse(res, "error deleting task", 400);
    }
}
exports.getAll = async (req, res) => {
    const { email, password } = req.body;

    try {

        const { error, data } = await authService.signup({ email, password });

        if (error) return createErrorResponse(res, error, 400);

        return createSuccessResponse(res, data, 201, "Signup successful");
    } catch (err) {
        console.log(err)
        return createErrorResponse(res, "error creating user", 400);
    }
}
exports.getOne = async (req, res) => {

}