//creating the server
const express = require('express');
const session = require('express-session');
let app = express();

//requiring all the types needed
const http = require('http');
const fs = require("fs");
const pug = require("pug");


const bodyParser = require('body-parser');

//for login sessions
app.use(session({ 
	secret: 'some secret here', 
	//cookie: {maxAge:50000},  //the cookie will expire in 50 seconds
	resave: true,
	saveUninitialized: true
  })); 
app.use(express.static("public"));

//to require mongo
let mongo = require('mongodb');
const { boolean } = require('webidl-conversions');
let MongoClient = mongo.MongoClient;
let db
app.use(express.json());

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "pug")

let artworks;

//reading in from the json file
fs.readdir("./artworks", function(err, data){
    if (err){
      console.log(err);
    }else {
      data.forEach(file => {
        //takes each file name and gets all the data inside the file
        artworks = require("./artworks/" + file);
      
    })
}
//giving each id
for(let i =0; i<artworks.length; i++){
    artworks[i].id = i.toString();
}
//console.log(artworks)
})
//console.log(db);

//all handlers
app.get('/', function(req, res){
	 
    res.render("login");

});


app.get('/index', function(req, res){
	 
    res.render("index");

});

app.post('/artists', (req, res) => {


   // console.log(req.body.artist.length)

    //if the name is already in array of artists
    let flag = false;
    for(let i=0; i<artworks.length; i++){
        if(req.body.artist===artworks[i].artist){
            flag=true;
        }
    }
   
    //should not let you in
    if(req.body.artist===""||req.body.password===""||flag===true){
        res.status(400);
        res.send('None shall pass');
        console.log("Invalid")
        flag = false;
      }
      else{
       // console.log(req.body)
       artworks.push(req.body)
        //console.log(req.body)
      // console.log(artworks)
       //console.log(artworks[artworks.length-1]) 
       artworks[artworks.length-1].id = (artworks.length-1).toString();
       //console.log(artworks)
       console.log(req.body)
      // artworks.push(req.body)
      // console.log(artworks)

      }

});


app.get('/artists', function(req, res){

    length = artworks.length
	 
    res.render("artists", {artworks:artworks, length:length});

});

let reviews = []

app.get("/artists/:id", (req, res) => {
    
    let id = req.params.id;
  
    length = artworks.length
    
    res.render("artistPersonal", {artworks:artworks, length:length, id:id, reviews: reviews});
 
})

app.post("/artists/:id", (req, res) => {
    
    console.log(req.body)
    reviews.push(req.body.review)
 
})

app.get("/artists/:id/artist", (req, res) => {
    
    let id = req.params.id;
  
    length = artworks.length
    
    res.render("artist", {artworks:artworks, length:length, id:id});
 
})


//to add an image
app.post('/artists/:id/artist', (req, res) => {

    let id = req.params.id;
    console.log(req.body)
    //console.log(id);
    
    artworks[artworks.length-1].name = req.body.name
    artworks[artworks.length-1].year = req.body.year
    artworks[artworks.length-1].category = req.body.category
    artworks[artworks.length-1].description = req.body.description
    artworks[artworks.length-1].image = req.body.image
    artworks[artworks.length-1].medium = req.body.medium

    console.log(artworks)
    

})

app.get('/addArt', function(req, res){
    
    res.render("addArt");

});
let workshops = []
app.get('/addWorkshop', function(req, res){
    
    res.render("addWorkshop");

});

app.get('/workshops', function(req, res){
    
    res.render("workshops", {workshops});

});

app.post('/workshopNames', function(req, res){
    
    workshops.push(req.body.workshop)

});

app.get('/donate', function(req, res){
    
    res.render("donate");

});

//connecting the mongodb database
MongoClient.connect("mongodb://127.0.0.1:27017/", { useNewUrlParser: true }, function(err, client) {
  if(err) throw err;
  db = client.db('artworks');
  app.listen(3000);
  console.log("Listening on port http://localhost:3000/");
});

