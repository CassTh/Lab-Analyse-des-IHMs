var express = require('express');
var app = express();
var cors = require('cors')

app.use(cors());
//app.use(express.static('public'));

//Serves all the request which includes /images in the url from Images folder
app.use('/images', express.static("." + '/Images'));
app.use('/json', express.static("." + '/JSON'));

var server = app.listen(8080);