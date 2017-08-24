
module.exports = (app,fs,sequelize,express) =>
{
//add view-recipes route


//Test api
app.get('/api',function(req,res)
{
    var data = { username: "Adekunle"};
sequelize.query('select count(*) as NumberOfUsers from users',{item:sequelize.QueryTypes.SELECT}).spread(function(results,metadata){
var json_string = JSON.stringify(results);
var json_obj = JSON.parse(json_string);
res.send(json_obj[0].numberofusers);
});
   // res.render('home',data);
});


 app.get("/api/name/:name",(req,res) =>
        res.send(`My name is More-Recipes and  ${req.params.name}`)
        );

};