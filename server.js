var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongojs=require('mongojs');
var mongoose=require('mongoose');
var path = require('path');
var fs = require('fs');
var s_info = mongojs('s_info',['s_info','s_portfolio','s_links','s_screenshots']);
var multer = require('multer');
var upload=multer({dest:'uploads/'});

app.post('/upload/:username',upload.any(),function(req,res){
  s_info.s_screenshots.insert({username : req.params.username, path : req.files[0].path},function(err,doc){
    console.log(JSON.stringify(doc));
  });
  //res.send(req.files);
});

app.get('/screenshots/:username',function(req,res){
  res.json(s_info.s_screenshots.find({username : req.params.username}));
});
//app.post('/damn',function(req,res){
//  if(s_info.s_portfolio.findOne({username : req.data.username})==null)s_info.s_portfolio.insert(req.body);
//});
app.post('/link',function(req,res){
  s_info.s_links.insert(req.body);
});

//app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine','ejs');
var title = "ayy man wassup";
app.get('/',function(req,res){
  res.render("cleaning");
});

app.get('/register',function(req,res){
  res.render('register');
});
app.get('/login',function(req,res){
  res.render('login');
});
app.post('/register', function(req,res){
  s_info.s_info.insert(req.body,function(err,doc){
    res.json(doc);
  });
});
app.post('/login',function(req,res){
  s_info.s_info.findOne({username : req.body.username},function(err,doc){
    res.json(doc);
  });
});

app.get('/done/:username',function(req,res){
  res.render('portfolio');
});
app.get('/done/porto/:username',function(req,res){
  s_info.s_portfolio.findOne({ username : req.body.username},function(err,doc){
    res.json(doc);
  });
});

//mongoose.connect('mongos_info://localhost/test');
app.listen(3001);



/*
//Mongoose part :D
var s_info=mongoose.connection;
s_info.on('error', console.error.bind(console, 'connection error:'));
s_info.once('open', function() {
  // we're connected!
});

var kittySchema=mongoose.Schema({
  name: String
});
kittySchema.methods.speak = function(){
  var greeting = this.name?"Meow name is "+this.name : "I don't have a name :(";
  console.log(greeting);
};


var Kitten = mongoose.model('Kitten', kittySchema);

var kobe = new Kitten({name: "Kobe"});
console.log(kobe.name);

kobe.save(function(err,kobe){
  if(err)console.log(err);
  kobe.speak;
});

Kitten.find(function(err,kittens){
  if(err)console.log(err);
  console.log(kittens);
});
*/
