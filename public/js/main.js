/*global require*/
'use strict';

// Require.js allows us to configure shortcut alias
require.config({
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		}
	},
	paths: {
		jquery: '/js/libs/jquery',
		underscore: '/js/libs/underscore',
		backbone: '/js/libs/backbone',
		text: '/js/libs/text'
	}
});

require([
	'backbone',
	'views/app',
	'routers/router'
], function (Backbone, AppView, ArgumentRouter) {
	/*jshint nonew:false*/
	// Initialize routing and start Backbone.history()
	new ArgumentRouter();
	Backbone.history.start();

	// Initialize the application view
	new AppView();
});