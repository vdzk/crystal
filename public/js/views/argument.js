define([
	'jquery',
	'underscore',
	'backbone',
	'text!/templates/argument_item.html',
], function ($, _, Backbone, argumentItemTemplate) {
	ArgumentView = Backbone.View.extend({
		tagName: 'li',
		template: _.template(argumentItemTemplate),
		render: function(){
			var item_data = this.model.toJSON();
			item_data.url = '/#/argument/' + item_data.id;
			this.$el.html(this.template(item_data));
			return this;
		},
		initialize: function(){
			this.model.on('change', this.render, this);
			this.model.on('destroy', this.remove, this);
		},
		events: {
			'click .destroy': 'destroy',
			'click .add-confidence': 'addConfidence',
		},
		destroy: function(){
			this.model.destroy();
		},
		addConfidence: function() {
			var new_confidence = 1 + this.model.get('confidence');
			this.model.save({confidence: new_confidence});
		}
	});
	
	return ArgumentView;
});