var express = require('express');
//var favicon = require('serve-favicon');
var app = express();

//var middleware = {
//  
//    requireAuthentication: function (req, res,next){
//        console.log('private route hit');
//        next();
//    },
//    logger: function(req, res, next){
//        console.log(req.method + ' ' + req.originalUrl);
//        next();
//    }
//};

//app.use(favicon(__dirname + '/public/images/favicon.ico'));

//app.use(middleware.logger);
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 5000));
app.get('/', function (req, res){
    res.send('Hello World!');
});

//console.log(__dirname);

//app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function(){
    console.log("server started on port: " + app.get('port'));
});