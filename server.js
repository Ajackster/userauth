var express = require('express');
var youtubeNode = require('youtube-node');

var app = express();
var youTube = new youtubeNode();

youTube.setKey('AIzaSyAPseHh9ic9P947tO6lGcAnNH0OeSp598Q');

app.get('/', function(req, res) {
	youTube.search('I\'m yours', 5, function(err, result) {
		if(err) {
			console.log("Error reported: " + err);
		}else{
			res.send(JSON.stringify(result));
		}
	})	
})

var port = process.env.PORT || 3000;
console.log('Server running on port ' + port);
app.listen(port)
