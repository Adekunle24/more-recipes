//using express framework
var express = require('express');
var fs = require('fs');

//create express application
var app = express();

//set up handlebars view engine
// var handlebars = require('express3-handlebars').create({defaultLayout:'main'});

// app.engine('handlebars',handlebars.engine);
// app.set('view engine','handlebars');

//set server listening port 
app.set('port',process.env.PORT || 3000);

//directory for static files
app.use(express.static(__dirname+'/template'));

//load fortune library
var fortune = require('./lib/fortune.js');

//manage test
app.use(function(req,res,next){
res.locals.showTests = app.get('env') !== 'production' && req.query.text ==='1';
next();
});


//add startup route
app.get('/',function(req,res)
{
    var data = { username: "Adekunle"};
    fs.readFile(__dirname+'/template/home.html',function(err,data){
        if(err)
        {
            res.send("error occured");
        }
        else{
            res.end(data);
  //res.end(data);
        }
       
    });
   // res.render('home',data);
});

//add homepage route
app.get('/home',function(req,res)
{
    var data = { username: "Adekunle"};
    fs.readFile(__dirname+'/template/home.html',function(err,data){
        if(err)
        {
            res.send("error occured");
        }
        else{
            res.end(data);
  //res.end(data);
        }
       
    });
   // res.render('home',data);
});
//add dashboard route
app.get('/dashboard',function(req,res)
{
res.type('text/plain');
res.send('My TeaserPlus application dashboard');
});

//custom 404 page
app.use(function(req,res){
res.type('text/plain');
res.status(404);
res.send('404 - Not found');
});

//custom 505 page
app.use(function(err,req,res,next){
console.log(err.stack);
res.type('text/plain');
res.status(500);
res.send('500 - server error');
});


//start node JS Server
app.listen(app.get('port'),function(){
console.log('Express started on http://localhost: '+app.get('port')+ '; press Ctrl  - c to terminate.');
});