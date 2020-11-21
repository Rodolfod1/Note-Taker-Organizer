// Declaring dependencies 
var express=require("express");
var path=require("path");
var db=require("./db/db")

//Setting up Express 
//==========================
var app= express();
var PORT= 3000;
//===============
//setting up Express for data parsing
//==========================================
app.use(express.urlencoded({extended:true}));
app.use(express.json());

 //routes
 //================================= HTML ROUTES
 app.get("/notes",function(req,res){
     res.sendFile(path.join(__dirname,"/public/","notes.html"));
 });

 app.get("*",function(req,res){
     res.sendFile(path.join(__dirname,"/public/","index.html"));
 });
 //====   API Routes===
 app.get("/api/notes", function(req, res){
     return res.json(db);
 });
 // post to receive a new note from body and add it to the json file
 app.post("/api/notes", function(req, resp){
     db.push(req.body);
     res.json(true);
 }) 

 //===========
 //   Port listener standard 
 app.listen(PORT,function(){
    console.log("App listening on PORT: " + PORT);
 })
