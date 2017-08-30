// import all the models
import allModels from '../models';

// assign userModel to model user
const userModel = allModels.user;

// this is a test api to display all registered users
const getTotalUsers = (req,res) => {
  userModel.findAll().then(value => 
    res.send(value)
  );
};

// this method accepts username,email and password then creates a user account on the database
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

// this method accepts username and password and then perform authentication 
const signIn = (req,res) => {
  const usernameInput = req.params.username;
  const passwordInput = req.params.password;
  userModel.findAll({
    where: {
      username : usernameInput
    }
  }).then(result => { 
    if(result.length==0) {
      res.send('Incorrect username or password');
    }
    else if (result.length === 1) {
      if(passwordInput === result[0].passwordHash){
        res.send('Login successful');
      }
      else{
        res.send('Incorrect username or password');
      }
		
    }   
  });
};

const getAllFavoriteRecipes = (req,res) =>{
  res.send('Api route to get all favourite recipes');
};
const allMethods = { 'getTotalUsers' : getTotalUsers, 'signUp' : signUp, 'signIn' : signIn, 'getAllFavoriteRecipe': getAllFavoriteRecipes};
export default allMethods;
