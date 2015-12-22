var db = require('arangojs')();

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
	() => console.log('Collection created'),
	err => {
		if (err.message == 'cannot create collection: duplicate name') {
			console.log('Collection already exists.');
		} else {
			throw err;
		}
	}
);