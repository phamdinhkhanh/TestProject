const express = require('express');
const path = require('path');
const exhbs = require('express-handlebars');
const questionRouter = require('./routers/questionRouter');
const bodyParser = require('body-parser');


let app = express();
app.engine("handlebars",exhbs({defaultLayout:"main"}));
app.set("view engine","handlebars");
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res) => {
  res.render("home");
})

app.get('/about',(req,res) => {
  res.render("about");
})

app.get('/style.css',(req,res) => {
  res.sendFile(__dirname+'/public/style.css');
})

app.get('/ask',(req,res)=>{
  res.render("ask");
})

app.use('/question', questionRouter);


app.use(express.static(__dirname+"/public"));
app.listen(6969, function(err){
  if (err) {
    console.log(err);
  } else {
    console.log("welcome to server");
  }
})
