import allModels from '../models';
const userModel = allModels.user;
const getTotalUsers = (req,res) => {
	userModel.findAll().then(value => 
		res.send(value)
	);
};
const signUp = (req,res) => {
	const usernameInput = req.params.username;
	const emailInput = req.params.email;
	const password = req.params.password;
	userModel.create({
		email : emailInput,
		username : usernameInput,
		passwordHash : password
	}).then(output => res.send('Your account has been created successfully'));
};
const allMethods = { 'getTotalUsers' : getTotalUsers, 'signUp' : signUp};
export default allMethods;