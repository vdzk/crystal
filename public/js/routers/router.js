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
			window.filter = (params && params.trim) ? params.trim() : '';
			Arguments.trigger('reset');
		}
	});
	
	return ArgumentRouter;
});