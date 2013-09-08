/*global YUI*/

YUI.add('sixthsense-view', function (Y) {
	'use strict';

	// -- Todo View -------------------
	var SixthSenseView = Y.Base.create('sixthsenseView', Y.View, [], {


		// Bind DOM events for handling changes to a specific Todo,
		// for completion and editing.
		events: {
			
		},

		// Initialize this view by setting event handlers when the Model
		// is updated or destroyed.
		initializer: function () {

			this.set('container', Y.one('.webpage').get('contentDocument').one('html').one('body'));
			//this.get('container').setStyle('height', this.get('container').ancestor('iframe').get('clientHeight'));

		},

		// Render this view in our <li> container, and fill it with the
		// data in our Model.
		render: function () {
			

			return this;
		},

	});

	// Set this View under our custom Y.TodoMVC namespace.
	Y.namespace('SixthSenseMVC').SixthSenseView = SixthSenseView;

}, {

	ATTRS: {
		container: {
			valueFn: function() {
				return Y.one('.webpage').get('contentDocument').one('html').one('body');
			}
		}
	}

}, '@VERSION@', {

	requires: [
		'view',
		'node'
	]

});
