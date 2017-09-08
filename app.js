// using express framework
import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import routes from './server/routes';
import favicon from 'serve-favicon';
import path from 'path';
import env from 'dotenv';
import logger from 'morgan';
env.config();

/**
 * create ann express application
 */
const app = express();

/**
 * set application port from environment variables
 * @param  {} 'port'
 * @param  {} process.env.PORT||3000
 */
app.set('port', process.env.PORT || 3000);
/**
 * set application secret
 * @param  {} 'superSecret'
 * @param  {} env.API_SECRET
 */
app.set('superSecret',env.API_SECRET);
/**
 * use bodyparser for input data
 * @param  {} bodyParser.json(
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/**
 * use logger to display information on console
 * @param  {} logger('dev'
 */
app.use(logger('dev'));

/**
 * set public directory for serving statis files
 * @param  {} express.static(__dirname+'/public'
 */
app.use(express.static(__dirname+'/public'));

/**
 * Display Homepage of the website
 * @param  {} '/'
 * @param  {} (req
 * @param  {} res
 */
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

/**
 * Custom error 404 page
 * @param  {} (req
 * @param  {} res
 */
app.use((req,res) =>{
  res.type('text/plain');
  res.status(404);
  res.json({status:'fail',message:'404 - Page cannot be found'});
});
/**
 * Display error 505 message
 * @param  {} (err
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
app.use((err,req,res,next) =>{
  res.type('text/plain');
  res.status(500);
  res.json({status:'fail',message:'500 - server error'});
});

/**
 * start the application to listen on specified port
 * @param  {} app.get('port'
 * @param  {} (
 */
app.listen(app.get('port'),() =>{
  
});
export default app;