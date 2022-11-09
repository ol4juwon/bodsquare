const authService = require('./AuthService');

exports.login = async (req, res) => {
const {email, password} = req.body;
try{

    const {error, data} = await authService.login({email, password});
    if (error) return createErrorResponse(res, error, 400);
	return createSuccessResponse(res, data, 200, "login success");

}catch(err){
    console.log(err)
    res.send({status: "Error"})
}
}

exports.signup = async (req, res) => {
const {email, password} = req.body;

try{
    
    const { error, data } = await authService.signup({email, password});

	if (error) return createErrorResponse(res, error, 400);

	return createSuccessResponse(res, data, 201, "Signup successful");
    }catch(err){
        console.log(err)
        return createErrorResponse(res, "error creating user", 400);
    }
}