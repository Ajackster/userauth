var express = require('express');
var youtubeNode = require('youtube-node');

var app = express();
var youTube = youtubeNode();

app.get('/', function(req, res) {
	youTube.search('I\'m yours', 5, function(err, result) {
		if(error) {
			console.log("Error reported: " + err);
		}else{
			res.send(JSON.stringify(result, null, 5));
			console.log(JSON.stringify(result, null, 5));
		}
	})	
})
