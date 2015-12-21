define([
	'underscore',
	'backbone',
	'backboneLocalstorage',
	'models/argument'
], function (_, Backbone, Store, Argument) {
	var Arguments = Backbone.Collection.extend({
		initialize: function() {
			for (filterMethod in this.filters) {
				this.filters[filterMethod] = this.filters[filterMethod].bind(this);
			}
		},
		model: Argument,
		localStorage: new Store("argument-list"),
		curFilter: '',
		setFilter: function(filterMethod) {
			this.curFilter = filterMethod;
		},
		filtered: function() {
			if (this.curFilter) {
				return this.filters[this.curFilter]();
			} else {
				return this.models;
			}
		},
		filters: {
			top: function() {
				return this.sortBy('confidence').slice(-3).reverse();
			},
			zero_confidence: function() {
				return this.filter(function(argument) {
					return argument.get('confidence') == 0;
				});
			}
		}
	});
	
	return new Arguments();
});