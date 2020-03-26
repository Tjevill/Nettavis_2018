// @flow

import path from 'path';
import reload from 'reload';
import fs from 'fs';


var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var app = express();

type Request = express$Request;
type Response = express$Response;

const public_path = path.join(__dirname, '/../../client/public');


app.use(express.static(public_path));
app.use(express.json()); // For parsing application/json

var pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql.stud.iie.ntnu.no",
    user: "simonlil",
    password: "GZtMLZb6",
    database: "simonlil",
    debug: false
});

//daos 
const NewsDao = require("../dao/newsdao.js");
const CommentDao = require("../dao/commentdao.js");
let newsDao = new NewsDao(pool);
let commentDao = new CommentDao(pool);
//----------//



//Server queries to database.


//Get comments from id
app.get("/getComments/:id",(req, res)=>{
  console.log("Received get-request from client");
  console.log("on endpoint /getComment/"+req.params.id);
  commentDao.getAll(req.params.id, (status, data) =>{
    res.status(status);
    res.json(data);
  });
});

//Post comment 
app.post("/createComment",(req,res)=>{
  console.log("Received post-request from client");
  console.log("on endpoint /createComment");
  console.log(req.body);
  commentDao.createComment(req.body,(status,data)=>{
    res.status(status);
    res.json(data);
  });
});

//Get all news from database
app.get("/getNews",(req,res)=>{
  console.log("Received get-request from client");
  console.log("on endpoint /getNews");
  newsDao.getAll((status,data)=>{
    res.status(status);
    res.json(data);
  });
});

//Get one news-article from database depending on the id.
app.get("/getOneNews/:id",(req,res)=>{
  console.log("Received get-request from client");
  console.log("on endpoint /getOneNews/"+req.params.id);
  newsDao.getOne(req.params.id, (status,data)=>{
    res.status(status);
    res.json(data);
  });
});

//Get the news with highest priority from the database
app.get("/getPriorityOne",(req, res)=>{
  console.log("received get-request from client");
  console.log("on endpoint /getPriorityOne");
  newsDao.getPriOne((status,data)=>{
    res.status(status);
    res.json(data);
  });
});

//Get all headlines from database. Intended for newsfeed.
app.get("/getHeadlines",(req,res)=>{
  console.log("Received get-request from server");
  console.log("on endpoint /getHeadlines");
  newsDao.getHeadlines((status,data)=>{
    res.status(status);
    res.json(data);
  });
});

//Get the current categories from database. Intended for select-form.
app.get("/getCategories",(req,res)=>{
  console.log("Received get-request from client");
  console.log("on endpoint /getCategories");
  newsDao.getCategories((status,data)=>{
    res.status(status);
    res.json(data);
  });
});

//Get the category for the input param.
app.get("/getCategory/:kategori",(req,res)=>{
  console.log("Received get-request from client");
  console.log("Getting news from category: "+req.params.kategori);
  newsDao.getNewsWithCategory(req.params.kategori, (status,data)=>{
    res.status(status);
    res.json(data);
  });
});

//Insert a new news-article into the database.
app.post("/createNews",(req,res)=>{
  console.log("Received post-request from client");
  console.log("on endpoint /createNews");
  console.log(req.body);
  newsDao.createArticle(req.body,(status,data)=>{
    res.status(status);
    res.json(data);
  });
});

//Delete news-article from the database with id.
app.delete("/deleteNews/:id",(req,res)=>{
  console.log("Received delete-request from client.");
  console.log("Trying to delete id: "+req.params.id);
  newsDao.deleteArticle(req.params.id,(status, data)=>{
    res.status(status);
    res.json(data);
  });
});

//Update news-article in the database with id.
app.post("/updateOne",(req: Request,res: Response)=>{
  console.log("Received post-request from client");
  console.log("Trying to update id: "+req.body.id);
  console.log(req.body);
  newsDao.updateArticle(req.body, (status,data)=>{
    res.status(status);
    res.json(data);
  });
});

// Hot reload application when not in production environment
if (process.env.NODE_ENV !== 'production') {
  let reloadServer = reload(app);
  fs.watch(public_path, () => reloadServer.reload());
}

// The listen promise can be used to wait for the web server to start (for instance in your tests)
export let listen = new Promise<void>((resolve, reject) => {
  app.listen(3000, error => {
    if (error) reject(error.message);
    console.log('Server started');
    resolve();
  });
});

