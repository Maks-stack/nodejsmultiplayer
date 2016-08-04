var express = require('express');
var favicon = require('serve-favicon');
var app = express();
var PORT = process.env.PORT || 5000;

app.use(favicon(__dirname + '/public/images/favicon.ico'));


app.use(express.static(__dirname + '/public'));

app.listen(PORT, function(){
    console.log("server started on port: " + PORT);
});