//Load modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var path = require('path');
var favicon = require('serve-favicon');
var arangojs = require('arangojs');
var aqlQuery = arangojs.aqlQuery;
var db = arangojs();

//Log errors inside promises
process.on('unhandledRejection', function(reason) {
    console.error(reason.stack);
});

//Set up the database and a collection
db.useDatabase('crystal');

//Object which manages access to argument data
var Arguments = {
	collection: db.collection('arguments'),
	relations: db.edgeCollection('relations'),
	getAllActions: function() {
		return db.query(aqlQuery`
			FOR node IN arguments
			  FILTER node.type == 'action'
			  RETURN node
		`).then(function(cursor) {
			return cursor.map(function(argument) {
				return argument;
			})
		});
	},
	get: function(key) {
		return Arguments.collection.document(key);
	},
	add: function(argument) {
		argument.type = 'action';
		var save_promise = Arguments.collection.save(argument);
		//also create a utility node for the action node of the argument
		var utility_node = {
			type: 'utility',
			utility_table: [[0,0],[1,1]],	//utility ranges from 0 to 1 depending on the values of its parents
			group: 'someone'
		};
		var action_meta = {};
		var utility_meta = {};
		var save_chain_promise = save_promise.then(function(meta) {
			action_meta = meta;
			return Arguments.collection.save(utility_node);
		}).then(function(meta) {
			utility_meta = meta;
			return Arguments.relations.save({}, action_meta._id, utility_meta._id);
		}).then(function(meta) {
			return Promise.resolve(action_meta);
		});
		return save_chain_promise;
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
	Arguments.getAllActions().then(function(arguments) {
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
