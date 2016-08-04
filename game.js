var express = require('express');
var favicon = require('serve-favicon');
var app = express();
var PORT = process.env.PORT || 2000;

var middleware = {
  
    requireAuthentication: function (req, res,next){
        console.log('private route hit');
        next();
    },
    logger: function(req, res, next){
        console.log(req.method + ' ' + req.originalUrl);
        next();
    }
};

app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.use(middleware.logger);



console.log(__dirname);

app.use(express.static(__dirname + '/public'));

app.listen(PORT, function(){
    console.log("server started on port: " + PORT);
});