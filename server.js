//Load modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var path = require('path');
var favicon = require('serve-favicon');
var db = require('arangojs')();

//Set up the database and a collection
db.useDatabase('crystal');

//Object which manages access to argument data
var Arguments = {
	collection: db.collection('arguments'),
	getAll: function() {
		return Arguments.collection.all().then(function(cursor) {
			return cursor.map(function(argument) {
				return argument;
			})
		});
	},
	get: function(key) {
		return Arguments.collection.document(key);
	},
	add: function(argument) {
		return Arguments.collection.save(argument);
	},
	update: function(key, argument) {
		return Arguments.collection.update(key, argument);
	},
	remove: function(key) {
		return Arguments.collection.remove(key);
	}
}

//Set express REST routes
app.get('/arguments', function(req, res) {
	Arguments.getAll().then(function(arguments) {
		res.send(arguments);
	});
});
app.get('/arguments/:key', function(req, res) {
	var key = req.params.key;
	Arguments.get(key).then(function(argument) {
		res.send(argument);
	});
});
app.post('/arguments', function(req, res) {
	var argument = req.body;
	Arguments.add(argument).then(function(meta) {
		meta.id = meta._key;
		res.send(meta);
	});
});
app.put('/arguments/:key', function(req, res) {
	var key = req.params.key;
	var argument = req.body;
	Arguments.update(key, argument).then(function() {
		res.send();
	});
});
app.delete('/arguments/:key', function(req, res) {
	var key = req.params.key;
	Arguments.remove(key).then(function() {
		res.send();
	});
});

//Set express static routes
app.use(express.static(path.join(__dirname, '/public')));
app.use(favicon(__dirname + '/public/img/global/pink_crystal.ico'));

//Start listening to requests
app.listen(3000);
