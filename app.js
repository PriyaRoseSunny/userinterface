var express= require('express');
var path=require('path');

var bodyParser=require('body-parser');

console.log("Start app.js");
var app=express();

var server=app.listen(3000,function(){
    //var host=server.address().address;
    var port=server.address().port;

    console.log("Server listening.....",port);
});

app.use('/',require('./routes'));


module.exports=app;