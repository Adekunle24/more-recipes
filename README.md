# More-Recipes

[![Build Status](https://travis-ci.org/Adekunle24/more-recipes.svg?branch=develop)](https://travis-ci.org/Adekunle24/more-recipes)
[![Coverage Status](https://coveralls.io/repos/github/Adekunle24/more-recipes/badge.svg?branch=develop)](https://coveralls.io/github/Adekunle24/more-recipes?branch=develop)
![Issue Count](https://codeclimate.com/github/Adekunle24/more-recipes/badges/issue_count.svg)

 This is a NodeJS application that provides a platform for users to share the awesome and amazing recipe ideas they have learnt, tried or invented. A registered user can post a recipe and get feedback in form of votes and comments from other users
 ### Prerequisites
 ```NodeJS```
 ```Sequelize```
 ```NPM```
 ```PostgreSQL```
 ```FontAwesome```
 ```Bootstrap```
 ```Express```
 ### Installing  
Install NodeJS  
```Download it from their website```  
Install NPM  
```Should be installed alongside NodeJS```  
Install Sequelize  
```$ npm install --save sequelize```  
Install PostgreSQL  
```$ npm install --save pg pg-hstore```  
Install Express  
```$ npm install express```  
###Application Installation  
```cd into a directory```  
```clone this repository```  
### Other dependencies  
Install other application dependencies by running the code below  
```$ npm install```  
##How to start the application  
```npm start```  
##Running the test  
Enter the command below  
```npm test```  
### Endpoints
* POST: /api/v1/users/signup
* POST: /api/v1/users/signin
* POST: /api/v1/recipes
* GET: /api/v1/recipes
* PUT: /api/v1/recipes/:recipeId
* DELETE: /api/v1/recipes/:recipeId
* POST: /api/v1/recipes/:recipeId/reviews
* GET: /api/v1/users/:userId/recipes
* GET: /api/recipes?sort=upvotes&order=ascending