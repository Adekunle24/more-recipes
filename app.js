// using express framework
import express from 'express';
import fs from 'fs';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import Sequelize from 'sequelize';
import routes from './server/routes';
import Config from './server/config/config.json';

// import fortune from 'lib/fortune.js';
const config = Config['development'];
const sequelize = new Sequelize(config.database,config.username, config.password,config.options);

// create express application
const app = express();

// set up handlebars view engine
// var handlebars = require('express3-handlebars').create({defaultLayout:'main'});

// app.engine('handlebars',handlebars.engine);
// app.set('view engine','handlebars');


// set server listening port 
app.set('port', 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/',routes);

// add homepage route
app.get('/home',function(req,res)
{
	var data = { username: 'Adekunle'};
	fs.readFile(__dirname+'/template/home.html',function(err,data){
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
	var data = { username: 'Adekunle'};
	fs.readFile(__dirname+'/template/view-recipes.html',function(err,data){
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
	var data = { username: 'Adekunle'};
	fs.readFile(__dirname+'/template/recipe-details.html',function(err,data){
		if(err)
		{
			res.send('error occured '+err);
		}
		else{
			res.end(data);
		}
       
	});
});
app.get('/favourite-recipes',function(req,res)
{
	var data = { username: 'Adekunle'};
	fs.readFile(__dirname+'/template/favourite-recipes.html',function(err,data){
		if(err)
		{
			res.send('error occured '+err);
		}
		else{
			res.end(data);
		}
       
	});
});
app.get('/user-profile',function(req,res)
{
	var data = { username: 'Adekunle'};
	fs.readFile(__dirname+'/template/user-profile.html',function(err,data){
		if(err)
		{
			res.send('error occured '+err);
		}
		else{
			res.end(data);
		}
       
	});
});
app.get('/add-recipe',function(req,res)
{
	var data = { username: 'Adekunle'};
	fs.readFile(__dirname+'/template/add-recipe.html',function(err,data){
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
app.use(function(req,res,next){
	res.locals.showTests = app.get('env') !== 'production' && req.query.text ==='1';
	next();
});


// add startup route
app.get('/',function(req,res)
{
	var data = { username: 'Adekunle'};
	fs.readFile(__dirname+'/template/home.html',function(err,data){
		if(err)
		{
			res.send('error occured');
		}
		else{
			res.end(data);
			// res.end(data);
		}
       
	});
	// res.render('home',data);
});





// add dashboard route
app.get('/dashboard',function(req,res)
{
	res.type('text/plain');
	res.send('My TeaserPlus application dashboard');
});

// custom 404 page
app.use(function(req,res){
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not found');
});

// custom 505 page
app.use(function(err,req,res,next){
	console.log(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 - server error');
});


// start node JS Server
app.listen(app.get('port'),function(){
	console.log('Express started on http://localhost: '+app.get('port')+ '; press Ctrl  - c to terminate.');
});
// "start": "babel-node app.js --presets es2015,stage-2",