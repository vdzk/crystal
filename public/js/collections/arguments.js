define([
	'underscore',
	'backbone',
	'backboneLocalstorage',
	'models/argument'
], function (_, Backbone, Store, Argument) {
	var Arguments = Backbone.Collection.extend({
		model: Argument,
		localStorage: new Store("argument-list"),
		top: function() {
			return this.sortBy('confidence').slice(-3).reverse();
		},
		zero_confidence: function() {
			return this.filter(function(argument) {
				return argument.get('confidence') == 0;
			});
		},
	});
	
	return new Arguments();
});