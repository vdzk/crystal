define([
	'underscore',
	'backbone',
	'models/argument'
], function (_, Backbone, Argument) {
	Arguments = Backbone.Collection.extend({
		initialize: function() {
			for (filterMethod in this.filters) {
				this.filters[filterMethod] = this.filters[filterMethod].bind(this);
			}
		},
		model: Argument,
		url: '/arguments',
		parse: function(data) {
			//Populate the Backbone id property with the ArangoDB _key property.
			data.forEach(function(argument) {
				argument.id = argument._key
			});
			return data;
		},
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