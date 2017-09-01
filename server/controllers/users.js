// import all the models
import allModels from '../models';
import crypto from 'bcrypt-nodejs';

// assign userModel to model user
const userModel = allModels.users;

// this is a test api to display all registered users
const getTotalUsers = (req,res) => {
  userModel.findAll().then(value => 
    res.send(value)
  ).catch(error =>res.send(error));
 
};

// this method accepts username, email and password then creates a user account on the database
const signUp = (req,res) => {
  const usernameInput = req.body.username;
  const emailInput = req.body.email;
  const passwordHash =  crypto.hashSync(req.body.password);
  userModel.create({
    email : emailInput,
    username : usernameInput,
    password : passwordHash
  }).then(output => res.send('Your account has been created successfully')).catch(error => res.send(error));
};

// this method accepts username and password and then perform authentication 
const signIn = (req,res) => {
  const usernameInput = req.body.username;
  const passwordInput = req.body.password;
  userModel.findOne({
    where: {
      username : usernameInput
    }
  }).then(result => { 
    if(result.length==0) {
      res.send('Incorrect username or password');
    }
    else if (result.length === 1) {
      crypto.compare(passwordInput, result[0].password, function(err, cryptResponse) {
        if(cryptResponse){
          res.send('Login successful');
        }
        else{
          res.send('Incorrect username or password');
        }
      });
      
		
    }   
  });
};

const allMethods = { 'getTotalUsers' : getTotalUsers, 'signUp' : signUp, 'signIn' : signIn};
export default allMethods;
