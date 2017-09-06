// using express framework
import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import routes from './server/routes';
import favicon from 'serve-favicon';
import path from 'path';
import env from 'dotenv';
import engine from 'ejs';
import logger from 'morgan';
env.config();


// create express application
const app = express();

// set server listening port

app.set('port', process.env.PORT || 3000);

app.set('superSecret',env.API_SECRET);
app.use(favicon(path.join(__dirname, 'public/images', 'logo.png')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

// directory for static files
app.use(express.static(__dirname+'/public'));
app.get('/test',(req,res)=>{
  res.send('test');
});
// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});


app.use('/',routes);


// path to resources
app.get(['*.png','*.jpg','*.css','*.js','*.map'],(req,res)=>{
  res.sendFile(`${__dirname}/public/${req.path}`);
});

// add homepage route
app.get('/home',(req,res) =>
{
  fs.readFile(__dirname+'/public/home.html',(err,data) =>{
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


app.get('/view-recipes',(req,res)=>
{
  fs.readFile(__dirname+'/public/view-recipes.html',(err,data) =>{
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
  fs.readFile(__dirname+'/public/recipe-details.html',(err,data) => {
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
  fs.readFile(__dirname+'/public/favourite-recipes.html',(err,data) =>{ 
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
  fs.readFile(__dirname+'/public/user-profile.html',(err,data) =>{
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
  fs.readFile(__dirname+'/public/add-recipe.html',(err,data) => {
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
  res.send('404 - Page cannot be found');
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