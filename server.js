//Load modules
var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var db = require('arangojs')();

//Set up the database and a collection
db.useDatabase('crystal');
argumnets = db.collection('argumnets');

//Running some test queries
doc = {
	_key: 'firstDocument',
	a: 'foo',
	b: 'bar',
	c: Date()
};
argumnets.save(doc).then(
	meta => {
		console.log('Document saved:', meta._rev);
		return argumnets.document('firstDocument');
	},
	err => console.error('Failed to save document:', err)
).then(
	doc => {
		console.log('Document:', JSON.stringify(doc, null, 2));
		return argumnets.remove('firstDocument');
	},
	err => console.error('Failed to fetch document:', err)
).then(
  () => console.log('Document removed'),
  err => console.error('Failed to remove document', err)
);

//Set express routes
app.use(express.static(path.join(__dirname, '/public')));
app.use(favicon(__dirname + '/public/img/global/pink_crystal.ico'));
app.listen(3000);
