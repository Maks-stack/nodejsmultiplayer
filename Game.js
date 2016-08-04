var express = require("express");
var app = express();

var middleware = {
  
    requireAuthentication: function (req, res,next){
        console.log('private route hit');
        next();
    }
};

app.use(middleware.requireAuthentication);

var port = process.env.PORT || 2000;

console.log(__dirname);

app.use(express.static(__dirname + '/public'));

app.listen(port, function(){
    console.log("server started on port: " + port);
});