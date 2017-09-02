// using express framework
import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import routes from './server/routes';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
env.config;


// create express application
const app = express();

// set server listening port
app.set('port', process.env.PORT || 3000);
app.set('superSecret',env.API_SECRET);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/',routes);

// add homepage route
app.get('/home',(req,res) =>
{
  fs.readFile(__dirname+'/template/home.html',(err,data) =>{
    if(err)
    {
      res.send('error occured');
    }
    else{
      res.end(data);
    }
  });
  // res.render('home',data);
});

// directory for static files
app.use(express.static(__dirname+'/template'));

app.get('/view-recipes',(req,res)=>
{
  fs.readFile(__dirname+'/template/view-recipes.html',(err,data) =>{
    if(err)
    {
      res.send('error occured '+err);
    }
    else{
      res.end(data);
    }
       
  });
});


app.get('/recipe-details',(req,res)=>
{
  fs.readFile(__dirname+'/template/recipe-details.html',(err,data) => {
    if(err)
    {
      res.send('error occured '+err);
    }
    else{
      res.end(data);
    }
       
  });
});
app.get('/favourite-recipes',(req,res) =>
{
  fs.readFile(__dirname+'/template/favourite-recipes.html',(err,data) =>{ 
    if(err)
    {
      res.send('error occured '+err);
    }
    else{
      res.end(data);
    }
       
  });
});
app.get('/user-profile',(req,res) =>
{
  fs.readFile(__dirname+'/template/user-profile.html',(err,data) =>{
    if(err)
    {
      res.send('error occured '+err);
    }
    else{
      res.end(data);
    }
       
  });
});
app.get('/add-recipe',(req,res) =>
{
  fs.readFile(__dirname+'/template/add-recipe.html',(err,data) => {
    if(err)
    {
      res.send('error occured '+err);
    }
    else{
      res.end(data);
    }
       
  });
});



// manage test
app.use((req,res,next) =>{
  res.locals.showTests = app.get('env') !== 'production' && req.query.text ==='1';
  next();
});


// add startup route
app.get('/',(req,res) =>
{
  let data = { username: 'Adekunle'};
  fs.readFile(__dirname+'/template/home.html',(err,data) =>{
    if(err)
    {
      res.send('error occured');
    }
    else{
      res.end(data);
    }
       
  });
});





// add dashboard route
app.get('/dashboard',(req,res) =>
{
  res.type('text/plain');
  res.send('My TeaserPlus application dashboard');
});

// custom 404 page
app.use((req,res) =>{
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not found');
});

// custom 505 page
app.use((err,req,res,next) =>{
  res.type('text/plain');
  res.status(500);
  res.send('500 - server error');
});


// start node JS Server
app.listen(app.get('port'),() =>{
  
});
export default app;