var express = require("express");
var app = express();

app.get('/', function(req, res){
    
    res.send('Hello Express!');
});

var port = process.env.PORT || 2000;

app.listen(port);