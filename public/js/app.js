/*global YUI*/
YUI.add('sixthsense-app', function (Y) {
	'use strict';

	// Dependencies from MVC namespace.
	var SixthSense,
		SixthSenseView = Y.SixthSenseMVC.SixthSenseView;

	// -- Main Application --------------
	SixthSense = Y.Base.create('sixthsenseApp', Y.App, [], {

		containerTemplate: '#SixthSenseApp',

		// DOM events for creating new Todos and clearing out old ones.
		events: {

			'.url-input': {keypress: 'navigateURL'},
			'body': {click: 'clickit'}

		},

		// Initialize our TodoList, and bind any events that occur
		// when new Todos are added, changed, or removed within it.
		// Also, fetch any Todos that are found within localStorage.
		initializer: function () {

			var container = this.get('container'),
				inputURL  = container.one('.url-input'),
				socket    = io.connect('http://127.0.0.1:3000'),
				iframe    = Y.one('.webpage');

			socket.on('changeURL', function(url) {

				iframe.set('src', url);
				iframe.setStyle('height', '1000px');

				iframe.once('load', function() {
				new SixthSenseView();
			});

			});

			

			/*
			iframe.once('load', function() {
				new SixthSenseView();
				
				iframe.on('mouseenter', function() {
					iframe.setStyle('overflow', 'scroll');
				});

				iframe.on('mouseleave', function() {
					iframe.setStyle('overflow', 'hidden');
				});
			});
*/

		},

		// Render our application with the statistics from our TodoList,
		// and various other stylistic elements.
		render: function () {

			// Set the checkbox only if all Todos have been completed.
		},

		navigateURL: function(evt) {

			if(evt.keyCode === 13) {
				var socket = io.connect('http://127.0.0.1:3000'),
					target = evt.target,
					url    = target.get('value');

				socket.emit('navigate', url);

				target.blur();
			}

		}

		
	}, {
		ATTRS: {
			// Significant DOM elements that relate to our application that
			// we would like to keep as attributes.
			
		}
	});

	// Namespace this application under our custom Y.MVC namespace.
	Y.namespace('SixthSenseMVC').SixthSense = SixthSense;

}, {

	ATTRS: {
		container: {
			valueFn: function() {
				return Y.one('#SixthSenseApp');
			}
		}
	}

}, '@VERSION@', {
	requires: [
		'app',
		'node',
		'sixthsense-view',
		'event-mouseenter'

	]
});
