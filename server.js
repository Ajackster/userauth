var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');
var bcrypt = require('bcrypt');
var pgQuery = require('pg-query');

var salt = 10;

var app = express();

var connectionString = process.env.DATABAS_URL || 'postgres://ajackster:helloworld@localhost:5432/mupetunes';
var client = new pg.Client(connectionString);
client.connect();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', function(req, res) {
	res.sendFile('index.html');
})

app.post('/login', function(req, res) {
	var username = "\'" + req.body.username + "\'";
	var password = req.body.password;
	var getUserInfo = "SELECT * FROM users WHERE username=" + username;

	client.query(getUserInfo, function(err, results) {
		console.log(results.username); 
	}) 
})

app.post('/signup', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var hash = bcrypt.hashSync(password, salt);
	
	client.query('INSERT INTO users(username, password) values($1, $2)', [username, hash]);
})

var port = process.env.PORT || 3000;
console.log('Server running on port ' + port);
app.listen(port)
