var express = require('express');
var app = express();
var fs = require("fs");


//http://127.0.0.1:8081/listUsers
app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

app.get('/listCars', function(req, res) {
    console.log(__dirname);
    fs.readFile(__dirname + "/" + "cars.json", 'utf8', function (err,data) {
        console.log(data);
        res.end(data);
    });

});

var user = {
   "user5" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 5
   }
}

app.post('/addUser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["user5"] = user["user5"];
       console.log( data );
       res.end( JSON.stringify(data));
   });
})


app.get('/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       users = JSON.parse( data );
       var user = users["user" + req.params.id]
       console.log( user );
       res.end( JSON.stringify(user));
   });
})


// parameter middleware that will run before the next routes
app.param('id', function(req, res, next, name) {

    console.log("middleware");
    // check if the user with that name exists
    // do some validations
    // add -dude to the name
    var modified = name + '-dude';

    // save name to the request
    req.name = modified;

    next();
});

// http://localhost:8080/api/users?id=4&token=sdfa3&geo=us
app.get('/api/users', function(req, res) {
    //console.dir(res.params);
  var user_id = req.query.id;
  var token = req.query.token;
  var geo = req.query.geo;  

  res.send(user_id + ' ' + token + ' ' + geo);
});


app.get('/:id/:name', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       users = JSON.parse( data );
       var user = users["user" + req.params.id]
       console.log("test")
       console.log(req.params.name); 
       console.log(user);
       res.end( JSON.stringify(user));
   });
})


var id = 2;

app.delete('/deleteUser', function (req, res) {

   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user" + 2];
       
       console.log( data );
       res.end( JSON.stringify(data));
   });
})


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})