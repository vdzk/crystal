define([
	'jquery',
	'underscore',
	'backbone',
	'collections/arguments',
	'views/argument',
], function ($, _, Backbone, Arguments, ArgumentView) {

	// Our overall **AppView** is the top-level piece of UI.
	var AppView = Backbone.View.extend({
		el: '#social-movements',
		initialize: function () {
			this.input = this.$('#new-argument');
			Arguments.on('add', this.addOne, this);
			Arguments.on('reset', this.addAll, this);
			Arguments.fetch();
		},
		events: {
			'click #add-new-argument': 'createArgumentOnBtnClick'
		},
		createArgumentOnBtnClick: function(event) {
			event.preventDefault();
			if (!this.input.val().trim()) {
				return false;
			}
			Arguments.create(this.newAttributes());
			this.input.val('');
		},
		addOne: function(argument){
			var view = new ArgumentView({model: argument});
			$('#argument-list').append(view.render().el);
		},
		addAll: function(){
			this.$('#argument-list').html('');
			switch(window.filter){
				case 'top':
					_.each(Arguments.top(), this.addOne);
					break;
				case 'new':
					_.each(Arguments.zero_confidence(), this.addOne);
					break;
				default:
					Arguments.each(this.addOne, this);
					break;
			}
		},
		newAttributes: function(){
			return {
				title: this.input.val().trim(),
				confidence: 0
			}
		}
	});

	return AppView;
});