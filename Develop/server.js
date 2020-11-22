// Declaring dependencies 
const express=require("express");
const fs=require("fs");
const util=require("util");
//uuid from npmjs.com documentation for ver4
const { v4: uuidv4 } = require("uuid");
var path=require("path");
var db=require("./db/db");
const { promises } = require("dns");
const { json } = require("express");

//Setting up Express 
//==========================
var app= express();
var PORT= 3000;
//===============
//setting up Express for data parsing
//==========================================
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

const readFileAsync=util.promisify(fs.readFile);
const writeFileAsync=util.promisify(fs.writeFile);


 //routes
 //================================= HTML ROUTES

 app.get("/notes",function(req,res){
     res.sendFile(path.join(__dirname,"public","notes.html"));
 });
 app.get("/",function(req,res){
     res.sendFile(path.join(__dirname,"public","index.html"));
 });

 //====   API Routes===
 app.get("/api/notes", function(req, res){
     fs.readFile(__dirname + "/db/db.json","UTF8", function(err,dat){
         if(err) throw err;
         var Notes= JSON.parse(dat);
         res.json(Notes);
     })
 });

 // post to receive a new note from body and add it to the json file
 app.post("/api/notes", async (req,res) => {
    var Notes= await readFileAsync("./db/db.json", "UTF8");
    Notes=JSON.parse(Notes);
    req.body.id= uuidv4();
    Notes.push(req.body);

    fs.writeFile(__dirname + "./db/db.json", JSON.stringify(Notes));
    res.json(Notes[Notes.length-1]);
 }
 
 
 
 
 
 
 function(req, res){
     db.push(req.body);
     res.json(true);
 }) 
 //===========
 //   Port listener standard 
 app.listen(PORT,function(){
    console.log("App listening on PORT: " + PORT);
 })
