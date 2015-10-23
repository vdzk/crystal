//Load modules
var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');

//Set express routes
app.use(express.static(path.join(__dirname, '/public')));
app.use(favicon(__dirname + '/public/img/global/pink_crystal.ico'));

console.log(__dirname + '/public/img/global/pink_crystal.ico');
app.listen(80);
