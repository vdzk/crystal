var db = require('arangojs')();

//Log errors inside promises
process.on('unhandledRejection', function(reason) {
    console.error(reason.stack);
});

db.createDatabase('crystal').then(
	() => {
		console.log('Database created.')
	},
	err => {
		if (err.message == 'duplicate name') {
			console.log('Database already exists.');
		} else {
			throw err;
		}
	}
).then(
	() => {
		db.useDatabase('crystal');
		console.log('Switched to crystal database.');
		arguments = db.collection('arguments');
		return arguments.create();
	}
).then(
	() => {
		console.log('Collection created');
	},
	err => {
		if (err.message == 'cannot create collection: duplicate name') {
			console.log('Collection already exists.');
		} else {
			throw err;
		}
	}
).then(function() {
	relations = db.edgeCollection('relations');
	return relations.create();
}).then(
	() => {
		console.log('Relations collection created');
		console.log('general relation collection info', relations.get());
	},
	err => {
		if (err.message == 'cannot create collection: duplicate name') {
			console.log('Relations collection already exists.');
			relations.all().then(
				cursor => cursor.map(doc => doc)
			).then(
				docs => console.log('All relations:', docs),
				err => console.error('Failed to fetch all relations:', err)
			);
		} else {
			throw err;
		}
	}
);