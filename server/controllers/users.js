import allModels from '../models';
const userModel = allModels.user;
const getTotalUsers = (req,res) => {
	userModel.findAll().then(value => 
		res.send(value)
	);
};
const signUp = (req,res) => {
	const username = req.params.username;
	const email = req.params.email;
	const password = req.params.password;
};
const allMethods = { 'getTotalUsers' : getTotalUsers, 'signUp' : signUp};
export default allMethods;