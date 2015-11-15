define([
	'underscore',
	'backbone'
], function (_, Backbone) {
	var Argument = Backbone.Model.extend({
		defaults: {
			title: '',
			confidence: 0
		}
	});
	return Argument;
});