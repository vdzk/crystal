define([
	'jquery',
	'backbone',
	'collections/arguments'
], function ($, Backbone, Arguments) {
	ArgumentRouter = Backbone.Router.extend({
		routes: {
			'argument/:id': 'showArgument',
			'*filter': 'setFilter'
		},
		showArgument: function(id) {
			console.log('going to argument with id', id);
		},
		setFilter: function(params) {
			filter = (params && params.trim) ? params.trim() : '';
			var filterMethods = {
				'top': 'top',
				'new': 'zero_confidence'
			};
			var filterMethod = filterMethods[filter] || '';
			Arguments.setFilter(filterMethod);
			Arguments.trigger('reset');
		}
	});
	
	return ArgumentRouter;
});