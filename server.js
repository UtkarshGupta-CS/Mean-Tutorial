var express = require('express');
var app = express();

// app.get('/',function(req,res){
//     res.send('Hello World');
// });
var port = process.env.PORT || 8080;
var morgan = require('morgan');
app.use(morgan('dev'));

// app.get('/home',function(req,res){
//     res.send ('Hello from Home');
// });

var mongoose = require('mongoose');
var User = require('./app/models/user');

mongoose.connect('mongodb://localhost:27017/tutorial', function (err) {
    if (err) {
        console.log("not connected to the db: " + err);
    } else {
        console.log("Successfully connected to db");
    }
});

var bodyParser = require('body-parser');

app.use(bodyParser.json);
app.use(bodyParser.urlencoded({
    extended: true
}));

//http://localhost:8080/users 
app.post('/users', function (req, res) {
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    user.save();
});

app.listen(port, function () {
    console.log("Running the server on port:" + port);
});