define([
	'jquery',
	'backbone',
	'collections/arguments'
], function ($, Backbone, Arguments) {
	ArgumentRouter = Backbone.Router.extend({
		routes: {
			'*filter' : 'setFilter'
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