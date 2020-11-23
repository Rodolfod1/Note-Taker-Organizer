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
const { log } = require("console");

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

// const readFile=util.promisify(fs.readFile);
// const writeFile=util.promisify(fs.writeFile);


 //routes
 //= HTML ROUTES

 app.get("/notes",function(req,res){
     res.sendFile(path.join(__dirname,"public","notes.html"));
 });
 app.get("/",function(req,res){
     res.sendFile(path.join(__dirname,"public","index.html"));
 });

 //====   API Routes===
 //  GET route 
 app.get("/api/notes", function(req, res){
         res.json(db);
      });

 // POST route to receive a new note from body and add it to the json file
app.post("/api/notes", function(req, res){
      // using UUID to get the Note from the body on an array 
       req.body.id = uuidv4();
       // this variable is to make the code more readable 
       var Note=req.body
    //pushing the new note to the JSON file on memory          
       db.push(Note);
    // write db JSON file from mem to the file 
     fs.writeFile("./db/db.json",JSON.stringify(db),function(err){
         if (err) throw err;
         //if there is no error then send response 
         res.json(db);
     });
  })

 // DELETE Note Method
 app.delete("/api/notes",function(req,res){
    // Getting the ID from request  
    var Id = req.params.id;
    // uding ID on loop at the dbJSON file 
    for(i=0; i<db.length; i++){
        // selecting the id and splicing the element
        if(Id=== db[i].id){
            db.splice(i,1);
          };
        }
    //writing the new db from the mem to the file     
    fs.writeFile("./db/db.json",JSON.stringify(db),function(err){
            if (err) throw err;
            //if there is no error then send response 
            res.json(db);
     });
 })
 
 


 //===========
 //   Port listener standard
 app.listen(PORT,function(){
    console.log("App listening on PORT: " + PORT);
 })
