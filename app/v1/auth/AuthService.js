const User = require("./AuthModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async ({email, password}) => {

    const user = await User.findOne({ email: email });
    if (!user) return { error: "Invalid email or password" };
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return { error: "Invalid password, try again" };
    const token = jwt.sign(
		{
			
			email: user.email,
            name: user.name,
		},
		process.env.TOKEN_SECRET,
		{
			expiresIn: "48h",
		}
	);
    return { data: { token }};
  
} 

exports.signup = async ({email, password,name}) => {
try{
    const emailExist = await User.findOne({ email: email }).catch();
    if (emailExist) return { error: "User with email already exists" };
    const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ email, password:hashedPassword , name});
    await newUser.save();
    return {data: newUser };
}
catch(error){
    return {error: error}
}     
}