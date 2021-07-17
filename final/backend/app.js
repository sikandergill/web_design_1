var express = require('express'); // Telling nodeJs that we gonna use Express
var cors = require('cors');
var bodyParser = require('body-parser') 
var fs = require('fs');
var multer = require('multer');
var { v4: uuidv4 } = require('uuid');

var app = express(); // Express is sleeping and we want awake it. So, we are calling it.
var upload = multer();
var upload = multer({ dest: 'images/' })
var foodInfoJSON = require('./json/infofood.json');
var users = require('./json/users.json');
const { json } = require('body-parser');
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());

var port = 5555;  // We are assigning address to the server.

app.use(cors());
app.use(express.static('images'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser());
 

// Bridge
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/getBookInfo/:id', (req, res) => {
  var bookName = req.params.id; // Getting the book name.
  var result = null;  // This variable will tell if we have a book or not.
  for (var i=0; i < foodInfoJSON.length; i++){
    if(foodInfoJSON[i]["bookName"] == bookName) result = foodInfoJSON[i];
  }
  res.json({result});
});


app.get('/getBookInfoBasedOnId/:id', (req, res) => {
  var bookId = req.params.id; // Getting the book name.
  var result = null;  // This variable will tell if we have a book or not.
  for (var i=0; i < foodInfoJSON.length; i++){
    if(foodInfoJSON[i]["id"] == bookId) result = foodInfoJSON[i];
  }
  res.json({result});
});

app.get('/getAllBooks', (req, res) => {
  res.json({foodInfoJSON});
});


app.post('/login', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var result = null;
  for (var i=0; i < users.length; i++){
    if(users[i]["username"] == username && users[i]["password"] == password){
      result = true;
      break;
    }else{
       result = false;
    }
  }
  res.json({"result": result});
});

app.post('/register', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  users = JSON.stringify(users);
  users = JSON.parse(users);
  var usernameExist = false;
  for (var i=0; i < users.length; i++){
    if(users[i]["username"] == username){
      usernameExist = true;
    }
  } 
  if (usernameExist){
     result = {"result": false, "msg": "Username already exist. Try Login!"};
  }else{
    users.push({"username": username, "password": password});
    users = JSON.stringify(users);
    fs.writeFileSync('json/users.json', users);
    result = {"result": true, "msg": "Username does not exist!"};
  }
  res.json(result);
});

// TODO: Add Image upload functionality.
app.post('/addBook', (req, res) => {
  var bookName = req.body["bookName"];
  var amazonUrl = req.body["amazonUrl"];
  foodInfoJSON.push({id: uuidv4(), "bookName": bookName, "amazonUrl": amazonUrl, "imageName":"milk.png"});
  books = JSON.stringify(foodInfoJSON);
  fs.writeFileSync('json/infofood.json', books);
  res.json({"result": true}); 
});

// Update Book
app.post('/updateBook/:id', (req, res) => {
  var bookId = req.params.id;
  var bookName = req.body["bookName"];
  var amazonUrl = req.body["amazonUrl"];
  for (var i=0; i < foodInfoJSON.length; i++){
    if(foodInfoJSON[i]["id"] == bookId){
      foodInfoJSON[i]["bookName"] = bookName;
      foodInfoJSON[i]["amazonUrl"] = amazonUrl;
    }
  }
  books = JSON.stringify(foodInfoJSON);
  fs.writeFileSync('json/infofood.json', books);
  res.json({"result": true}); 
});

// Delete Book
app.get('/deleteBook/:id', (req, res) => {
  var bookId = req.params.id;
  foodInfoJSON = foodInfoJSON.filter(function( obj ) {
    return obj.id !== bookId;
  });
  books = JSON.stringify(foodInfoJSON);
  fs.writeFileSync('json/infofood.json', books);
  res.json({"result": true}); 
});


// Assigning address to the express & telling express 
// if someone will communicate with you on this address,
// You need to respond to that request.
app.listen(port, () => {
  console.log(`Backend of Bookstore is listening at http://localhost:${port}`);
})